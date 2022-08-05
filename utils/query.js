require("dotenv").config();
const inputToQuery = require("./helpers");

const apiKey = process.env.API_KEY;

//pass in the user object - variables will be queried. Offset will be a stored page variable 
async function getChoices(user, offset) {
  const user_cuisines = inputToQuery(user.cuisines);
  const user_diet = inputToQuery(user.diet);
  const user_intolerances = inputToQuery(user.intolerances);
  const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${user_cuisines}&diet=${user_diet}&intolerances=${user_intolerances}&offset=${offset}&apiKey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.results;
}

//store recipes in array? Loop through and tabulate cost, ingredients, amounts? Hand info to helper function to compile for shopping list
// hand off array of recipe ID's
async function getRecips(array) {
    const ingredients = [];
    array.forEach(element => {
        //the recipe may be more than one serving...
        const url = `https://api.spoonacular.com/recipes/${array[element]}/information`;
        const response = await fetch(url);
        const data = await response.json();
    });

  

  return data.results;
}
//ingredients
//https://spoonacular.com/food-api/docs#Ingredients-by-ID
//price
//https://spoonacular.com/food-api/docs#Price-Breakdown-by-ID