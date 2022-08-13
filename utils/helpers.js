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
    tempIng.name = element.nameClean;
    tempIng.id = element.id;
    tempIng.amount = element.amount;
    tempIng.unit = element.unit;
    tempIng.original = element.original;
    output.push(tempIng);
  });
  return output;
}

function makeList(recipeArray) {
  let list = [];
  let metaList = [];
  let tempIDList = [];
  console.log("recipeArray");
  console.log(recipeArray);
  //step 1
  for (let i = 0; i < recipeArray.length; i++) {
    metaList[i] = recipeArray[i].ingredients;
  }
  console.log("metaList");
  console.log(metaList);
  //step 2
  metaList.map(async (ingList) => {
    // const placeholder = {
    //   id: "",
    //   name: "",
    //   amount: "",
    //   unit: "",
    // };
    console.log("ingList");
    console.log(ingList);
    //step 3
    ingList.forEach((item) => {
      const placeholder = {
        id: "",
        name: "",
        amount: "",
        unit: "",
      };
      console.log("item");
      console.log(item);
      let id = item.id;
      //existing item
      if (tempIDList.includes(id)) {
        let index = tempIDList.indexOf(id);
        if (typeof item.amount == "number") {
          list[index].amount += item.amount;
        } else {
          list[index].amount += 1;
        }
        //assumes same unit
        //new item
      } else {
        placeholder.id = item.id;
        placeholder.name = item.name;
        if (typeof item.amount == "number") {
          placeholder.amount += parseInt(item.amount);
        } else {
          placeholder.amount += 1;
        }
        //placeholder.amount = item.amount;
        placeholder.unit = item.unit;
        tempIDList.push(placeholder.id);
        list.push(placeholder);
      }
    });
  });
  return list;
}

function getPriceEstimate(recipeList) {
  const estimate = 0;
  recipeList.forEach((element) => {
    estimate += parseInt(recipeList[element].totalPrice);
  });
  return estimate;
}

function addToList(id) {}
function functionName(text) {}

module.exports = {
  inputToQuery,
  userDataToDisplay,
  parseIngredients,
  makeList,
};
