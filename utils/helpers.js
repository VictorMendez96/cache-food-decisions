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
    tempIng.amount = parseInt(array[element].amount);
    tempIng.unit = array[element].unit;
    tempIng.original = array[element].original;
    output.push(tempIng);
  });
  return output;
}

function makeList(recipeArray) {
  let list = [];
  let metaList = [];
  let tempIDList = [];
  //step 1
  recipeArray.forEach((element) => {
    metaList[element] = recipeArray[element].ingredients;
  });
  //step 2
  metaList.forEach((ingList) => {
    const placeholder = {
      id: "",
      name: "",
      amount: "",
      unit: "",
    };
    //step 3
    ingList.forEach((item) => {
      let id = ingList[item].id;
      //existing item
      if (tempIDList.inclues(id)) {
        let index = tempIDList.indexOf(id);
        list[index].amount += ingList[item].amount;
        //assumes same unit
        //new item
      } else {
        placeholder.id = ingList[item].id;
        placeholder.name = ingList[item].name;
        placeholder.amount = ingList[item].unit;
        placeholder.unit = ingList[item].unit;
        tempIDList.push(placeholder.id);
        list.push(placeholder);
      }
    });
  });
  return list;
}

module.exports = {
  inputToQuery,
  userDataToDisplay,
  parseIngredients,
  makeList,
};
