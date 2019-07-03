const removeCommentsByCommentId = require("../models/remove-comments-by-comment-id");

const deleteCommentsByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentsByCommentId(comment_id)
    .then(comment => {
      if (comment.length < 1) {
        return Promise.reject(res.sendStatus(400));
      } else res.sendStatus(204);
    })
    .catch(next);
};

module.exports = deleteCommentsByCommentId;
