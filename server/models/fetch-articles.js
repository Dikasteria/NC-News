const connection = require("../../db/connection");

const fetchArticles = () => {
  return connection("articles")
    .select(
      "author",
      "title",
      "article_id",
      "topic",
      "created_at",
      "votes",
      "comment_count"
    )
    .from("articles")
    .orderBy("author", { ascending: true });
};

module.exports = fetchArticles;
