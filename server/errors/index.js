exports.handlePsql400Errors = (err, req, res, next) => {
  console.log(err.code);
  const codes = ["22P02", "42601"];
  if (codes.includes(err.code)) {
    res.status(404).send({ msg: "Not Found" });
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
//handle 404, 422 errors,

//app
//   .use((err, req, res, next) => {
//     const codes = ["42703"];
//     if (codes.includes(err.code)) {
//       res.status(400).send({ msg: 'bad request' });
//     } else {
//       next(err);

//   )}
// app.use((err, req, res, next) => {
//   res.status(500).send({ msg: "Internal Server Error" });
// });
