const connection = require("../../db/connection");

const newArticle = ({ title, topic, author, body, votes }) => {
  return connection("articles")
    .insert({
      title,
      topic,
      author,
      body,
      votes
    })
    .returning("*");
};

module.exports = newArticle;
