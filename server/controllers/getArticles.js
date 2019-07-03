const fetchArticles = require("../models/fetch-articles");

const getArticles = (req, res, next) => {
  const { sort_by, order_by, author, topic } = req.query;
  fetchArticles({ sort_by, order_by, author, topic })
    .then(articles => {
      if (articles.length === 0) {
        return Promise.reject({ status: 404, msg: "page not found" });
      }
      res.status(200).send({ articles });
    })
    .catch(next);
};

module.exports = getArticles;
