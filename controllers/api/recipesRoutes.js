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

    res.status(200).json(new_user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Load recipe page and pass in the user preferences
router.post("/", async (req, res) => {
  try {
    let new_user = {
      intolerances: req.body.user.intolerances,
      cuisines: req.body.user.cuisines,
      diet: req.body.user.diet,
    };

    let recipes = await getChoices(new_user);
    if (!recipes) {
      res.status(400).json({ message: "No Recipes available" });
      return;
    }

    const recipeList = userData.map((user) => user.get({ plain: true }));
    //not calling the right handlebars if changing name, right now redirecting to the results handlebar page, waiting on api to work
    res.status(200).render("recipe", {
      recipeList,
      got: true,
    });
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.put("/userPrefs", async (req, res) => {
  // update a category by its `id` value
  try {
    const userData = await User.update(req.body, {
      where: { id: req.session.user_id },
    });
    if (!userData) {
      res.status(404).json({ message: "No user with that id!" });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
