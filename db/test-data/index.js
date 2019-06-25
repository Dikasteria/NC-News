const {
  articleData,
  commentData,
  topicData,
  userData
} = require("./test-data");

exports.seed = function(knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .insert(topics)
        .returning("*");
    })
    .then(topicRows => {
      const topicRef = createRef(topicRows);
    });
};

module.exports = { topicData, articleData, userData, commentData };
