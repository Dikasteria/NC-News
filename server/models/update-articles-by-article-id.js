const connection = require("../../db/connection");

const updateArticlesByArticleId = (article_id, votes) => {
  return connection("articles")
    .where("article_id", "=", article_id)
    .increment("votes", votes.inc_votes)
    .returning("*")
    .then(response => {
      return response;
    });
};

module.exports = updateArticlesByArticleId;
