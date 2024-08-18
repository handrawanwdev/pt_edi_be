/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// {
//   id: 1,
//   course: "React JS",
//   certification: "Ada",
//   year: "2020",
// },
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists("skill",function(table){
      table.string("hash",24).notNullable().primary();
      table.string("course",64).defaultTo(null);
      table.string("certification",64).defaultTo(null);
      table.string("year",4).defaultTo(null);
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
    return knex.schema.dropTableIfExists("skill");
  };
  