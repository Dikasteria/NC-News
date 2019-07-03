const connection = require("../../db/connection");

const updateArticlesByArticleId = (article_id, inc_votes = 0) => {
  return connection("articles")
    .where("article_id", "=", article_id)
    .increment("votes", inc_votes)
    .returning("*");
};

module.exports = updateArticlesByArticleId;
