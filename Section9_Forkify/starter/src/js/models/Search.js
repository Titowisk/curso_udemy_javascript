/*jshint esversion: 6 */
import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const key = '320ed15f203d48e0f72158937fbd59bf';
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            console.log(this.result);
        } catch (error) {
            console.log(`Eita zorra!: ${error}`);
        }
    }
}