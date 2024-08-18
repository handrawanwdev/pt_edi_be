/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const hashing = require("../../helper/hashing");

exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex('experience').del();
  await knex("experience").insert([
    {
      hash: "66c0df438096c49718d9f224",
      company: "PT. ABC",
      last_position: "Software Engineer",
      last_income: "Rp. 10.000.000",
      year: "2020",
      biodata_id: 1,
    },
   
  ]);
};
