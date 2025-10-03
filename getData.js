const { default: axios } = require("axios");
const timestamp = new Date().toISOString();
const urlEndpoint = 'https://www.bca.co.id/id/informasi/kurs?timestamp=' + timestamp;
const getDataPromise = async () => {
    const response = await axios.get(
        urlEndpoint
    );
    return response.data;
};

module.exports = getDataPromise;