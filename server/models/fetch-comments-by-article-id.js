const connection = require("../../db/connection");
const { validateOrder } = require("../../db/utils/utils");

const fetchCommentsByArticleId = (article_id, sort_by, order_by) => {
  order_by = validateOrder(order_by);

  return connection("comments")
    .where({ "comments.article_id": article_id })
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .orderBy(sort_by || "created_at", order_by || "desc")
    .returning("*");
};

module.exports = fetchCommentsByArticleId;
