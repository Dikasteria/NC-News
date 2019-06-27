const fetchCommentsByArticleId = require("../models/fetch-comments-by-article-id");

const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id)
    .then(comment => {
      if (comment.length < 1) {
        return Promise.reject({ code: 404, msg: "page not found" });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};
module.exports = getCommentsByArticleId;
