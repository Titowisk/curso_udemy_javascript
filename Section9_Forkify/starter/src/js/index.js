/*jshint esversion: 6 */

// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import ShoppingList from './models/ShoppingList';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes object
 */
const state = {};


/**
 * SEARCH CONTROLLER
 */
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

        try {
            // 4) Search for recipes
            await state.search.getResults();

            // 5) Render the results on UI
            clearLoader();
            searchView.renderResults(state.search.results);
        } catch (error) {
            console.log(`Something wrong with the query: ${error}`);
            clearLoader();
        }
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
        searchView.clearResultsList();
        searchView.renderResults(state.search.results, goToPage);
    }
   
});


/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {

    // GET id from url
    const id = window.location.hash.replace('#', '');

    if(id) {

        // Prepare UI for changes
        recipeView.clearRecipePage();
        renderLoader(elements.recipePage);

        // Highlight Selected search item
        if (state.recipe) searchView.clearHighLighted(state.recipe.id);
        if (state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);
      
        try {
            // Get recipe data and parseIngredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            // from this point, if the request end up failling, the Recipe object will be empty
            // therefore, the following methods can throw errors. So another try/catch is needed here

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
        } catch (error) {
            console.log(`Unable to fetch recipe :${error}`);
        }
        // Render recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe);
    }
};
// https://developer.mozilla.org/en-US/docs/Web/API/Location

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
// Instead of the one above, the one below is better
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe button clicks
elements.recipePage.addEventListener('click', e => {
    // verifies if the click matches the specified class or any childs
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // decrease button is clicked
        if ( state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);

        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);

    }

});

window.l = new ShoppingList();