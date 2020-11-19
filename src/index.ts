// index.ts

import Scrapper from './Scrapper';


let sc = new Scrapper();
let letters = ["A","B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let breedsToAdd = [];
let onDatabaseCounter = 0;
let onRemoteCounter = 0;

sc.setRemoteValues().then( breeds => {

    sc.setApiValues().then( (apiBreeds) => 
    {
        letters.forEach((letter)=> {
            for (let index = 0; index <  breeds[letter].length; index++) { //breeds on remote
                onRemoteCounter++;
                let exist = false; 
                if(apiBreeds[letter]!==undefined) {

                    for (let index2 = 0; index2 <  apiBreeds[letter].length; index2++) { //breeds on database
                        onDatabaseCounter++;
                        const element =  apiBreeds[letter][index2];
                        if(breeds[letter][index] == element.name) {
                            exist = true;
                        }
                    }
                    if (!exist) {
                        breedsToAdd.push(breeds[letter][index]);
                        //add to the  api
                    }
                } else {
                    breedsToAdd.push(breeds[letter][index]);
                }
            }
        });
        console.log("Total to add :" , breedsToAdd.length);
        console.log(breedsToAdd)
    }).catch( (error) => 
    {
        console.log(error)
    })
});
