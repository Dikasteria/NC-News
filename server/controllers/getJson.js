const endPoints = require("../../endpoints.json");

exports.getJson = (req, res, next) => {
  res.status(200).send({ endPoints });
};
