const { topicData, articleData, commentData, userData } = require("../index");

const { formatDate, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsInsertions = knex("topics").insert(topicData);
      const usersInsertions = knex("users").insert(userData);
      return Promise.all([topicsInsertions, usersInsertions])
        .then(() => {
          // format article date
          const formattedDate = formatDate(articleData);
          // insert formatted articles
          return knex("articles")
            .insert(formattedDate)
            .returning("*");
        })
        .then(articleRows => {
          // reference obj with article titles and ids
          const articleRef = makeRefObj(
            articleRows,
            "article.title",
            "article_id"
          );
          // format comments using article ref
          const formattedComments = formatComments(commentData, articleRef);
          return knex("comments").insert(formattedComments);
        });
    });
};
