const express = require("express");
const router = express.Router();
const mongoose   = require('mongoose');
const fs         = require('fs');
const User       = require('../models/User');
const Gateway    = require('../models/Gateway');
const Design     = require('../models/Design');
const Utils      = require('../controller/Utils');


router.get("/", Utils.isLoggedIn, function(req, res){
    let sessionUser = req.user.local;
    res.render('design', {title: "Advanced SCADA", user: sessionUser});
})

router.get("/fetch/projects", Utils.isLoggedIn, function (req, res) {
  let email = req.user.local.email;

  Design.findOne({ 'email': email })
    .then((project) => {
      console.log()
      res.send(project.design);
    })
    .catch((err) => {
      res.send(false)
    })

})

router.get("/fetch/drawing/:designId", Utils.isLoggedIn, function (req, res) {
  let email = req.user.local.email;
  let designID = req.params.designId;

  Design.findOne({'email': email})
  .then((designs) => {
    if (designs == null){
      // Create New 
      designs.drawing = [{designId}];
      designs.save();
      res.send(designs.drawing[0]);
    }else{
      // Update designs

      res.send(designs.getDrawingById(designId));
    }

  })
  .catch((err) => {
    res.status(500).end();
    console.log('Error at fetch/desingId = ', designID);
  })
 
})



router.post("/create", Utils.isLoggedIn, function(req, res){
    let email = req.user.local.email;
    let {name, description, resolution} = req.body;

    console.log({name, description, resolution});
    try{
      Design.findOne({'email': email}, function(err, doc){
        if (err) throw err;
        else if (doc == null){
          // Create new document;
          let model = {
            email,
            design: [{
              'designID': 'design-1',
              'name': name,
              'runLink': '',
              'createTime': Date.now(), 
              'modified': Date.now(), 
              'compiled': false,
              'description': description, 
              'resolution': resolution
            }],
            drawing: [],
          }
          let design = new Design(model);
          design.save((err) => {
            if (err) throw err;
              res.send({
                status: 'success',
                newProject: model.design[0]
              })
          });
        }else{  
          // Update current document
          let projectNum = doc.design.length;
          if (projectNum >= 10) res.send({
            status: 'fail',
            reason: 'The number of projects is not greater than 10'
          })
          else{
            if (!doc.isDuplicate(name)){
              doc.design.push({
                'designID': `design-${projectNum+1}`,
                'name': name,
                'runLink': '',
                'createTime': Date.now(), 
                'modified': Date.now(), 
                'compiled': false,
                'description': description, 
                'resolution': resolution
            });

            doc.save();
            res.send({
              status: 'success',
              newProject: doc.design[projectNum]
            })
            }
            else{
              res.send({
                status: 'fail',
                reason: 'Duplicated Project'
              })
            }
           
          }
        }
      })
    }
    catch(e){
      res.send({
        status: 'error',
        error: e
      });
    }

})


router.get("/delete/:designID", Utils.isLoggedIn, function (req, res) {
  let email = req.user.local.email;

  Design.findOne({ 'email': email })
    .then((projects) => {
      let index = projects.design.findIndex((proj) => proj.designID == req.params.designID);
      if (index == -1) return false;
      projects.design.splice(index, 1);
      // TO-DO : delete drawing correspondingly

      projects.save();
      res.send(projects.design);
    })
    .catch((err) => {
      res.send(false)
    })
})


router.get("/drawing", Utils.isLoggedIn, function(req, res){
  let sessionUser = req.user.local;

  res.render('design-drawing', {title: "Advanced SCADA", user: sessionUser});
})

// router.get("/run/:id", Utils.isLoggedIn, function(req, res){
//   let sessionUser = req.user.local;
//   res.render('design-drawing', {title: "Advanced SCADA", user: sessionUser});
// })


module.exports = router;