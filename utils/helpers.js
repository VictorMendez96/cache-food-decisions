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
      name: "",
      amount: "",
      originalName: "",
    };
  });
  return output;
}

module.exports = { inputToQuery, userDataToDisplay };
