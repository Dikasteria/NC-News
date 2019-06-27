const express = require("express");
const usersRouter = express.Router();
const getUsersByUsername = require("../controllers/getUsersByUsername");

usersRouter.get("/:username", getUsersByUsername);

module.exports = usersRouter;
