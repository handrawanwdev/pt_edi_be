/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const hashing = require("../../helper/hashing");

exports.seed = async function (knex) {
  // Deletes ALL existing entries

  // await knex('skill').del();
  await knex("skill").insert([
    {
      id: 1,
      hash: "66c0df54b8ed3113abf0a673",
      course: "React JS",
      certification: "Ada",
      year: "2020",
      biodata_id: 1,
    },
  ]);
};
