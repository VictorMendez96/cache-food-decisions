let user_diet = "";
let user_intolerances = "";
let user_cuisines = "";

function getUserPrefs() {
  //collect values from the user modal
  //   diet
  const temp_diet = [...document.getElementsByClassName("diet")];
  let diet = "";

  temp_diet.forEach((element) => {
    if (element.selected) {
      diet = element.value;
    }
  });

  // intolerances
  const temp_intolerances = [...document.getElementsByClassName("int")];
  const intolerances = [];
  temp_intolerances.forEach((element) => {
    if (element.ariaPressed) {
      intolerances.push(element.value);
    }
  });
  // cuisines
  const temp_cuisines = [...document.getElementsByClassName("cuisine")];
  const cuisines = [];
  temp_cuisines.forEach((element) => {
    if (element.ariaPressed) {
      cuisines.push(element.value);
    }
  });

  function inputToQuery(array) {
    return array.join("+");
  }

  const query_intolerances = inputToQuery(intolerances);
  const query_cuisines = inputToQuery(cuisines);

  user_diet = diet;
  user_intolerances = query_intolerances;
  user_cuisines = query_cuisines;

  let userPrefs = {
    intolerances: query_intolerances,
    cuisines: query_cuisines,
    diet: user_diet,
  };

  return userPrefs;
}

const updateUserPrefs = async (event) => {
  let userPrefs = getUserPrefs();
  const response = await fetch("/api/users/userPrefs", {
    method: "PUT",
    body: JSON.stringify({
      intolerances: userPrefs.intolerances,
      cuisines: userPrefs.cuisines,
      diet: userPrefs.diet,
    }),
    headers: { "Content-Type": "application/json" },
  });
};

document.getElementById("update").addEventListener("click", updateUserPrefs);
