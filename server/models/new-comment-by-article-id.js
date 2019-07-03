const connection = require("../../db/connection");

const newCommentByArticleId = (article_id, newComment) => {
  return connection("comments")
    .where(article_id)
    .insert({
      author: newComment.username,
      body: newComment.body,
      article_id
    })
    .returning("*");
};

module.exports = newCommentByArticleId;
