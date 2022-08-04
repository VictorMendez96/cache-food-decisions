const router = require("express").Router();
const { User } = require("../../models");

//create a new user
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.logged_in = true;

      res.status(200).json({ user: userData, message:"New user created. You are now logged in." });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  };
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
      res.status(400).json({ message: "Incorrect email or password, please try again." });
      return;
    }
    //verify the password
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect email or password, please try again." });
      return;
    }
    //creating session variables based on user
    req.session.save(() => {
      req.session.user_id = userData.id;
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

module.exports = router;
