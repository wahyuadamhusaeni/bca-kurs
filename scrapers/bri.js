const { default: axios } = require("axios");
const cheerio = require("cheerio");

const scrapeBRI = async () => {
  try {
    const timestamp = new Date().toISOString();
    const response = await axios.get('https://bri.co.id/kurs-detail?timestamp=' + timestamp, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 15000,
      maxRedirects: 10
    });

    const $ = cheerio.load(response.data);
    let usdData = null;

    // Target the specific table with ID _bri_kurs_detail_portlet_display2
    const table = $('#_bri_kurs_detail_portlet_display2');
    if (table.length) {
      table.find('tbody tr').each((i, row) => {
        const $row = $(row);
        const currency = $row.find('td').first().find('.text').text().trim();
        const buyRate = $row.find('td').eq(1).text().trim().replace(/[^\d.,]/g, '');
        const sellRate = $row.find('td').eq(2).text().trim().replace(/[^\d.,]/g, '');

        if (currency === "USD" && buyRate && sellRate) {
          usdData = [buyRate, sellRate];
          return false; // break loop
        }
      });
    }

    return {
      bank: "BRI",
      status: usdData ? "success" : "no_data",
      last_updated: new Date().toISOString(),
      data: usdData || []
    };
  } catch (error) {
    return {
      bank: "BRI",
      status: "no_data",
      last_updated: new Date().toISOString(),
      data: []
    };
  }
};

module.exports = scrapeBRI;