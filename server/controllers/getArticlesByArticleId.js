const fetchArticlesByArticleId = require("../models/fetch-articles-by-id");
const getArticlesByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticlesByArticleId(article_id)
    .then(article => {
      if (article.length < 1) {
        return Promise.reject({ code: 404, msg: "page not found" });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};
module.exports = getArticlesByArticleId;
