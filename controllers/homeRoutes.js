const router = require("express").Router();
const { User } = require("../models"); //needs userData here?
const withAuth = require("../utils/auth");

// prevent non logged in users from viewing the homepage
router.get("/", withAuth, async (req, res) => {
  try {
    //find the user based on email
    const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        // order: [['lastName', 'ASC']],
      });
    
      //serialize the data
      const users = userData.map((user) => user.get({ plain: true }));
      // Pass the logged in flag to the template 
      res.render('homepage', {
        users,
        logged_in: req.session.logged_in,
      });
   } catch (error) {
    res.status(500).json(error);
  }
});

// if session exists, redirect user to the homepage
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
