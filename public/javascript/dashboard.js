function updateUserPrefs() {
  //collect values from the user modal
  //   diet
  const temp_diet = [...document.getElementsByClassName("diet")];
  let diet = "";

  temp_diet.forEach((element) => {
    if (element.selected) {
      console.log(element);
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
  console.log("diet");
  console.log(diet);
  console.log("intolerances");
  console.log(intolerances);
  console.log("cuisines");
  console.log(cuisines);

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

  // if (email && password) {
  //     //send the email and password to the server with a post request
  //     const response = await fetch ("/api/users/login", {
  //         method: "POST",
  //         body: JSON.stringify({ email, password }),
  //         headers: { "Content-Type": "application/json"},
  //     });
  //     console.log(response);
  //     if(response.ok) {
  //         //then redirect browser to the food choices home page
  //         document.location.replace("/dashboard")
  //     } else {
  //         alert("Your login was unsuccessful, please try again");
  //     }
  //     console.log(response);
  // }
}
