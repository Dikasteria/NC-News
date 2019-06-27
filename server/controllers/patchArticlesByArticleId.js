const updateArticlesByArticleId = require("../models/update-articles-by-article-id");

const patchArticlesByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const votes = req.body;
  updateArticlesByArticleId(article_id, votes)
    .then(article => {
      if (article.length < 1) {
        return Promise.reject({ code: 404, msg: "page not found" });
      }
      res.status(201).send({ article });
    })
    .catch(next);
};

module.exports = patchArticlesByArticleId;
