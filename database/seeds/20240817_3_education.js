/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const hashing = require("../../helper/hashing");

exports.seed = async function (knex) {
  // Deletes ALL existing entries

  // await knex('education').del();
  await knex("education").insert([
    {
      hash: "66c0df4dd7c0407fe4dff953",
      education: "S1",
      institution: "Universitas Indonesia",
      major: "Teknik Informatika",
      year: "2019",
      gpa: "3.5",
      biodata_id: 1,
    },
   
  ]);
};
