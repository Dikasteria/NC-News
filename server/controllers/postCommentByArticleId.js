const newCommentByArticleId = require("../models/new-comment-by-article-id");

const postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;
  newCommentByArticleId(article_id, newComment)
    .then(comments => {
      if (comments.length < 1) {
        return Promise.reject({ status: 404, msg: "page not found" });
      }

      res.status(201).send({ comment: comments[0] });
    })
    .catch(next);
};

module.exports = postCommentByArticleId;
