const scrapeBCA = require("./scrapers/bca");
const scrapeMandiri = require("./scrapers/mandiri");
// const scrapeBNI = require("./scrapers/bni");
const scrapeBRI = require("./scrapers/bri");

module.exports = Promise.all([

  // All bank scrapers
  scrapeBCA(),
  scrapeMandiri(),
  // scrapeBNI(),
  scrapeBRI()
]).then(results => {
  // Extract e-rate sell values (index 1) from each bank's data array
  const data = results.map(result => {
    if (result.data && result.data.length >= 2) {
      return result.data[1].replace(/[.,]00$/, "").replace(/\./g, "");
    }
    return 0; // Default value if no data available
  });

  // Sort data descending (largest first)
  data.sort((a, b) => Number(b) - Number(a));

  return {
    status: "success",
    timestamp: new Date().toISOString(),
    data: data,
    // result: results
  };
}).catch(error => {
  return {
    status: "error",
    message: error.message,
    timestamp: new Date().toISOString(),
    data: []
  };
});