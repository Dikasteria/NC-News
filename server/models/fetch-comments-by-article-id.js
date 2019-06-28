const connection = require("../../db/connection");

const fetchCommentsByArticleId = (article_id, sort_by, order_by) => {
  return connection("comments")
    .where({ "comments.article_id": article_id })
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .orderBy(sort_by, order_by || "created_at", "desc");
};

module.exports = fetchCommentsByArticleId;
