/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const hashing = require("../../helper/hashing");

exports.seed = async function (knex) {
  // Deletes ALL existing entries

  // await knex('biodata').del();
  await knex("biodata").insert([
    {
      id: 1,
      hash: "6685fb4559d2e0ed6c000000",
      position: "Backend Developer",
      name: "Handrawan",
      ktp: "1234567890123456",
      birth: "1990-01-20",
      gender: "Laki-laki",
      religion: "Islam",
      blood_type: "AB",
      status: "Belum Menikah",
      address_ktp: "Jl. Kaliurang KM 5",
      address_live: "Jl. Kaliurang KM 5",
      email: "handrawanw.dev@gmail.com",
      phone: "081234567890",
      contact_person: "Bapak",
      willing: "Full Time",
      salary: "Rp. 10.000.000",
      users_id: 2,
    },
   
  ]);
};
