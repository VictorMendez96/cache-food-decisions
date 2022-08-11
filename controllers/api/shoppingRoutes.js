const router = require("express").Router();
const { User } = require("../../models");

//create a new user


router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    console.log(userData);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.logged_in = true;

      res.status(200).json({
        user: userData,
        message: "New user created. You are now logged in.",
        ok: true,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
});

//login with email
router.post("/login", async (req, res) => {
  try {
    //find the user who matches the email input
    const userData = await User.findOne({
      where: { email: req.body.email },
    });
    console.log(userData);
    
    if (!userData) {
      res
      .status(400)
      .json({ message: "Incorrect email or password, please try again." });
      return;
    }
    //verify the password
    const validPassword = await userData.checkPassword(req.body.password);
    
    if (!validPassword) {
      res
      .status(400)
      .json({ message: "Incorrect email or password, please try again." });
      return;
    }
    //creating session variables based on user
    req.session.save(() => {
      // req.session.user_id = userData.id;
      // req.session.username = userData.firstName;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

//logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    //removing the session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//update user preferences
router.put("/userPrefs", (req, res) => {
  User.update(
    {
      intolerances: req.body.intolerances,
      cuisines: req.body.cuisines,
      diet: req.body.diet,
    },
    {
      where: { user_id: req.session.user_id },
    }
    );
  });


 router.get("/shoppingList", async (req, res) => {
    try {
     const userData = await User.findOne({
       where: { email: req.body.email },
     });

      const user = userData.get({ plain: true });

      res.render("shoppingList", {
        ...user,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
  module.exports = router;
  