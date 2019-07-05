exports.handlePsql400Errors = (err, req, res, next) => {
  const codes = ["22P02", "42601", "23502", 400, "42703"];
  if (codes.includes(err.code)) {
    res.status(400).send({ msg: "Not Found" });
  } else next(err);
};

exports.catchAll404 = (err, req, res, next) => {
  const codes = [404];
  if (codes.includes(err.status)) {
    res.status(404).send({ msg: "page not found" });
  } else {
    next(err);
  }
};

exports.catchAll422 = (err, req, res, next) => {
  const codes = ["23503"];
  if (codes.includes(err.code)) {
    res.status(422).send({ msg: "unprocessable entity" });
  } else {
    next(err);
  }
};
exports.handlePsql500Errors = (err, req, res, next) => {
  console.log(err);
  res
    .status(500)
    .send({ msg: "Internal Server Error" })
    .next(err);
};

exports.badMethod = (req, res, next) => {
  res.status(405).send({ msg: "method not allowed" });
};
