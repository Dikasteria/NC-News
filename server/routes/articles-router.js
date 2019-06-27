const express = require("express");
const articlesRouter = express.Router();
const getArticlesByArticleId = require("../controllers/getArticlesByArticleId");
const patchArticlesByArticleId = require("../controllers/patchArticlesByArticleId");
const postCommentByArticleId = require("../controllers/postCommentByArticleId");
const getCommentsByArticleId = require("../controllers/getCommentsByArticleId");

articlesRouter
  .route("/:article_id")
  .get(getArticlesByArticleId)
  .put(patchArticlesByArticleId)
  .post(postCommentByArticleId)
  .get(getCommentsByArticleId);

module.exports = articlesRouter;
