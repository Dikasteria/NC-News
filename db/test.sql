\c nc_news_test;

SELECT *
FROM comments;




-- SELECT * FROM articles JOIN comments ON comments.article_id = articles.article_id;

-- SELECT articles.*, COUNT(articles.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = 1 GROUP BY articles.article_id;


-- .select("articles.*")
--     .count({ comment_count: "articles.article_id" })
--     .from("articles")
--     .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
--     .where({ "articles.article_id": article_Id })
--     .groupBy("articles.article_id");
-- };