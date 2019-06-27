const connection = require("../../db/connection");

const newCommentByArticleId = (article_id, newComment) => {
  return connection;
  // .select("articles.*")
  // .join("comments", "comments.article_id", "=", "articles.article_id")
  // .insert(newComment)
  // .then(result => {
  return result;
  // });
};

module.exports = newCommentByArticleId;
