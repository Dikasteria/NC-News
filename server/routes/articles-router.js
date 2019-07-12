const express = require("express");
const articlesRouter = express.Router();
const getArticlesByArticleId = require("../controllers/getArticlesByArticleId");
const patchArticlesByArticleId = require("../controllers/patchArticlesByArticleId");
const postCommentByArticleId = require("../controllers/postCommentByArticleId");
const getCommentsByArticleId = require("../controllers/getCommentsByArticleId");
const getArticles = require("../controllers/getArticles");
const postArticle = require("../controllers/postArticle");
const { badMethod } = require("../errors/index");

articlesRouter
  .route("/")
  .get(getArticles)
  .post(postArticle)
  .all(badMethod);

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
