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
