const fetchUsersByUsername = require("../models/fetch-users-by-username");
const getUsersByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUsersByUsername(username)
    .then(user => {
      if (user.length < 1) {
        return Promise.reject({ code: 404, msg: "page not found" });
      }
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = getUsersByUsername;
