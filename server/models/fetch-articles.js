const connection = require("../../db/connection");

const fetchArticles = ({ sort_by, order_by, author, topic }) => {
  return connection
    .select("articles.*")
    .count({ comment_count: "comments.article_id" })
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order_by || "desc")
    .modify(query => {
      if (author) query.where({ "articles.author": author });
      if (topic) query.where({ "articles.topic": topic });
    });
};

module.exports = fetchArticles;
