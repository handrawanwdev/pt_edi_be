const knex = require("../database/knex");
const query_helper = require("../helper/query_helper");
const ObjectID = require("bson-objectid");

module.exports = {
  getAllData: async (
    { limit, page, name, birth, position, last_education } = { limit: 10, page: 1 },
    { users_id, is_admin }
  ) => {
    try {
      let offset = query_helper.parsePageToOffset({ page, limit });

      let query = knex
        .select([
          "biodata.name",
          "biodata.birth",
          "biodata.position",
          knex.raw(`
            coalesce(json_agg(json_build_object('education',education.education,'institution',education.institution,'major',education.major,'year',education.year,'gpa',education.gpa)) filter(where education.hash is not null),'[]') as last_education
          `),
          "biodata.hash as id",
          knex.raw("md5(biodata.hash) as hash"),
        ])
        .from("biodata");

      query.innerJoin(
        (subQuery) => {
          subQuery.select("*").from("education");
          
          // Jika user adalah admin, maka bisa filter berdasarkan last_education
          if(is_admin){
            if(last_education){
              console.log("last_education", last_education);
              
              subQuery.where("education.education", "ilike", `%${last_education}%`);
            }
          }
          return subQuery.as("education");
        },
        "education.biodata_id",
        "biodata.id"
      );

      // Jika user adalah admin, maka bisa filter berdasarkan birth dan position
      if(is_admin){
        if (name) {
          query.where("biodata.name", "ilike", `%${name}%`);
        }
        
        if (birth) {
          query.where("biodata.birth", "ilike", `%${birth}%`);
        }

        if (position) {
          query.where("biodata.position", "ilike", `%${position}%`);
        }
      }
      
      if (!is_admin) {
        query.where("biodata.users_id", users_id);
      }

      query.groupBy("biodata.id");
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
          (select coalesce(json_agg(json_build_object('company',experience.company,'last_position',experience.last_position,'last_income',experience.last_income,'year',experience.year)) filter(where experience.hash is not null),'[]') from experience where experience.biodata_id = biodata.id) as work_experience
        `),
        knex.raw(`
          (select coalesce(json_agg(json_build_object('education',education.education,'institution',education.institution,'major',education.major,'year',education.year,'gpa',education.gpa)) filter(where education.hash is not null),'[]') from education where education.biodata_id = biodata.id) as last_education
        `),
        knex.raw(`
          (select coalesce(json_agg(json_build_object('course',skill.course,'certification',skill.certification,'year',skill.year)) filter(where skill.hash is not null),'[]') from skill where skill.biodata_id = biodata.id) as skill
        `),
        knex.raw("md5(biodata.hash) as hash"),
      ])
      .from("biodata");

    query.where("biodata.hash", id);

    query.groupBy("biodata.id");

    query = query.first();

    return query;
  },

  insertData: async (data, users_id) => {
    await knex.transaction(async (trx) => {
      let insert_biodata = {
        hash: String(ObjectID()),
        position: data.position,
        name: data.name,
        ktp: data.ktp,
        birth: data.birth,
        gender: data.gender,
        religion: data.religion,
        blood_type: data.blood_type,
        status: data.status,
        address_ktp: data.address_ktp,
        address_live: data.address_live,
        email: data.email,
        phone: data.phone,
        contact_person: data.contact_person,
        proficiency: data.proficiency,
        willing: data.willing,
        salary: data.salary,
        users_id,
      };
      let biodata = await trx("biodata").insert(insert_biodata).returning("*");
      if (biodata.length > 0) {
        console.log("Biodata updated", biodata.length);
        let insert_experience = [];
        for (let item of data.work_experience) {
          let experience = {
            hash: String(ObjectID()),
            company: item.company,
            last_position: item.last_position,
            last_income: item.last_income,
            year: item.year,
            biodata_id: biodata[0].id,
          };
          insert_experience.push(experience);
        }
        if(insert_experience.length > 0){
          await trx("experience").insert(insert_experience).returning("*");
          console.log("Experience updated", insert_experience.length);
        }
        let insert_education = [];
        for (let item of data.last_education) {
          let education = {
            hash: String(ObjectID()),
            education: item.education,
            institution: item.institution,
            major: item.major,
            year: item.year,
            gpa: item.gpa,
            biodata_id: biodata[0].id,
          };
          insert_education.push(education);
        }
        if(insert_education.length > 0){
          await trx("education").insert(insert_education).returning("*");
          console.log("Education updated", insert_education.length);
        }
        let insert_skill = [];
        for (let item of data.skill) {
          let skill = {
            hash: String(ObjectID()),
            course: item.course,
            certification: item.certification,
            year: item.year,
            biodata_id: biodata[0].id,
          };
          insert_skill.push(skill);
        }
        if(insert_skill.length > 0){
          await trx("skill").insert(insert_skill).returning("*");
          console.log("Skill updated", insert_skill.length);
        }
      }
    });
  },

  updateData: async (id, data) => {
    await knex.transaction(async (trx) => {
      let update_biodata = {
        hash: String(ObjectID()),
        position: data.position,
        name: data.name,
        ktp: data.ktp,
        birth: data.birth,
        gender: data.gender,
        religion: data.religion,
        blood_type: data.blood_type,
        status: data.status,
        address_ktp: data.address_ktp,
        address_live: data.address_live,
        email: data.email,
        phone: data.phone,
        contact_person: data.contact_person,
        proficiency: data.proficiency,
        willing: data.willing,
        salary: data.salary,
      };
      let biodata = await trx("biodata")
        .update(update_biodata)
        .where("hash", id)
        .returning("*");
      if (biodata.length > 0) {
        console.log("Biodata updated", biodata.length);
        let insert_experience = [];
        for (let item of data.work_experience) {
          let experience = {
            hash: String(ObjectID()),
            company: item.company,
            last_position: item.last_position,
            last_income: item.last_income,
            year: item.year,
            biodata_id: biodata[0].id,
          };
          insert_experience.push(experience);
        }
        if(insert_experience.length > 0){
          await trx("experience").where("biodata_id",biodata[0].id).del();
          await trx("experience").insert(insert_experience).returning("*");
          console.log("Experience updated", insert_experience.length);
        }
        let insert_education = [];
        for (let item of data.last_education) {
          let education = {
            hash: String(ObjectID()),
            education: item.education,
            institution: item.institution,
            major: item.major,
            year: item.year,
            gpa: item.gpa,
            biodata_id: biodata[0].id,
          };
          insert_education.push(education);
        }
        if(insert_education.length > 0){
          await trx("education").where("biodata_id",biodata[0].id).del();
          await trx("education").insert(insert_education).returning("*");
          console.log("Education updated", insert_education.length);
        }
        let insert_skill = [];
        for (let item of data.skill) {
          let skill = {
            hash: String(ObjectID()),
            course: item.course,
            certification: item.certification,
            year: item.year,
            biodata_id: biodata[0].id,
          };
          insert_skill.push(skill);
        }
        if(insert_skill.length > 0){
          await trx("skill").where("biodata_id",biodata[0].id).del();
          await trx("skill").insert(insert_skill).returning("*");
          console.log("Skill updated", insert_skill.length);
        }
      }
    });
  },

  deleteData: async (id) => {
    let query = knex("biodata").where("hash", id).del();

    return query;
  },
};
