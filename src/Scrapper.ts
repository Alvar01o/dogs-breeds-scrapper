import axios from 'axios';
import cheerio from 'cheerio';



interface Pets {
    id:number , 
    name:string
}

class Scrapper {

    private currentEndpoint:string= "testapi.example.com";
    private url:string = 'https://www.dogbreedinfo.com/abc.htm'; // URL we're scraping
    private AxiosInstance = axios.create(); // Create a new Axios Instance
    private breeds = {};
    private petsOnDatabase = {};

    constructor() {

    }

    setApiValues():Promise<any>{
        return  new Promise((resolve, reject) => {
            this.AxiosInstance.get(this.currentEndpoint)
            .then( // Once we have data returned ...
                response => {
                    let {data} = response.data;
                 //   this.petsOnDatabase = data;

                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        if(this.petsOnDatabase[element.name[0]] === undefined) {
                            this.petsOnDatabase[element.name[0]] = [];
                        }
                        this.petsOnDatabase[element.name[0]].push({ id: element.id , name:element.name})
                    }
                    
                    resolve(this.petsOnDatabase)
                }
            )
            .catch((error)=>{
                reject(error)
            }); // Error handling

        });
    }

    getBreeds() : Object {
        return this.breeds;
    }

    setRemoteValues():Promise<any> {
        return  new Promise((resolve, reject) => {
            this.AxiosInstance.get(this.url)
            .then( // Once we have data returned ...
                response => {
                    const html = response.data; // Get the HTML from the HTTP request
                    const $ = cheerio.load(html); // Load the HTML string into cheerio
                    let matches = $('li');
            
                    matches.each((index, element) => 
                    {
                        if($(element).text().length > 3 && index < 2351 && index > 40 && $(element).text() !== "X-Y-Z" ) {

                            let textElement = $(element).text().trim();

                            if(this.breeds[textElement[0]] === undefined) {
                                this.breeds[textElement[0]] = [];
                            }

                            let par = textElement.indexOf("(");

                            if(par == -1) {
                                this.breeds[textElement[0]].push(textElement) 
                            } else {
                                this.breeds[textElement[0]].push(textElement.slice(0, par-1))
                            }
                        }
                    })
                    resolve(this.breeds)
                }
            ).catch((error)=> {
                reject(error);
            });
        });

    }
}

export default Scrapper;