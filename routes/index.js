const express  = require("express");
const router   = express.Router();
const mongoose = require('mongoose');
const User     = require('../models/user');


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

  const sessionUser = {
    username: req.user.local.username,
    email:    req.user.local.email
  }
  res.render("dashboard", {title: "Advanced SCADA", user: sessionUser});
})


router.get("/profile", isLoggedIn, function(req, res){
  let sessionUser;

  User.findById(req.user._id, function(error, document){
    if (error){
      res.render('error', {
        code: 404,
        content: "we are sorry, We could not find your data"
      })

    }else{
      sessionUser = document.local;
      console.log(sessionUser);
      //res.send("success");
      res.render("profile",{title: "Advanced SCADA", user: sessionUser});
    }
  })

})


router.put("/profile/:command", isLoggedIn, function(req, res){
  
  console.log("PUT: /profile", req.body);
  const data = req.body;
  let updateDB;

  if (req.params.command == "updateInfo"){
    updateDB = {
      "local.company"        : data.company,
      "local.username"       : data.username,
      "local.email"          : data.email,
      "local.roles"          : data.roles,
      "local.firstname"      : data.firstname,
      "local.lastname"       : data.lastname,
      "local.address"        : data.address,
      "local.city"           : data.city,
      "local.country"        : data.country,
      "local.postalCode"     : data.postalcode,
      "local.aboutMe"        : data.aboutme
     }
  }else if (req.params.command === "updateAvatar"){
    console.log("image upload: ", req.body);
    updateDB = {
      "local.avatarLink"     : data.avatarLink
    }
  }else{
    res.status("500").end("command error");
  }
  
  User.findOneAndUpdate({"_id": req.user._id},
    { $set: updateDB },
    {new: true},
    function(error, result){
      if (error){
        res.send(error);
      }else{
        result.local.password = "";
        console.log(result.local);
        res.send("success");
      }
    }
  )

})




/******  Pravite functions  ******/
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
