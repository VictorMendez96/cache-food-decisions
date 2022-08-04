const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

//render homepage
router.get("/", async (req, res) => {

    //serialize statement here
        //need the logged in flag, uncomment below when ready 
        //logged_in: req.session.logged_in,
        //username: req.session.username,

})


//redirect user to homepage if session exists
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("login");
});