const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const {
  handlePsql400Errors,
  handlePsql500Errors,
  catchAll404,
  catchAll422,
  badMethod
} = require("./errors/index");

app.use(express.json());
app.use("/api", apiRouter);
app.use(handlePsql400Errors);
app.use(catchAll422);
app.use("/*", catchAll404);
app.use(badMethod);
app.use(handlePsql500Errors);

module.exports = app;
