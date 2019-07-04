const updateCommentsByCommentId = require("../models/update-comments-by-comment-id");

const patchCommentsByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateCommentsByCommentId(comment_id, inc_votes)
    .then(([comment]) => {
      if (!comment) {
        return Promise.reject({ status: 404, msg: "page not found" });
      }
      res.status(200).send({ comment });
    })
    .catch(next);
};

module.exports = patchCommentsByCommentId;
