process.env.NODE_ENV = "test";
const { expect } = require("chai");
const app = require("../app");
const request = require("supertest")(app);
const connection = require("../../db/connection");
const chai = require("chai");
chai.use(require("chai-sorted"));

describe("", () => {
  after(() => {
    connection.destroy();
  });
  describe("/topics", () => {
    it("GET, responds with 200", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(res.body.topics).to.be.an("array");
          expect(topics[0]).to.contain.keys("slug", "description");
        });
    });
  });
});
