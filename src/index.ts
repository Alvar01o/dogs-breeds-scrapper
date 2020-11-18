// index.ts

import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://www.dogbreedinfo.com/abc.htm'; // URL we're scraping
const AxiosInstance = axios.create(); // Create a new Axios Instance

// Send an async HTTP Get request to the url
AxiosInstance.get(url)
  .then( // Once we have data returned ...
    response => {
      const html = response.data; // Get the HTML from the HTTP request
       const $ = cheerio.load(html); // Load the HTML string into cheerio
        let matches = $('li');
        let breeds:Array<string> = [];

        matches.each(function(index, element){
            if($(element).text().length > 3 && index < 2351 && index > 40 && $(element).text() !== "X-Y-Z" ) {
                let par = $(element).text().indexOf("(");
                if(par == -1) {
                    breeds.push($(element).text())
                    console.log($(element).text())
                } else {
                    breeds.push($(element).text().slice(0, par))
                    console.log($(element).text().slice(0, par))
                }


            }
        })
        console.log("Total items added : " + breeds.length);
   }
  )
  .catch(console.error); // Error handling