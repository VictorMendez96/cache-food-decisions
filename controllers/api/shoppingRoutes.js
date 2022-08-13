const router = require("express").Router();
const { User } = require("../../models");

// router.get("/", async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.session.user_id);
//     if (!userData) {
//       res.status(404).json({ message: "No user with that id!" });
//       return;
//     }

//     let new_user = {
//       intolerances: userData.intolerances,
//       cuisines: userData.cuisines,
//       diet: userData.diet,
//     };

//     res.status(200).json(new_user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//create a new user
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

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
      req.session.user_id = userData.id;
      req.session.username = userData.firstName;
      req.session.email = req.body.email;
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
