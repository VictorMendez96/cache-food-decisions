require("dotenv").config();
const e = require("express");
const inputToQuery = require("./helpers");
const parseIngredients = require("./helpers");
const axios = require("axios");
const apiKey = process.env.API_KEY;

//pass in the user object - variables will be queried. Offset will be a stored page variable
async function getChoices(user) {
  console.log("getChoices");
  console.log(user);
  const user_cuisines = user.cuisines;
  const user_diet = user.diet;
  const user_intolerances = user.intolerances;
  const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${user_cuisines}&diet=${user_diet}&intolerances=${user_intolerances}&number=12&instructionsRequired=true&apiKey=${apiKey}`;
  console.log(url);
  const response = await axios.get(url);
  return response.data.results;
}

//store recipes in array? Loop through and tabulate cost, ingredients, amounts? Hand info to helper function to compile for shopping list
// hand off array of recipe ID's.
async function getRecipes(array) {
  const recipes = [];
  array.forEach((element) => {
    //the recipe may be more than one serving...
    let rec = getOneRecipe(element);
    recipes.push(rec);
  });
  return recipes;
}

async function getOneRecipe(array) {
  const tempObj = {
    id: "",
    title: "",
    image: "",
    instructions: "",
    ingredients: "",
    servings: "",
    meal: "",
    prepTime: "",
    totalPrice: "",
  };
  const url = `https://api.spoonacular.com/recipes/${array[element]}/information`;
  const response = await fetch(url);
  const data = await response.json();
  tempObj[element].id = data[element].id;
  tempObj[element].title = data[element].title;
  tempObj[element].image = data[element].image;
  tempObj[element].instructions = data[element].instructions;
  tempObj[element].ingredients = parseIngredients(
    data[element].extendedIngredients
  );
  tempObj[element].servings = data[element].servings;
  tempObj[element].meal = data[element].dishTypes;
  return tempObj;
}

module.exports = {
  getChoices,
  getRecipes,
};
