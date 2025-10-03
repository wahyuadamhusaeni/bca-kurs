const { default: axios } = require("axios");
const cheerio = require("cheerio");

const scrapeMandiri = async () => {
  try {
    const timestamp = new Date().toISOString();
    const response = await axios.get('https://www.bankmandiri.co.id/kurs?timestamp=' + timestamp, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const data = [];

    // Update date from header
    const lastUpdated = $('div:contains("Kurs Bank Mandiri")').next().text().trim();

    // Scrape data kurs from table
    $('table tr').each((i, row) => {
      if (i === 0) return;

      const cells = $(row).find('td');
      if (cells.length >= 3) {
        const currency = $(cells[0]).text().trim();
        const buyRate = $(cells[1]).text().trim().replace(/[^\d.,]/g, '');
        const sellRate = $(cells[2]).text().trim().replace(/[^\d.,]/g, '');

        // Filter USD
        if (currency === "USD" && buyRate && sellRate) {
          // Format 
          data.push(buyRate, sellRate);
        }
      }
    });

    return {
      bank: "Mandiri",
      status: "success",
      last_updated: new Date().toISOString(),
      data: data
    };
  } catch (error) {
    return {
      bank: "Mandiri",
      status: "error",
      message: error.message,
      data: []
    };
  }
};

module.exports = scrapeMandiri;