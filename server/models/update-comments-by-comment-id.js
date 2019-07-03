const connection = require("../../db/connection");

const updateCommentsByCommentId = (comment_id, inc_votes) => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .increment("votes", inc_votes)
    .returning("*");
};

module.exports = updateCommentsByCommentId;
