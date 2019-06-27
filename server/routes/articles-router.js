const express = require("express");
const articlesRouter = express.Router();
const getArticlesByArticleId = require("../controllers/getArticlesByArticleId");
const patchArticlesByArticleId = require("../controllers/patchArticlesByArticleId");

articlesRouter
  .route("/:article_id")
  .get(getArticlesByArticleId)
  .put(patchArticlesByArticleId);

module.exports = articlesRouter;
