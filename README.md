# RecipesApp 
A modern JavaScipt and AJAX powered Web application that lets you search over a million recipies of any ingredients that have on your brain. The app displays you a bunch of recipes related to your search. When you select a recipe, the app shows you the ingredients that you need to prepare it. You can like and storage your favorites recipes and add the ingredients to your shopping list.

The back end of forkify is built off a simple MVC framework with index.js being the global controller for the entire project. I tried to implement Asynchronous JavaScript as much as possible with the use of Promises, Async/Await & AJAX calls.

The AJAX calls were mostly for the api used to power forkify which can be found at https://www.food2fork.com/. The free account I used only allowed a maximum of 50 api calls a day which made testing & developing rather difficult.


# Frontend — UX / UI
![Screenshot (311)](https://user-images.githubusercontent.com/33069358/57107111-009ad080-6ce4-11e9-83e9-1ecc4b7bf4da.png)
![Screenshot (312)](https://user-images.githubusercontent.com/33069358/57107116-02fd2a80-6ce4-11e9-8df4-d8b8f5f43695.png)
![Screenshot (313)](https://user-images.githubusercontent.com/33069358/57107121-05f81b00-6ce4-11e9-85f8-1357cdaaf870.png)

# usage
Install dependencies ---> npm install

Run webpack on development mode ---> npm start

Run build for production ---> npm run build
