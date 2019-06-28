const connection = require("../../db/connection");

const fetchArticles = () => {
  return connection
    .select("articles.*")
    .count({ comment_count: "comments.article_id" })
    .from("articles")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy("author", "asc");
};

module.exports = fetchArticles;
