const fetchCommentsByArticleId = require("../models/fetch-comments-by-article-id");

const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id)
    .then(comments => {
      // console.log(comments, "controller");
      if (comments.length < 1) {
        return Promise.reject({ code: 404, msg: "page not found" });
      } else res.status(200).send(comments);
    })
    .catch(next);
};
module.exports = getCommentsByArticleId;
