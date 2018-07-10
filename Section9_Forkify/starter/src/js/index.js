/*jshint esversion: 6 */
// Global app controller
// http://food2fork.com/api/search 
// 320ed15f203d48e0f72158937fbd59bf food2fork API key
// https://cors-anywhere.herokuapp.com/ for cors problems
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes object
 */
const state = {};

const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();
    console.log(query);

    if (query) {
        
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResultsList();

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render the results on UI
        searchView.renderResults(state.search.results);
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

