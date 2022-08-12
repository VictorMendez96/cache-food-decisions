const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");
const { getChoices } = require("../utils/query");

// prevent non logged in users from viewing the dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    //find the user based on email
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    const firstName = req.body.firstName;

    //serialize the data
    const users = userData.map((user) => user.get({ plain: true }));
    // Pass the logged in flag to the template
    res.render("dashboard", {
      users,
      logged_in: req.session.logged_in,
      firstName,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// landing page
router.get("/", (req, res) => {
  res.render("login");
});

// if session exists, redirect user to the homepage
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get("/recipes", withAuth, async (req, res) => {
  try {
    //find the user based on email
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      where: { id: req.session.user_id },
    });
    //get
    let recipes = await getChoices(userData[0].dataValues);

    res.render("recipe", {
      recipes,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/shoppingList", withAuth, async (req, res) => {
  try {
    //find the user based on email
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    //serialize the data
    const users = userData.map((user) => user.get({ plain: true }));
    console.log("users");
    console.log(users);
    console.log("userData");
    console.log(userData);
    // Pass the logged in flag to the template
    res.render("recipe", {
      users,
      recipes,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
