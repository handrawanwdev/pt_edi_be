const knex = require("../database/knex");
const query_helper = require("../helper/query_helper");
const ObjectID = require("bson-objectid");

module.exports = {
  getAllData: async ({ limit, page } = { limit: 10, page: 1 }) => {
    try {
      let offset = query_helper.parsePageToOffset({ page, limit });

      let query = knex
        .select([
          "biodata.name",
          "biodata.birth",
          "biodata.position",
          "biodata.hash as id",
          knex.raw("md5(biodata.hash) as hash"),
        ])
        .from("biodata");

      query.orderBy("biodata.id", "asc");

      let query_total = await knex(query.as("wd")).count("* as total").first();

      if (limit && limit != "all") {
        query.offset(offset);
        query.limit(limit);
      }

      let datas = await query;

      let result = {
        per_page: limit ? parseInt(limit) : "all",
        last_page: limit ? Math.ceil(query_total.total / limit) : 1,
        total_data: parseInt(query_total.total),
        current_page: parseInt(page),
        data: datas,
      };

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getDataById: async (id) => {
    let query = knex
      .select([
        "biodata.*",
        "biodata.hash as id",
        knex.raw(`
          coalesce(
          json_agg(
            json_build_object(
              'id', experience.id,
              'company', experience.company,
              'last_position', experience.last_position,
              'last_income', experience.last_income,
              'year', experience.year
            )
          ) filter(where experience.id is not null),'[]') as experiences
        `),
        knex.raw(`
          coalesce(
          json_agg(
            json_build_object(
              'id', skill.id,
              'course', skill.course,
              'certification', skill.certification,
              'year', skill.year
            )
          ) filter(where skill.id is not null),'[]') as skills
        `),
        knex.raw(`
          coalesce(
          json_agg(
            json_build_object(
              'id', education.id,
              'education', education.education,
              'institution', education.institution,
              'major', education.major,
              'year', education.year,
              'gpa', education.gpa
            )
          ) filter(where education.id is not null),'[]') as educations
        `),
        knex.raw("md5(biodata.hash) as hash"),
      ])
      .from("biodata");

    query.leftJoin("experience", function () {
      this.on("experience.biodata_id", "biodata.id");
    });
    query.leftJoin("education", function () {
      this.on("education.biodata_id", "biodata.id");
    });
    query.leftJoin("skill", function () {
      this.on("skill.biodata_id", "biodata.id");
    });

    query.groupBy("biodata.id");

    query.where("biodata.hash", id);

    return query.first();
  },

  insertData: async (data) => {
    await knex.transaction(async (trx) => {
      let insert_biodata = {
        "hash": String(ObjectID()),
        "position": data.position,
        "name": data.name,
        "ktp": data.ktp,
        "birth": data.birth,
        "gender": data.gender,
        "religion": data.religion,
        "blood_type": data.blood_type,
        "status": data.status,
        "address_ktp": data.address_ktp,
        "address_live": data.address_live,
        "email": data.email,
        "phone": data.phone,
        "contact_person": data.contact_person,
        "willing": data.willing,
        "salary": data.salary,
      };
      let biodata = await trx("biodata").insert(insert_biodata).returning("*");
      if (biodata.length > 0) {
        console.log("Biodata inserted", biodata.length);
        let insert_experience = [];
        for(let item of data.work_experience){
          let experience = {
            "hash": String(ObjectID()),
            "company": item.company,
            "last_position": item.last_position,
            "last_income": item.last_income,
            "year": item.year,
            "biodata_id": biodata[0].id
          };
          insert_experience.push(experience);
        }
        await trx("experience").insert(insert_experience).returning("*");
        console.log("Experience inserted", insert_experience.length);
        let insert_education = [];
        for(let item of data.last_education){
          let education = {
            "hash": String(ObjectID()),
            "education": item.education,
            "institution": item.institution,
            "major": item.major,
            "year": item.year,
            "gpa": item.gpa,
            "biodata_id": biodata[0].id
          };
          insert_education.push(education);
        }
        await trx("education").insert(insert_education).returning("*");
        console.log("Education inserted", insert_education.length);
        let insert_skill = [];
        for(let item of data.skill){
          let skill = {
            "hash": String(ObjectID()),
            "course": item.course,
            "certification": item.certification,
            "year": item.year,
            "biodata_id": biodata[0].id
          };
          insert_skill.push(skill);
        }
        await trx("skill").insert(insert_skill).returning("*");
        console.log("Skill inserted", insert_skill.length);
      }
    });
  },

  updateData: async (id, data) => {
    let query = knex("biodata").where("hash", id).update(data);

    return query;
  },

  deleteData: async (id) => {
    let query = knex("biodata").where("hash", id).del();

    return query;
  },
};
