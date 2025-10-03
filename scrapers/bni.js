const puppeteer = require('puppeteer');

const scrapeBNI = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Set User-Agent 
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
    await page.goto('https://www.bni.co.id/id-id/beranda/informasi-valas', {
      waitUntil: 'networkidle2'
    });

    // Data USD
    const usdRow = await page.evaluate(() => {
      const rows = document.querySelectorAll('table tbody tr');
      for (const row of rows) {
        const cells = row.querySelectorAll('td');
        if (cells[0].innerText.trim().toUpperCase() === 'USD') {
          return {
            buy: cells[1].innerText.trim(),
            sell: cells[2].innerText.trim()
          };
        }
      }
      return null;
    });

    await browser.close();

    if (!usdRow) {
      return {
        bank: 'BNI',
        status: 'no_data',
        last_updated: new Date().toISOString(),
        data: []
      };
    }

    return {
      bank: 'BNI',
      status: 'success',
      last_updated: new Date().toISOString(),
      data: [usdRow.buy, usdRow.sell]
    };

  } catch (error) {
    return {
      bank: 'BNI',
      status: 'error',
      error: error.message,
      last_updated: new Date().toISOString(),
      data: []
    };
  }
};

module.exports = scrapeBNI;
