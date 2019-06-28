const express = require("express");
const articlesRouter = express.Router();
const getArticlesByArticleId = require("../controllers/getArticlesByArticleId");
const patchArticlesByArticleId = require("../controllers/patchArticlesByArticleId");
const postCommentByArticleId = require("../controllers/postCommentByArticleId");
const getCommentsByArticleId = require("../controllers/getCommentsByArticleId");
const getArticles = require("../controllers/getArticles");

articlesRouter.route("/").get(getArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticlesByArticleId)
  .put(patchArticlesByArticleId)
  .post(postCommentByArticleId);

articlesRouter.route("/:article_id/comments").get(getCommentsByArticleId);

module.exports = articlesRouter;
