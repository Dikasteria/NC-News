const express = require("express");
const apiRouter = express.Router();
const topicsRouter = require("./topics-router");
const usersRouter = require("./users-router");
const articlesRouter = require("./articles-router");
const commentsRouter = require("./comments-router");
const { badMethod } = require("../errors/index");
const { getJson } = require("../controllers/getJson");

apiRouter
  .route("/")
  .get(getJson)
  .all(badMethod);

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
