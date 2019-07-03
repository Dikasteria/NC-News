const express = require("express");
const usersRouter = express.Router();
const getUsersByUsername = require("../controllers/getUsersByUsername");
const { badMethod } = require("../errors/index");

usersRouter.get("/:username", getUsersByUsername).all(badMethod);

module.exports = usersRouter;
