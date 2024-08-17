/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// {
//   id: 1,
//   company: "PT. ABC",
//   last_position: "Software Engineer",
//   last_income: "Rp. 10.000.000",
//   year: "2020",
// },
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists("experience",function(table){
      table.increments();
      table.string("hash",24).notNullable();
      table.string("company",255).notNullable();
      table.string("last_position",255).notNullable();
      table.string("last_income",255).notNullable();
      table.string("year",4).notNullable();
      table.integer("biodata_id").unsigned().notNullable().references("id").inTable("biodata").onUpdate("CASCADE").onDelete("CASCADE");
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
    return knex.schema.dropTableIfExists("experience");
  };
  