const express = require("express");
const router  = express.Router();
const User    = require('../models/user');

const dbModel  = require("../models/databaseModel");
const passport = require("passport");
const utils    = require('../controller/Utils');

router.get("/", isLoggedIn, function(req, res){
  res.redirect('/dashboard');
});

router.get("/files/:name", function(req, res) {
  res.send(req.params.name);
});

router.get("/register", function(req, res) {
  res.render("register");
});

router.get("/login", function(req, res) {
  if (req.isAuthenticated()){
    res.redirect("/dashboard");
  }else{
    res.render("login");
  }
  
});


router.post(
  "/login",
  passport.authenticate("local-signin", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);


router.post(
  "/register",
  passport.authenticate("local-signup"),
  function(req, res){
    console.log('POST: register + ', req.user);
    req.logout();
    res.send(true);
  }
  );

router.post("/unlockscreen",
  passport.authenticate("local-signin"),
  function (req, res) {
    req.session.cookie.maxAge = 90000;
    res.status(200).end();
  })

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/dashboard", isLoggedIn, function(req, res){
  console.log('req.user ',req.user);
  console.log('req.session ', req.session);
<<<<<<< HEAD
  const sessionUser = {
    username: req.user.local.username,
    email:    req.user.local.email
  }
  res.render("dashboard", {title: "Advanced SCADA", user: sessionUser});
=======
  res.render("dashboard", {title: "Advanced SCADA", username: req.user.local.username, email: req.user.local.email});
>>>>>>> d08db7523eb668d6f439cf239e783dc33e314cd7
})


router.get("/profile", isLoggedIn, function(req, res){
<<<<<<< HEAD
  const sessionUser = {
    username: req.user.local.username,
    email:    req.user.local.email
  }
  res.render("profile",{title: "Advanced SCADA", user: sessionUser});
=======
  console.log(req.user);
  req.session.name = req.user.local.email;

  res.render("profile",{title: "Advanced SCADA", username: req.user.local.username, email: req.user.local.email});
>>>>>>> d08db7523eb668d6f439cf239e783dc33e314cd7
})




/******  Pravite functions  ******/
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
