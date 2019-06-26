exports.up = function(knex, Promise) {
  // console.log("Creating topics table...");
  return knex.schema.createTable("topics", topicsTable => {
    topicsTable
      .string("slug")
      .unique()
      .primary();
    topicsTable.string("description").notNullable();
  });
};

exports.down = function(knex, Promise) {
  // console.log("Deleting topics table...");
  return knex.schema.dropTable("topics");
};
