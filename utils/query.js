require("dotenv").config();
const e = require("express");
const inputToQuery = require("./helpers");
const { parseIngredients, makeList } = require("./helpers");
const axios = require("axios");
const apiKey = process.env.API_KEY;

//pass in the user object - variables will be queried. Offset will be a stored page variable
async function getChoices(user) {
  const user_cuisines = user.cuisines;
  const user_diet = user.diet;
  const user_intolerances = user.intolerances;
  const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${user_cuisines}&diet=${user_diet}&intolerances=${user_intolerances}&number=12&instructionsRequired=true&apiKey=${apiKey}`;
  const response = await axios.get(url);
  return response.data.results;
}

//store recipes in array? Loop through and tabulate cost, ingredients, amounts? Hand info to helper function to compile for shopping list
// hand off array of recipe ID's.
async function getRecipes(user) {
  const userRecipes = user.recipes.split("+");
  let recipes = await Promise.all(
    userRecipes.map(async (recipe) => {
      return await getOneRecipe(recipe);
    })
  );
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
  const url = `https://api.spoonacular.com/recipes/${array}/information?includeNutrition=false&apiKey=${apiKey}`;
  const response = await axios.get(url);
  const data = await response.data;
  tempObj.id = data.id;
  tempObj.title = data.title;
  tempObj.image = data.image;
  tempObj.instructions = data.instructions;
  tempObj.ingredients = parseIngredients(data.extendedIngredients);
  tempObj.servings = data.servings;
  tempObj.meal = data.dishTypes;
  tempObj.totalPrice = (data.pricePerServing * tempObj.servings) / 100;
  return tempObj;
}

function test(recipe) {
  return recipe;
}

module.exports = {
  getChoices,
  getRecipes,
};

// userRecipes.map(async (recipe) => {
//   await getOneRecipe(recipe);
// });
