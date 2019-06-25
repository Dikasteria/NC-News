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

describe("makeRefObj", () => {});

describe("formatComments", () => {});
