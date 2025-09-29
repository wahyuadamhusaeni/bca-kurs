const scrapeBCA = require("./scrapers/bca");
const scrapeMandiri = require("./scrapers/mandiri");
const scrapeBNI = require("./scrapers/bni");
const scrapeBRI = require("./scrapers/bri");
const scrapeBTN = require("./scrapers/btn");

module.exports = Promise.all([

  // All bank scrapers
  scrapeBCA(),  
  scrapeMandiri(),
  scrapeBNI(),
  scrapeBRI(),
  scrapeBTN()
]).then(results => {
  return {
    status: "success",
    timestamp: new Date().toISOString(),
    banks: results
  };
}).catch(error => {
  return {
    status: "error",
    message: error.message,
    timestamp: new Date().toISOString(),
    banks: []
  };
});