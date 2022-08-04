const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

//prevents browsers from viewing homepage if not logged in
router.get("/", withAuth, async (req, res) => {
   try {
    //find the user by the 
    const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        // order: [['name', 'ASC']],
      });
    
      //serialize the data to JSON
      const user = userData.map((project) => project.get({ plain: true }));
      // Pass the logged in flag to the template
      res.render('dashboard', {
        ...user,
        logged_in: tru
      });
   } catch (error) {
    res.status(500).json(error);
   } 
    
});

router.get('/login', (req, res) => {
    // if session exists, redirect user to the homepage
    if(res.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render('login')
});

//create new user
router.post('/signup', (req, res) => {
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

//logout
router.post("/logout", (req, res) =>  {
    if(req.session.logged_in) {
        req.session.destroy(() => {
             res.status(204).end();
             });
        } else {
          res.status(404).end();
        }
});
   

module.exports = router;

