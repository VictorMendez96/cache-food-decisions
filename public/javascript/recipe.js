const recipeArray = [];

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
  console.log("window response");
  let res = await response.json();
  console.log(res);
  let intolerances = res.intolerances;
  let cuisines = res.cuisines;
  let diet = res.diet;
  let id = res.id;
  console.log(
    `diet: ${diet}\ncuisines: ${cuisines}\nintolerances=${intolerances}\nid=${id}`
  );
  console.log(`res: ${res}`);

  //   let data = getChoices(res);
  //   console.log(data);
};

//get actual recipes now?

document.getElementById("search").addEventListener("click", getUserData());
