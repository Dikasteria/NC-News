const express = require("express");
const commentsRouter = express.Router();
const patchCommentsByCommentId = require("../controllers/patchCommentsByCommentId");
const deleteCommentsByCommentId = require("../controllers/deleteCommentsByCommentId");
const { badMethod } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentsByCommentId)
  .delete(deleteCommentsByCommentId)
  .all(badMethod);

module.exports = commentsRouter;
