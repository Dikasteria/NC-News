const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const {
  handlePsql400Errors,
  handlePsql500Errors,
  catchAll404,
  handleErrorWithCode
} = require("./errors/index");

app.use(express.json());
app.use("/api", apiRouter);
app.use(handlePsql400Errors);
app.use("/*", catchAll404);
app.use(handlePsql500Errors);
app.use(handleErrorWithCode);

module.exports = app;
