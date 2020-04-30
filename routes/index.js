const express    = require("express");
const router     = express.Router();
const mongoose   = require('mongoose');
const formidable = require('formidable');
const util       = require('util');
const User       = require('../models/User');
const Gateway    = require('../models/Gateway');
const fs         = require('fs');


const passport = require("passport");
const utils    = require('../controller/Utils');

router.get("/", utils.isLoggedIn, function(req, res){
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

router.get("/dashboard", utils.isLoggedIn, function(req, res){
  const sessionUser = req.user.local;

  res.render("dashboard", {title: "Advanced SCADA", user: sessionUser});
})


router.get("/profile", utils.isLoggedIn, function(req, res){

  let sessionUser = req.user.local;
      console.log(sessionUser);
      //res.send("success");
      res.render("profile",{title: "Advanced SCADA", user: sessionUser});

})


router.put("/profile/:command", utils.isLoggedIn, function(req, res){
  
  console.log("PUT: /profile", req.body);
  const data = req.body;
  let updateDB;

  if (req.params.command == "updateInfo"){
    updateDB = {
      "local.company"        : data.company,
      "local.username"       : data.username,
      "local.roles"          : data.roles,
      "local.firstname"      : data.firstname,
      "local.lastname"       : data.lastname,
      "local.address"        : data.address,
      "local.city"           : data.city,
      "local.country"        : data.country,
      "local.postalCode"     : data.postalcode,
      "local.aboutMe"        : data.aboutme
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
    })

  }else if (req.params.command === "updateAvatar"){
    console.log("PUT request image upload: ");

    let form = new formidable.IncomingForm();
    form.uploadDir = "public/avatar";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
      // change path to add database
      const avatarLink = files.avatarImage.path.replace('public', '/static');
      console.log('avatar link: ', avatarLink);

      updateDB = {
        "local.avatarLink"     : avatarLink
      }

      // Remove old avatar file in public folder
      if (req.user.local.avatarLink){
        fs.unlink(req.user.local.avatarLink.replace('static', 'public'), function(error){
          if (error) throw error;
          console.log(req.user.local.avatarLink.replace('static', 'public'), ' was deleted');
        });
      }

      User.findOneAndUpdate({ "_id": req.user._id },
        { $set: updateDB },
        { new: true },
        function (error, result) {
          if (error) {
            res.send(error);
          } else {
            result.local.password = "";
            console.log(result.local);
            res.send("success");
          }
        })

    });

  }else{
    res.status("500").end("command error");
  }

})


module.exports = router;
