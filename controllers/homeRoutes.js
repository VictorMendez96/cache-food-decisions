const router = require("express").Router();
const { User } = require("../models"); //needs userData here
const withAuth = require("../utils/auth");

//prevents browsers from viewing homepage if not logged in
router.get("/", withAuth, async (req, res) => {
   try {
    //find the user 
    const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      });
    
      //serialize the data to JSON
      const users = userData.map((project) => project.get({ plain: true }));
      // Pass the logged in flag to the template
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

//create new user
router.post('/signup', async (req, res) => {
    try {
        const dbUserData = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
    
        req.session.save(() => {
          req.session.logged_in = true;
    
          res.status(200).json(dbUserData);
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    
});

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

