/*jshint esversion: 6 */
// Global app controller
// http://food2fork.com/api/search 
// 320ed15f203d48e0f72158937fbd59bf food2fork API key
// https://cors-anywhere.herokuapp.com/ for cors problems
import Search from './models/Search';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes object
 */
const state = {};

const controlSearch = async () => {
    // 1) Get query from view
    const query = 'pizza'; // TODO

    if (query) {
        
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render the results on UI
        console.log(state.search.result);
    }
};

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

