import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = ' ';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';      //clear product results on left
    elements.searchResPages.innerHTML = '';     //clear Buttons
};

/*
 'Pasta with Tomato and Spinach
 acc:0 / acc +cur.length = 5 / newTitle = ['Pasta']
 acc:5 / acc +cur.length = 9 / newTitle = ['Pasta','with']
 acc:9 / acc +cur.length = 15 / newTitle = ['Pasta','with','Tomato]
 acc:15 / acc +cur.length = 18 (>17) / newTitle = ['Pasta','with','Tomato]
*/
const limitRecipeTitle = (title, limit=17)=>{
    const newTitle = [];
    if(title.length >limit){
        title.split('').reduce((acc, cur)=>{
            if(acc + cur.length <= limit){
                newTitle.push(cur);
        }
        return acc + cur.length;
        }, 0);

        //return the result
        return `${newTitle.join('')}...`;
    }
    return title;
}


/*
const limitRecipeTitle = (title, limit = 17) => {
    if(title.length > limit){                           // Checking if length is greater than limit...
        for(let i = limit; i > 0; i--) {                // 'i' starts decrementing from the limit(default 17)
            if(title.charAt(i) === ' ') {               // Checking if there is a empty string
                let newTitle = `${title.substring(0, i)}...`; // If 'true' substring the title starting from char num at position 0 to char num at position 'i'
                    return newTitle;
                break;                                  // 'break' to stop looping
            }
        }
    } else return title;
}
*/

const renderRecipe = recipe => {
    const markup = `
        <li>
           <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}


//type: 'prev or 'next'
//Plugin the data into this button conatining the number of the page where we want to move whenever we click the button

const createButton = (page, type) =>

`     
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev'? page-1: page+1}>
            <span>Page ${type === 'prev'? page-1: page+1}</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${type === 'prev'? 'left': 'right'}"></use>
                </svg>
    </button>

`;



const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if(page === 1 && pages > 1){
        //only Button to go next page && Display only if it has atleast one page
      button = createButton(page, 'next');
    } else if (page < pages){
        //Both Button to go next and Previous page
         button =`
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
      ` ;
    }else if( page === pages && pages > 1){
        //only Button to go previous page && Display only if it has atleast one page
        button =createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};


export const renderResults = (recipes, page=1, resPerPage=10) =>
{
    //render results of current page
    const start = (page - 1)*resPerPage;        //0,10,20
    const end = page *resPerPage ;              //10,20,30

    recipes.slice(start,end).forEach(renderRecipe); //slice method slices upto end but not include end number


    //render pagination buttons
    renderButtons(page,recipes.length,resPerPage);
}

