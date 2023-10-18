const express = require("express");
const app = express();
const response = require("./response");

// Load environment variables from .env
require('dotenv').config();

app.get("/", function (req, res) {
  response.response(res);
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
