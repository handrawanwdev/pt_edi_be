/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// position: "",
//     name: "",
//     ktp: "",
//     birth: "",
//     gender: "",
//     religion: "",
//     blood_type: "",
//     status: "",
//     address_ktp: "",
//     address_live: "",
//     email: "",
//     phone: "",
//     contact_person: "",
//     willing: "",
//     salary: "",
//     last_education
//     skill
//     work_experience
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists("biodata",function(table){
      table.increments();
      table.string("hash",24).notNullable();
      table.string("position",32).defaultTo(null);
      table.text("name").defaultTo(null);
      table.string("ktp",24).defaultTo(null);
      table.string("birth",64).defaultTo(null);
      table.string("gender",16).defaultTo(null);
      table.string("religion",16).defaultTo(null);
      table.string("blood_type",16).defaultTo(null);
      table.string("status",32).defaultTo(null);
      table.text("address_ktp").defaultTo(null);
      table.text("address_live").defaultTo(null);
      table.text("email").defaultTo(null);
      table.string("phone",32).defaultTo(null);
      table.text("contact_person").defaultTo(null);
      table.text("proficiency").defaultTo(null);
      table.text("willing").defaultTo(null);
      table.string("salary",32).defaultTo(null);
      table.integer("users_id").unsigned().notNullable().references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.smallint("is_deleted").defaultTo(0);
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("biodata");
  };
  