const connection = require("../../db/connection");

const removeCommentsByCommentId = comment_id => {
  return connection("comments")
    .where("comment_id", comment_id)
    .del()
    .returning("*")
    .from("comments");
};

module.exports = removeCommentsByCommentId;
