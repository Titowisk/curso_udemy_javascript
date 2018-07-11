/*jshint esversion: 6 */
// Global app controller
// http://food2fork.com/api/search 
// 320ed15f203d48e0f72158937fbd59bf food2fork API key
// https://cors-anywhere.herokuapp.com/ for cors problems
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

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
        renderLoader(elements.searchResults);

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render the results on UI
        clearLoader();
        searchView.renderResults(state.search.results);
    }
};

// Handle the results rendering
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// Handle the pagination
// to add event listeners to the buttons, we have to use event delegation
// because the buttons don't exist yet
elements.searchResPages.addEventListener('click', e => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        console.log(goToPage);
        searchView.clearResultsList();
        searchView.renderResults(state.search.results, goToPage);
    }
   
});