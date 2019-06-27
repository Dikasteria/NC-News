const connection = require("../../db/connection");

const fetchCommentsByArticleId = article_id => {
  console.log(article_id, "<<<<<<>>>>>>");
  return connection
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .then(response => {
      console.log(response);
      return response;
    });
};

module.exports = fetchCommentsByArticleId;

// .from("comments")
// .where({ "comments.article_id": article_id })
// .select("*")
// .orderBy("article_id", "asc");
