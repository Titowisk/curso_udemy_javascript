// Global app controller
// http://food2fork.com/api/search 
// 320ed15f203d48e0f72158937fbd59bf food2fork API key
// https://cors-anywhere.herokuapp.com/ for cors problems
import axios from 'axios';

async function getResults(query) {
    try {
        const key = 'aaaaaaa320ed15f203d48e0f72158937fbd59bf';
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`);
        console.log(res);
    } catch (error) {
        console.log(`Eita zorra!: ${error}`);
    }
}
getResults('chicken');
