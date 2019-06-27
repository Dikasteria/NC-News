const connection = require("../../db/connection");

const fetchArticlesByArticleId = article_Id => {
  return connection
    .select("articles.*")
    .count({ comment_count: "articles.article_id" })
    .from("articles")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .where({ "articles.article_id": article_Id })
    .groupBy("articles.article_id");
};

module.exports = fetchArticlesByArticleId;
