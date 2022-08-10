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

  console.log("After Consolidation:");
  console.log("diet");
  console.log(diet);
  console.log("intolerances");
  console.log(query_intolerances);
  console.log("cuisines");
  console.log(query_cuisines);

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
  console.log("clicked!");
  console.log(userPrefs);
  const response = await fetch("/api/users/userPrefs", {
    method: "PUT",
    body: JSON.stringify({ userPrefs }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  if (response.ok) {
    //then redirect browser to the food choices home page
    alert("User preferences updated");
  } else {
    alert("Your update was unsuccessful, please try again");
  }
  console.log(response);
};

document.getElementById("update").addEventListener("click", updateUserPrefs);
