const fetchArticlesByArticleId = require("../models/fetch-articles-by-id");
const getArticlesByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticlesByArticleId(article_id)
    .then(article => {
      if (article.length < 1) {
        return Promise.reject({ status: 404, msg: "page not found" });
      }
      res.status(200).send({ article: article[0] });
    })
    .catch(next);
};
module.exports = getArticlesByArticleId;
