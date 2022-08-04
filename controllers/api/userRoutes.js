const router = require("express").Router();
const { User } = require("../../models");

//create login
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.logged_in = true;

      res.json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
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
  } catch (err) {
    res.status(400).json(err);
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
