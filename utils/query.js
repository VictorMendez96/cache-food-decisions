require("dotenv").config();
const inputToQuery = require("./helpers");
const parseIngredients = require("./helpers");

const apiKey = process.env.API_KEY;

//pass in the user object - variables will be queried. Offset will be a stored page variable 
async function getChoices(user, offset) {
  const user_cuisines = inputToQuery(user.cuisines);
  const user_diet = inputToQuery(user.diet);
  const user_intolerances = inputToQuery(user.intolerances);
  const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${user_cuisines}&diet=${user_diet}&intolerances=${user_intolerances}&offset=${offset}&instructionsRequired=true&apiKey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

//store recipes in array? Loop through and tabulate cost, ingredients, amounts? Hand info to helper function to compile for shopping list
// hand off array of recipe ID's
async function getRecipes(array) {
    const recipes = [];
    array.forEach(element => {
        //the recipe may be more than one serving...
        const tempObj = {
            id:'',
            instructions:'',
            ingredients:'',
            servings:'',
            meal:'',
            prepTime:'',
            totalPrice:'',
        };
        const url = `https://api.spoonacular.com/recipes/${array[element]}/information`;
        const response = await fetch(url);
        const data = await response.json();
        tempObj[element].id = data[element].id;
        tempObj[element].instructions = data[element].instructions;
        tempObj[element].ingredients = parseIngredients(data[element].extendedIngredients);
        tempObj[element].servings = data[element].servings;
        tempObj[element].meal = data[element].dishTypes;
        recipes.push(tempObj);
    });
  return recipes;
}