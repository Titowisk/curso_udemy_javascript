/*jshint esversion: 6 */

// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import Likes from './models/Likes';
import ShoppingList from './models/ShoppingList';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes object
 */
const state = {};
window.state = state; // TESTING


/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();
    console.log(query); // Testing

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

/**
 * Shopping List CONTROLLER
 */
const controlShoppingList = () => {

    // Create a new list if there is none yet
    if (!state.shoppingList) state.shoppingList = new ShoppingList();

    // Add each igredient to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.shoppingList.addItem(el.count, el.unit, el.ingredient);
        shoppingListView.renderItem(item)
    });
};

/**
 * Likes CONTROLLER
 */
const controlLikes = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    // User has NOT yet liked the recipe
    if (!state.likes.isLiked(currentID)) {
        // add like to the state.likes
            // id, title, author, img
        state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        )

        // toggle the like button

        // add like to UI list

        console.log(state.likes); // TEST
    // User HAS liked the recipe 
    } else {
        // remove like from the state.likes
        state.likes.deleteLike(currentID)
        // toggle the like button

        // remove like from UI list

        console.log(state.likes); // TEST
    }
};

 /**
 * Event CONTROLLER
 */
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
// Instead of the one above, the one below is better
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// handle delete and update shopping list events
elements.shopping.addEventListener('click', e=> {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if( e.target.matches('.shopping__delete, .shopping__delete *') ) {
        //Delete from state
        state.shoppingList.deleteItem(id);

        //Delete from UI
        shoppingListView.deleteItem(id);

    } else if (e.target.matches('.shopping__count-value')) {
        // take the value from the input and update the attribute count in shoppingList model
        const val = e.target.value;
        state.shoppingList.updateCount(id, val);
    } 
});

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

    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlShoppingList();

    } else if (e.target.matches('.recipe__love, .recipe__love *') ) {
        controlLikes();
    }

});