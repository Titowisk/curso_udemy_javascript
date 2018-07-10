/*jshint esversion: 6 */
// Global app controller
// http://food2fork.com/api/search 
// 320ed15f203d48e0f72158937fbd59bf food2fork API key
// https://cors-anywhere.herokuapp.com/ for cors problems

import Search from './models/Search';

const search = new Search('pizza');
console.log(search);
search.getResults();
