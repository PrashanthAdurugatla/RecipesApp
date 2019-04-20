import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from './views/base';


/**Global State
 * Search object
 * Current recipe object
 * Shopping List object
 * Liked recipes**/

const state = {};


/**
 * SEARCH CONTROLLER
 */

const controlSearch = async ()=>{
    //1) Get query from view
    const query = searchView.getInput();
    //console.log(query);

    if(query) {
        state.search = new Search(query);


        //2)prepare UI for Results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);


        try {
            //3)Search for recipes
            await
            state.search.getResults();  //getResults is async it returns a promise

            //4)Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert("Something wrong with Search");
            clearLoader();
        }
    }

}

elements.searchForm.addEventListener('submit',e => {
    e.preventDefault();     //Automaticaly its geting reloaded so prevent it from reloading//
    controlSearch();
});



//Concept of Event Deligation is Used because the pagination cant be done before loading the results in such cases we use target and event bubling concepts//
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    //console.log(btn);
    if(btn){
     const goToPage = parseInt(btn.dataset.goto, 10);   //10 is the base (0--9). when we prefix the data is stored in dataset.goto(attribute)
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        //console.log(gotoPage);
    }
});


/**
 * RECIPE CONTROLLER
 */

const controlRecipe = async ()=>{
    //Read data from Page URl
    const id = window.location.hash.replace('#', '');   //retuns #45678 so need to replace with empty i.e., 45678 (HashChange Event)
    console.log(id);


    if(id) {
        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        //Create new recipe object and parse Ingredients

        state.recipe = new Recipe(id);
        console.log(state.recipe.ingredients);

        try{
            //Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //Cal servings and Time
            state.recipe.calcServings();
            state.recipe.calcTime();

            //Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
           // console.log(state.recipe);




        }catch (error){
            alert("Error Processing Recipe");  //Second Catch
        }

    }
};
//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load',controlRecipe);

['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
        state.recipe.updateServings('dec');
        recipeView.updateServingsIngredients(state.recipe);
    }
} else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
} else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // Add ingredients to shopping list
    controlList();
} else if (e.target.matches('.recipe__love, .recipe__love *')) {
    // Like controller
    controlLike();
}
});