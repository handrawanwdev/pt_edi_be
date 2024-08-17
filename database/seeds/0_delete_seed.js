/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


exports.seed = async function(knex) {
    // Deletes ALL existing entries
    
    console.log("Deleting all data from all tables");
    // await knex('skill').del();
    // await knex('education').del();
    // await knex('experience').del();
    await knex('biodata').del();
    await knex('users').del();
  };
  
