const fetchCommentsByArticleId = require("../models/fetch-comments-by-article-id");
const fetchArticlesByArticleId = require("../models/fetch-articles-by-id");

const getCommentsByArticleId = (
  { params: { article_id }, query: { sort_by, order_by } },
  res,
  next
) => {
  fetchCommentsByArticleId(article_id, sort_by, order_by)
    .then(comments => {
      if (comments.length < 1) {
        fetchArticlesByArticleId(article_id)
          .then(articles => {
            if (articles.length === 0) {
              return Promise.reject({ status: 404, msg: "tosser not found" });
            } else res.status(200).send({ comments });
          })
          .catch(next);
      } else res.status(200).send({ comments });
    })
    .catch(next);
};
module.exports = getCommentsByArticleId;
