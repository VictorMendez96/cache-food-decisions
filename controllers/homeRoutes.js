const router = require("express").Router();
const { User } = require("../models"); //needs userData here?
const withAuth = require("../utils/auth");

// user must be able to access the main login page, so can't have withAuth here
router.get("/", async (req, res) => {
   try {
    //find the user based on email 
    const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        // order: [['lastName', 'ASC']],
      });
    
      //serialize the data
      const users = userData.map((user) => user.get({ plain: true }));
      // Pass the logged in flag to the template -- MAYBE a different template to make it work? This should go into any handlebars .get we want logged_in users to be able to access with button click of redirect on UI
      res.render('homepage', {
        users,
        logged_in: req.session.logged_in,
      });
   } catch (error) {
    res.status(500).json(error);
   } 
    
});

router.get('/login', (req, res) => {
    // if session exists, redirect user to the homepage
    if(req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render('login')
});


router.get("/signup", (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect("/");
//     return;
//   }

  res.render("signup");
});
// //create new user
// router.post('/signup', async (req, res) => {
//     try {
//         const dbUserData = await User.create({
//           username: req.body.username,
//           email: req.body.email,
//           password: req.body.password,
//         });
    
//         req.session.save(() => {
//           req.session.logged_in = true;
    
//           res.status(200).json(dbUserData);
//         });
//       } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//       }
    
// });

// //logout already on api/userRoutes
// router.post("/logout", (req, res) =>  {
//     if(req.session.logged_in) {
//         req.session.destroy(() => {
//              res.status(204).end();
//              });
//         } else {
//           res.status(404).end();
//         }

// });
   


module.exports = router;

