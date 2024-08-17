const knex = require("../database/knex");

const query_helper = require("../helper/query_helper");

const ObjectID = require("bson-objectid");

module.exports = {
  getAllUser: async ({ limit, page } = { limit: 10, page: 1 }) => {
    try {
      let offset = query_helper.parsePageToOffset({ page, limit });

      let query = knex.select([
        "users.*",
        "users.hash as id",
        knex.raw("md5(users.hash) as hash"),
      ]).from("users");

      query.orderBy("users.id", "asc");
      
      let query_total = await knex(query.as("wd"))
      .count("* as total")
      .first();
   
      if (limit && limit != "all") {
        query.offset(offset);
        query.limit(limit);
      }

      let datas = await query;

      let result = {
        per_page: limit ? parseInt(limit) : "all",
        last_page: limit ? Math.ceil(query_total.total/limit) : 1,
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

  updateUser: async ({ id, name, username, password }) => {
    return knex("users")
      .update({ name, username, password })
      .where({ hash:id })
      .returning("*");
  },

  getAccount: async ({ id, username, hash }) => {
    let query = knex.select("*").from("users");

    if (id) {
      query.where("id", id);
    }

    if (username) {
      query.where("username", username);
    }

    if (hash) {
      query.where("hash", hash);
    }

    return query.first();
  },

  createAccount: async ({ name, username, password, is_admin }) => {
    return knex.transaction(async (trx) => {
      let users=await trx("users").insert({ name, username, password, is_admin, hash:String(ObjectID(Date.now())) }).returning("*");
      if(!users || users.length==0) throw new Error("Failed to create user");
      await trx("wallet").insert({ users_id:users[0].id, balance:0 });
      return users;
    });
  },

  updatePassword: async ({ user_id, password }) => {
    await knex("users")
      .update({ password })
      .where("id","=",user_id);
  },

  deleteUser: async ({ id }) => {
    return knex("users").where({ hash:id }).del();
  },
  
};
