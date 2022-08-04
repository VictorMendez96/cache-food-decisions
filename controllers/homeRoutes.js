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
    
      //serialize the data to JSON
      const users = userData.map((user) => user.get({ plain: true }));
      // Pass the logged in flag to the template -- maybe a different template to make it work?
      res.status(200).render('homepage', {
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
  

module.exports = router;

