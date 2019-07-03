const express = require("express");
const articlesRouter = express.Router();
const getArticlesByArticleId = require("../controllers/getArticlesByArticleId");
const patchArticlesByArticleId = require("../controllers/patchArticlesByArticleId");
const postCommentByArticleId = require("../controllers/postCommentByArticleId");
const getCommentsByArticleId = require("../controllers/getCommentsByArticleId");
const getArticles = require("../controllers/getArticles");
const { badMethod } = require("../errors/index");

articlesRouter.route("/").get(getArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticlesByArticleId)
  .patch(patchArticlesByArticleId)
  .all(badMethod);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId)
  .all(badMethod);

module.exports = articlesRouter;
