"use strict";
// index.ts
exports.__esModule = true;
var axios_1 = require("axios");
var url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1'; // URL we're scraping
var AxiosInstance = axios_1["default"].create(); // Create a new Axios Instance
// Send an async HTTP Get request to the url
AxiosInstance.get(url)
    .then(// Once we have data returned ...
function (// Once we have data returned ...
response) {
    var html = response.data; // Get the HTML from the HTTP request
  const $ = cheerio.load(html); // Load the HTML string into cheerio
      const statsTable: Cheerio = $('.statsTableContainer > tr'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
      console.log(statsTable); // Log the number of captured elements
})["catch"](console.error); // Error handling
