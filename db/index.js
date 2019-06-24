//The job of the db/index.js file will be to export out of the db folder only the data relevant to the current environment. Specifically this file should allow your seed file to access only a specific set of data depending on the environment it's in: test, development or production. To do this is will have to require in all the data and should make use of process.env in your index.js file to achieve only exporting the right data out.
const testData = require("./test-data");
const devData = require("./development-data");

exports.seed = function(knex, Promise) {};

modeule.exports = { testData, devData };
