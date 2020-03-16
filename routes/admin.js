const express = require("express");
const router = express.Router();

const passport = require("passport");


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

// function(req, res){
// if (dbModel.checkUNnPW(req.body)){
//   // TO-DO list when sign-up success
//   req.flash('success', 'register done.');
//   res.status(200).send('success');
// ...
// }else{
//   req.flash('error','register unsuccess.');
//   res.status(400).send('unsuccess');
// }