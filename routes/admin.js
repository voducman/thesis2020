const express  = require("express");
const router   = express.Router();
const passport = require("passport");
const ResponseForm = require('../models/form/CommonResponseForm');


router.get("/", isLoggedIn, function(req, res){
  res.redirect('/profile');
});


router.get("/login", function(req, res) {
  console.log('this is debug');

  let success = req.flash('success');
  let unsuccess = req.flash('unsuccess');
  //console.log(success);
  //console.log(unsuccess);
  res.render("login", { title: "Advanced SCADA", header: "Notify", message: (success == "" ? unsuccess : success)});
});


router.post(
  "/login",
  passport.authenticate("local-signin", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })
);


router.post(
  "/register",
  passport.authenticate("local-signup", {
    successRedirect: "/login",
    failureRedirect: "/login",
    failureFlash: true
  })
);


router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});


router.get("/profile", function(req, res) {
  res.render("profile", { message: req.flash("success")});
});

/******  Pravite functions  ******/
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
