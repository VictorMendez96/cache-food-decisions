function inputToQuery(array) {
  let output = [];
  let lastIndex = array.length - 1;
  for (let i = 0; i < array.length; i++) {
    if (i == lastIndex) {
      let text = `${array[i]}`;
      output.push(text);
    } else {
      let text = `${array[i]}+`;
      output.push(text);
    }
  }
  return output;
}

function userDataToDisplay(text) {
  const output = text.split("+");
  return output;
}

module.exports = { inputToQuery, userDataToDisplay };
