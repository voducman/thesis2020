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
    let sessionUser = req.user.local;
  
    res.render('gateway', {title: "Advanced SCADA", user: sessionUser});
  })
  
  
  router.put("/save", utils.isLoggedIn, function(req, res){
    let email = req.user.local.email;
    console.log(req.body);
  
    let gateway = new Gateway();
  
    let data  = {
      external: JSON.parse(req.body.external),
      internal: JSON.parse(req.body.internal),
    }
  
  
    Gateway.findOneAndUpdate({email: email}, {"data": data}, function(err, doc){
        if (err){
          console.log(err);
          res.send("update-error");
        }else{
          console.log(doc);
          if (doc == null){
            gateway.save(function(error){
              if (error) res.send("save-error");
              else       res.send("save-success");
            });
          }else{
            res.send("update-success");
          }  
        }
    })
  })
  
  
  router.get("/fetch", utils.isLoggedIn, function(req, res){
    let email = req.user.local.email;
    Gateway.findOne({'email': email}, function(err, doc){
      if (err){
        console.log('error: ', err);
        res.send(false);
      }else{
        console.log("query success: ", doc);
        res.send(doc);
        
      }
    })
  })
  
  router.get("/list", utils.isLoggedIn, function(req, res){
    const sessionUser = req.user.local;
  
    res.render("gateway-list", {title: "Advanced SCADA", user: sessionUser});
  })
  
  router.get("/plc", utils.isLoggedIn, function(req, res){
    const sessionUser = req.user.local;
  
    res.render("gateway-plc", {title: "Advanced SCADA", user: sessionUser});
  })
  
  router.get("/tag", utils.isLoggedIn, function(req, res){
    const sessionUser = req.user.local;
  
    res.render("gateway-tag", {title: "Advanced SCADA", user: sessionUser});
  })
  
  

module.exports = router;