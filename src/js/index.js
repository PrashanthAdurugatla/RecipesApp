import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';


/**Global State
 * Search object
 * Current recipe object
 * Shopping List object
 * Liked recipes**/

const state = {};

const controlSearch = async ()=>{
    //1) Get query from view
    const query = searchView.getInput();
    //console.log(query);

    if(query){
      state.search = new Search(query)
    }

    //2)prepare UI for Results
    searchView.clearInput();
    searchView.clearResults();


    //3)Search for recipes
    await state.search.getResults();  //getResults is async it returns a promise

    //4)Render results on UI
    searchView.renderResults(state.search.result);
}

elements.searchForm.addEventListener('submit',e => {
    e.preventDefault();     //Automaticaly its geting reloaded so prevent it from reloading//
    controlSearch();

});


