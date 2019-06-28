exports.handlePsql400Errors = (err, req, res, next) => {
  const codes = ["22P02", "42601", "23502"];
  if (codes.includes(err.code)) {
    res.status(400).send({ msg: "Not Found" });
  } else next(err);
};
exports.handlePsql500Errors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.catchAll404 = (req, res, next) => {
  next({ code: 404, msg: "page not found" });
};

exports.handleErrorWithCode = (err, req, res, next) => {
  if (err.code) {
    res.status(err.code).send(err);
  }
};
