const router = require("express").Router();
const { User } = require("../../models");
const { getChoices } = require("../../utils/query");
const withAuth = require("../../utils/auth")



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

    //not calling the right handlebars if changing name, right now redirecting to the results handlebar page, waiting on api to work.
    res.status(200).render("results", {
      recipes,

      got: true,
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.put("/userPrefs", withAuth, async (req, res) => {
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
