const page = require("../getPage");

// tanggal update ada di header kolom e-Rate
const dateUpdatePoint = "thead th.header-column:nth-child(2) span.a-text-micro";
const currencyPoint = "td.first-column p.a-body-state span";
const erateBuyPoint = "td.rate-column[rate-type='eRate-buy'] p";
const erateSellPoint = "td.rate-column[rate-type='eRate-sell'] p";
const ttBuyPoint = "td.rate-column[rate-type='TTCounter-buy'] p";
const ttSellPoint = "td.rate-column[rate-type='TTCounter-sell'] p";
const bankNotesBuyPoint = "td.rate-column[rate-type='BankNotes-buy'] p";
const bankNotesSellPoint = "td.rate-column[rate-type='BankNotes-sell'] p";

module.exports = () => {
  return page().then(($) => {
    // ambil tanggal update BCA
    const lastUpdated = $(dateUpdatePoint).first().text().trim();

    const bcaData = {
      bank: "BCA",
      status: "success",
      last_updated: lastUpdated,
      data: [],
    };

    $("tbody tr.m-table-body-row").each((i, elm) => {
      const currency = $(elm).find(currencyPoint).text().trim();
      
      // Filter USD
      if (currency === "USD") {
        const buyRate = $(elm).find(erateBuyPoint).text().trim();
        const sellRate = $(elm).find(erateSellPoint).text().trim();
        
        // Format 
        bcaData.data.push(buyRate, sellRate);
      }
    });

    return bcaData;
  });
};