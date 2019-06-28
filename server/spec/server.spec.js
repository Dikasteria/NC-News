process.env.NODE_ENV = "test";
const { expect } = require("chai");
const app = require("../app");
const request = require("supertest")(app);
const connection = require("../../db/connection");
const chai = require("chai");
chai.use(require("chai-sorted"));

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
    it("status:404, non-existent route", () => {
      return request.get("/api/topics/bananas").expect(404);
    });
  });
  describe("/users/:username", () => {
    it("GET, returns user by username", () => {
      return request
        .get("/api/users/icellusedkars")
        .expect(200)
        .then(({ body: user }) => {
          expect(user.user[0]).to.contain.keys(
            "username",
            "avatar_url",
            "name"
          );
        });
    });
    it("status; 404, user not found", () => {
      return request.get("/api/users/kfkffk").expect(404);
    });
  });
  describe("/articles/:article_id", () => {
    it("GET, returns article by id", () => {
      return request
        .get("/api/articles/1")
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article[0]).to.contain.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "comment_count"
          );
          expect(article[0].comment_count).to.equal("13");
        });
    });
    it("status: 404, article not found", () => {
      return request.get("/api/articles/3333").expect(404);
    });
    it("PATCH, adds a vote increment to articles by ID", () => {
      return request
        .put("/api/articles/1")
        .send({ inc_votes: 1 })
        .expect(201)
        .then(res => {
          expect(res.body.article[0].votes).to.equal(101);
        });
    });
    it("POST, posts a new comment to the database ", () => {
      return request
        .post("/api/articles/1/")
        .send({
          username: "butter_bridge",
          body: "Hello there..."
        })
        .expect(201)
        .then(res => {
          expect(res.body.comment[0]).to.contain.keys(
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          );
        });
    });
    it("status: 400, empty object passed", () => {
      return request
        .post("/api/users/1/")
        .send({})
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("page not found");
        });
    });
  });
  describe("/api/articles/:article_id/comments", () => {
    it("GET, responds with an array of comments by article_id", () => {
      return request
        .get("/api/articles/9/comments")
        .expect(200)
        .then(response => {
          expect(response.body[0]).to.have.keys(
            `comment_id`,
            `votes`,
            `created_at`,
            `author`,
            `body`
          );
          expect(response.body).to.be.sortedBy("created_at", {
            descending: true
          });
        });
    });
    it.only("GET, comments can be sorted by other columns", () => {
      return request
        .get("/api/articles/1/comments?sort_by=author&order_by=desc")
        .expect(200)
        .then(comments => {
          expect(comments.body).to.be.descendingBy("author");
        });
    });
    it("status: 404, invalid article_id", () => {
      return request.get("/api/articles/3333").expect(404);
    });
    it("status: 404, invalid route", () => {
      return request.get("/api/choke/31333").expect(404);
    });
  });
  // describe("/api/articles", () => {
  //   it("GET, eturns articles (sorted, ordered, filtered by author, filters by topic", () => {
  //     return request
  //       .get("/api/articles")
  //       .expect(200)
  //       .then(response => {
  //         expect(response.body).to.have.keys(
  //           "author",
  //           "title",
  //           "article_id",
  //           "topic",
  //           "created_at",
  //           "votes",
  //           "comment_count"
  //         );
  //       });
  //   });
  // });
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
//     - `/api/resource/notAnId` -> invalid ID: ** 400 Bad Request **
//       - `/api/resource` body: `{}` -> malformed body / missing required fields: ** 400 Bad Request **
