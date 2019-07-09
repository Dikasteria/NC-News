const knex = require("knex");

const connection = knex(dbconfig);

const dbConfig =
  process.env.NODE_ENV === "production"
    ? { client: "pg", connection: `${process.env.DATABASE_URL}` }
    : require("../knexfile");

module.exports = require("knex")(dbConfig);

// module.exports = connection;
