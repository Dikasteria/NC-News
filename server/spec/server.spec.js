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
    // it("status: 404, article not found", () => {
    //   return request.get("/api/articles/kfkffk").expect(404);
    // });
    it("PATCH, adds a vote increment to articles by ID", () => {
      return request
        .put("/api/articles/1")
        .send({ inc_votes: 1 })
        .expect(201)
        .then(res => {
          expect(res.body.article[0].votes).to.equal(101);
        });
    });
  });
});
