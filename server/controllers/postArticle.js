const newArticle = require("../models/new-article");

const postArticle = (req, res, next) => {
  const newArt = req.body;
  newArticle(newArt)
    .then(article => {
      console.log({ article: article[0] });
      res.status(201).send({ article: article[0] });
    })
    .catch(next);
};

module.exports = postArticle;
