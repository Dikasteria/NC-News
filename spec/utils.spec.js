const { expect } = require("chai");
const { formatDate, makeRefObj, formatComments } = require("../db/utils/utils");

describe("formatDate", () => {
  it("returns an empty array when passed an empty array", () => {
    expect(formatDate([])).to.eql([]);
  });
  it("returns a date in format YYYY-MM-DD HH:MM:SS array when passed an array with one unix timestamp", () => {
    expect(
      formatDate([
        {
          body:
            "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          belongs_to: "They're not exactly dogs, are they?",
          created_by: "butter_bridge",
          votes: 16,
          created_at: 1511354163389
        }
      ])
    ).to.eql([
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: new Date(1511354163389)
      }
    ]);
  });
  // it("Does not mutate the original array", () => {
  //   expect(formatDate([])).to.eql([]);
  // });
});

describe("makeRefObj", () => {
  it("returns empty object when passed an empty array", () => {
    expect(makeRefObj([])).to.eql({});
  });
  it("returns an object with key value pair of title and article id", () => {
    expect(makeRefObj([{ article_id: 1, title: "A" }])).to.eql({ A: 1 });
    expect(
      makeRefObj([{ article_id: 1, title: "A" }, { article_id: 2, title: "B" }])
    ).to.eql({ A: 1, B: 2 });
  });
});

describe("formatComments", () => {
  it("returns an empty array when passed an empty array", () => {
    expect(formatComments([])).to.eql([]);
  });
  it("returns an array with relevant amendments when passed an array of one object", () => {
    expect(
      formatComments(
        [
          {
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            belongs_to: "They're not exactly dogs, are they?",
            created_by: "butter_bridge",
            votes: 16,
            created_at: 1511354163389
          }
        ],
        { A: 1 }
      )
    ).to.eql([
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 1,
        author: "butter_bridge",
        votes: 16,
        created_at: new Date(1511354163389)
      }
    ]);
  });
});
