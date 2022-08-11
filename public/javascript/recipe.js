const recipeArray = [];
const user = {
  intolerances: "",
  cuisines: "",
  diet: "",
};

function addToList(id) {
  // on click if they click it once it'll be added and if it's already been added clicking it again will remove it.
  if (recipeArray.includes(id)) {
    let ind = recipeArray.indexOf(id);
    recipeArray.splice(ind, 1);
  } else {
    recipeArray.pop(id);
  }
}

const getUserData = async (event) => {
  const response = await fetch("/api/recipes/", {
    method: "GET",
  });
  let res = await response.json();
  user.intolerances = res.intolerances;
  user.cuisines = res.cuisines;
  user.diet = res.diet;
};

const getRecipes = async (event) => {
  const response = await fetch("/api/recipes/", {
    method: "POST",
    body: JSON.stringify({ user }),
    headers: { "Content-Type": "application/json" },
  });
  return response;
  // let res = JSON.stringify(response);
};

const putRecipes = async (event) => {
  console.log(JSON.stringify(user));
  const response = await fetch("/api/recipes/userPrefs", {
    method: "PUT",
    body: JSON.stringify({
      recipes: recipeArray.join("+"),
    }),
    headers: { "Content-Type": "application/json" },
  });

  let res = JSON.stringify(response);

  console.log(`response: ${response}`);
  console.log(`res: ${res}`);
};

document.getElementById("search").addEventListener("click", getUserData());

document.getElementById("recipeSearch").addEventListener("click", getRecipes);

//document.getElementById("postRecipe").addEventListener("click", putRecipes);
