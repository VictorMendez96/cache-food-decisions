function inputToQuery(array) {
  array.join("+");
  return output;
}

function userDataToDisplay(text) {
  const output = text.split("+");
  return output;
}

function parseIngredients(array) {
  let output = [];
  array.forEach((element) => {
    const tempIng = {
      id: "",
      name: "",
      amount: "",
      unit: "",
      original: "",
    };
    tempIng.name = array[element].name;
    tempIng.id = array[element].id;
    tempIng.amount = array[element].amount;
    tempIng.unit = array[element].unit;
    tempIng.original = array[element].original;
    output.push(tempIng);
  });
  return output;
}

function makeList(recipeArray) {
  let list = [];
  recipeArray.forEach((element) => {
    const temp = {
      id: "",
      name: "",
      amount: "",
      original: "",
    };
    tempIng.name = recipeArray[element].name;

    list.push(tempIng);
  });
  return list;
}

module.exports = { inputToQuery, userDataToDisplay, parseIngredients };
