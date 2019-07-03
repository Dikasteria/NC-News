const updateArticlesByArticleId = require("../models/update-articles-by-article-id");

const patchArticlesByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateArticlesByArticleId(article_id, inc_votes)
    .then(([article]) => {
      if (!article) {
        return Promise.reject({ status: 404, msg: "page not found" });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

module.exports = patchArticlesByArticleId;
