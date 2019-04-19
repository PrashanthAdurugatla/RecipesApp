import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';


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
    renderLoader(elements.searchRes);



    //3)Search for recipes
    await state.search.getResults();  //getResults is async it returns a promise

    //4)Render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
};

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
