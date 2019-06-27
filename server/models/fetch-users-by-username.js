const connection = require("../../db/connection");

const fetchUsersByUsername = username => {
  return connection
    .where("username", username)
    .select("*")
    .table("users");
};

module.exports = fetchUsersByUsername;
