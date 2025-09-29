const { default: axios } = require("axios");
const cheerio = require("cheerio");

const scrapeBRI = async () => {
  try {
    const response = await axios.get('https://bri.co.id/kurs-detail', {
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
    const data = [];
    
    // Try multiple selectors for BRI currency table
    const selectors = [
      '.table-responsive table tbody tr',
      '.currency-table tbody tr',
      '.kurs-table tbody tr',
      'table.table tbody tr',
      '.exchange-rate-table tbody tr',
      'table tbody tr',
      '.kurs-row',
      '.currency-item',
      '.rate-item'
    ];
    
    for (const selector of selectors) {
      $(selector).each((i, row) => {
        const $row = $(row);
        const cells = $row.find('td');
        
        if (cells.length >= 3) {
          const currency = $(cells[0]).text().trim();
          const buyRate = $(cells[1]).text().trim().replace(/[^\d.,]/g, '');
          const sellRate = $(cells[2]).text().trim().replace(/[^\d.,]/g, '');
          
          // Filter valid currency codes (hanya USD) dan validasi format
          if (currency === "USD" && buyRate && sellRate && 
              !data.find(d => d.mata_uang === currency)) {
            data.push({
              mata_uang: currency,
              beli: buyRate,
              jual: sellRate
            });
          }
        }
      });
      
      if (data.length > 0) break;
    }
    
    // Alternative scraping for different structure
    if (data.length === 0) {
      $('.currency-item, .rate-item').each((i, item) => {
        const $item = $(item);
        const currency = $item.find('.currency-code, .mata-uang').text().trim();
        const buyRate = $item.find('.buy-rate, .beli').text().trim().replace(/[^\d.,]/g, '');
        const sellRate = $item.find('.sell-rate, .jual').text().trim().replace(/[^\d.,]/g, '');
        
        if (currency === "USD" && buyRate && sellRate && 
            !data.find(d => d.mata_uang === currency)) {
          data.push({
            mata_uang: currency,
            beli: buyRate,
            jual: sellRate
          });
        }
      });
    }
    
    // Try generic table scraping as fallback
    if (data.length === 0) {
      $('table tr').each((i, row) => {
        if (i === 0) return; // Skip header
        
        const $row = $(row);
        const cells = $row.find('td');
        
        if (cells.length >= 3) {
          const currency = $(cells[0]).text().trim();
          const buyRate = $(cells[1]).text().trim().replace(/[^\d.,]/g, '');
          const sellRate = $(cells[2]).text().trim().replace(/[^\d.,]/g, '');
          
          if (currency === "USD" && buyRate && sellRate && 
              !data.find(d => d.mata_uang === currency)) {
            data.push({
              mata_uang: currency,
              beli: buyRate,
              jual: sellRate
            });
          }
        }
      });
    }
    
    return {
      bank: "BRI",
      status: data.length > 0 ? "success" : "no_data",
      last_updated: new Date().toISOString(),
      data: data
    };
  } catch (error) {
    console.error('BRI scraping error:', error.message);
    return {
      bank: "BRI",
      status: "no_data",
      last_updated: new Date().toISOString(),
      data: []
    };
  }
};

module.exports = scrapeBRI;