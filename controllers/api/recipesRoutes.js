//router.get the spoonacular function const router = require("express").Router();
const router = require("express").Router();
const { User } = require("../../models");
const { getChoices } = require("../../utils/query");

//create a new user
router.get("/", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);
    if (!userData) {
      res.status(404).json({ message: "No user with that id!" });
      return;
    }

    let new_user = {
      intolerances: userData.intolerances,
      cuisines: userData.cuisines,
      diet: userData.diet,
    };

    //let recipes = await getChoices(new_user);
    console.log("newUser:");
    console.log(new_user);
    console.log("recipes:");
    //console.log(recipes);

    res.status(200).json(new_user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  // try {
  let new_user = {
    intolerances: req.body.user.intolerances,
    cuisines: req.body.user.cuisines,
    diet: req.body.user.diet,
  };

  let recipes = await getChoices(new_user);
  console.log("newUser:");
  console.log(new_user);
  console.log("recipes:");
  console.log(recipes);

  res.status(200).json(recipes);
  // } catch (err) {
  // res.status(500).json(err);
  // }
});

module.exports = router;
