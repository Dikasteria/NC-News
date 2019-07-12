process.env.NODE_ENV = "test";
const { expect } = require("chai");
const app = require("../app");
const request = require("supertest")(app);
const connection = require("../../db/connection");
const chai = require("chai");
chai.use(require("chai-sorted"));
const jsonData = require("../../endpoints.json");

describe("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    connection.destroy();
  });
  describe("/topics", () => {
    it("GET, responds with 200", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics[0]).to.contain.keys("slug", "description");
        });
    });
  });
  describe("/users/:username", () => {
    it("GET, returns user by username", () => {
      return request
        .get("/api/users/icellusedkars")
        .expect(200)
        .then(({ body }) => {
          expect(body.user).to.contain.keys("username", "avatar_url", "name");
        });
    });
    it("status; 404, user not found", () => {
      return request
        .get("/api/users/kfkffk")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal("page not found");
        });
    });
    describe("/articles/:article_id", () => {
      it("GET, returns article by id", () => {
        return request
          .get("/api/articles/1")
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).to.contain.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "comment_count"
            );
            expect(article.comment_count).to.equal("13");
          });
      });
      it("status: 404, article not found", () => {
        return request.get("/api/articles/3333").expect(404);
      });
      it("PATCH, adds a vote increment to articles by ID", () => {
        return request
          .patch("/api/articles/1")
          .send({ inc_votes: 1 })
          .expect(200)
          .then(res => {
            expect(res.body.article.votes).to.equal(101);
          });
      });
      it("PATCH, adds a vote increment to articles by ID", () => {
        return request
          .patch("/api/articles/1")
          .send({ inc_votes: -1 })
          .expect(200)
          .then(res => {
            expect(res.body.article.votes).to.equal(99);
          });
      });
      it("PATCH, returns 404 when passed wrong article_id ", () => {
        return request
          .patch("/api/articles/56")
          .send({ inc_votes: 1 })
          .expect(404);
      });
      it("PATCH, returns original article with no amendments when passed no info to update", () => {
        return request
          .patch("/api/articles/56")
          .send({})
          .expect(404);
      });
      it("PATCH, status 400 for posting invalid value in body", () => {
        return request
          .patch("/api/articles/1")
          .send({ inc_votes: "invalid value" })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Not Found");
          });
      });
      it("POST, posts a new comment to the database ", () => {
        return request
          .post("/api/articles/1/comments")
          .send({
            username: "butter_bridge",
            body: "Hello there..."
          })
          .expect(201)
          .then(res => {
            expect(res.body.comment).to.contain.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
          });
      });
      it("status: 400, sending no data", () => {
        return request
          .post("/api/articles/1/comments")
          .send({})
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Not Found");
          });
      });
      it("status: 422, valid article_id data type but out of range", () => {
        return request
          .post("/api/articles/1000/comments")
          .send({
            username: "butter_bridge",
            body: "Hello there..."
          })
          .expect(422)
          .then(({ body }) => {
            expect(body.msg).to.equal("unprocessable entity");
          });
      });
    });
    describe("/api/articles/:article_id/comments", () => {
      it("GET, responds with an array of comments by article_id", () => {
        return request
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments[0]).to.have.keys(
              `comment_id`,
              `votes`,
              `created_at`,
              `author`,
              `body`
            );
            expect(comments).to.be.sortedBy("created_at", {
              descending: true
            });
          });
      });
      it("GET, status 200: comments returns empty array when passed a valid article id with no comments attached to it", () => {
        return request
          .get("/api/articles/2/comments")
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.eql([]);
          });
      });
      it("GET, comments can be sorted by other columns", () => {
        return request
          .get("/api/articles/1/comments?sort_by=author&order_by=asc")
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.be.ascendingBy("author");
          });
      });
      it("GET, comments can be sorted by other columns", () => {
        return request
          .get("/api/articles/1/comments?sort_by=votes&order_by=asc")
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.be.ascendingBy("votes");
          });
      });
      it("GET, comments can be sorted by other columns", () => {
        return request
          .get("/api/articles/1/comments?sort_by=votes&order_by=jugs")
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.be.descendingBy("votes");
          });
      });
      it("status: 404, invalid article_id", () => {
        return request.get("/api/articles/3333/comments").expect(404);
      });
      it("status: 400, invalid article_id", () => {
        return request.get("/api/articles/cheese/comments").expect(400);
      });
      it("status: 405, invalid route", () => {
        return request.get("/api/choke/2").expect(405);
      });
    });
    describe("/api/articles", () => {
      it("GET, returns articles with comment count", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(({ body: { articles: [article] } }) => {
            expect(article).to.have.keys(
              "author",
              "title",
              "article_id",
              "topic",
              "created_at",
              "votes",
              "comment_count",
              "body"
            );
          });
      });
      it("GET, returns articles with comment count (sorted, ordered, filters by author, filters by topic) ", () => {
        return request
          .get("/api/articles?sort_by=body&order_by=asc&author=icellusedkars")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles[0]).to.contain.keys("comment_count");
            expect(articles[1].author).to.equal("icellusedkars");
            expect(articles).to.be.ascendingBy("body");
          });
      });
      it("GET, passing an incorrect topic parameter", () => {
        return request
          .get("/api/articles?topic=not-a-topic")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("page not found");
          });
      });
      it("GET, passing an incorrect author parameter", () => {
        return request
          .get("/api/articles?author=not-an-author")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("page not found");
          });
      });
      it("GET, passing an incorrect column parameter", () => {
        return request.get("/api/articles?column=not-a-column").expect(200);
      }); //will pass as fall back on default 'created_at'
      it("Get, returns a 400 when passed an incorrect order by column command", () => {
        return request.get("/api/articles?sort_by=not-a-column").expect(400);
      });
      it("GET, passing an incorrect order parameter", () => {
        return request.get("/api/articles?order=not-asc-or-desc").expect(200);
      }); //will pass as fall back on default 'desc'
    });
    describe("/api/comments/:comment_id", () => {
      it("PATCH, updates comments by id with vote increments", () => {
        return request
          .patch("/api/comments/1")
          .send({ inc_votes: 10 })
          .expect(200)
          .then(({ body: { comment: { votes } } }) => {
            expect(votes).to.equal(26);
          });
      });
      it("PATCH, status 400: Bad Request status code when sent an invalid `inc_votes` value", () => {
        return request
          .patch("/api/comments/1")
          .send({ inc_votes: "cheese" })
          .expect(400);
      });
      it("PATCH, returns comment unchanged when passed no inc-votes key/value pair", () => {
        return request
          .patch("/api/comments/1")
          .send({ no_votes: "cheese" })
          .expect(200)
          .then(({ body: { comment: { votes } } }) => {
            expect(votes).to.equal(16);
          });
      });
      it("PATCH, status 400: Bad Request status code when sent an invalid comment ID", () => {
        return request
          .patch("/api/comments/cheese")
          .send({ inc_votes: 10 })
          .expect(400);
      });
      it("PATCH, status 404: Valid comment_id but out of range", () => {
        return request
          .patch("/api/comments/1000")
          .send({ inc_votes: 10 })
          .expect(404);
      });
    });
    describe("/api/comments/:comment_id", () => {
      it("DELETE, deletes a comment by comment id", () => {
        return request.delete("/api/comments/1").expect(204);
      });
      it("DELETE, status 400: Bad request when passed an invalid comment ID", () => {
        return request.delete("/api/comments/999999").expect(400);
      });
    });
  });
  it("GET, 200 successful get and JSON object returned as expected", () => {
    return request
      .get("/api")
      .expect(200)
      .then(({ body: { endPoints } }) => {
        expect(endPoints).to.eql(jsonData);
      });
  });
  describe("Invalid Methods", () => {
    it("Returns status 405", () => {
      const invalidMethods = ["put"];
      const methodPromises = invalidMethods.map(method => {
        return request[method]("/api")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
  });
  describe("/api/articles", () => {
    it("POST, posts a new article to the database", () => {
      return request
        .post("/api/articles")
        .send({
          title: "creating a restful api server",
          topic: "paper",
          author: "lurker",
          body: "This is a story on how not to create a restful API server,",
          votes: 2
        })
        .expect(201)
        .then(res => {
          expect(res.body.article).to.contain.keys(
            "title",
            "topic",
            "author",
            "body",
            "created_at"
          );
        });
    });
    it("POST, status 400, empty body passed", () => {
      return request
        .post("/api/articles")
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("Not Found");
        });
    });
    it.only("POST, status 400, incorrect fields passed", () => {
      return request
        .post("/api/articles")
        .send({
          title: "No idea",
          fields: "cheese",
          cinema: "lurker",
          body: "Hello!",
          votes: "snooze"
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("Not Found");
        });
    });
  });
});

// ### GET All

//   - `/notARoute` -> route that does not exist: ** 404 Not Found **

// ### GET by ID

//   - `/api/resource/999999999` -> resource that does not exist: ** 404 Not Found **
//     - `/api/resource/notAnId` -> invalid ID: ** 400 Bad Request **

// ### POST

//   - `/api/resource` body: `{}` -> malformed body / missing required fields: ** 400 Bad Request **
//     - `/api/resource` body: `{ rating_out_of_five: 6 }` -> failing schema validation: ** 400 Bad Request **

// ### DELETE / PATCH / PUT by ID

//   - `/api/resource/999999999` -> resource that does not exist: ** 404 Not Found **
