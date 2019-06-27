const newCommentByArticleId = require("../models/new-comment-by-article-id");

const postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;
  newCommentByArticleId(article_id, newComment)
    .then(comment => {
      if (comment.length < 1) {
        return Promise.reject({ code: 404, msg: "page not found" });
      }
      res.status(201).send({ comment });
    })
    .catch(next);
};

module.exports = postCommentByArticleId;
