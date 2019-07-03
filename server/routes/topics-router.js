const express = require("express");
const topicsRouter = express.Router();
const getTopics = require("../controllers/getTopics");
const { badMethod } = require("../errors/index");

topicsRouter.get("/", getTopics).all(badMethod);

module.exports = topicsRouter;
