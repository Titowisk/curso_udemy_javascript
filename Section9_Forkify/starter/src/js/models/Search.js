/*jshint esversion: 6 */
import axios from 'axios';
import {key, proxy} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.results = res.data.recipes;
            
        } catch (error) {
            console.log(`Eita zorra!: ${error}`);
        }
    }
}