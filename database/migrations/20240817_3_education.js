/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// {
//   id: 1,
//   education: "S1",
//   institution: "Universitas Indonesia",
//   major: "Teknik Informatika",
//   year: "2019",
//   gpa: "3.5",
// },
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists("education",function(table){
      table.increments();
      table.string("hash",24).notNullable();
      table.string("education",32).defaultTo(null);
      table.string("institution",64).defaultTo(null);
      table.string("major",32).defaultTo(null);
      table.string("year",4).defaultTo(null);
      table.decimal("gpa",4,2).defaultTo(null);
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
    return knex.schema.dropTableIfExists("education");
  };
  