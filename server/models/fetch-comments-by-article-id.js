const connection = require("../../db/connection");

const fetchCommentsByArticleId = article_id => {
  // console.log(article_id, "<<<<<<>>>>>>");
  return connection("comments")
    .where({ "comments.article_id": article_id })
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .orderBy("votes", "desc");
};

module.exports = fetchCommentsByArticleId;

// .from("comments")
// .where({ "comments.article_id": article_id })
// .select("*")
//
