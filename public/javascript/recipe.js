const user = {
  intolerances: "",
  cuisines: "",
  diet: "",
};

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
  got = true;
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

document
  .querySelectorAll(".recipe")
  .forEach((ele) => ele.addEventListener("click", putRecipes));
