const express    = require("express");
const router     = express.Router();
const mongoose   = require('mongoose');
const fs         = require('fs');
const User       = require('../models/User');
const Gateway    = require('../models/Gateway');
const Design     = require('../models/Design');
const Drawing    = require('../models/Drawing');
const Utils      = require('../controller/Utils');
const DesignDAO  = require('../models/dao/DesignDAO');
const ResponseForm = require('../models/form/CommonResponseForm');
const AddDesignForm = require('../models/form/AddDesignForm');



const designDAO = new DesignDAO();

router.get("/", Utils.isLoggedIn, function (req, res) {
  let sessionUser = req.user.local;
  res.render('design', { title: "Advanced SCADA", user: sessionUser });
})

router.get("/json/fetch/designList", Utils.isLoggedIn, function (req, res) {
  let email = req.user.local.email;
  let responseForm;

  designDAO.getListDesignByEmail(email)
    .then(function (designs) {

      responseForm = new ResponseForm(true, "Fetch Design List Success", designs);
      res.status(200).send(JSON.stringify(responseForm));
    })
    .catch(function (e) {
      
      responseForm = new ResponseForm(false, e.toString(), null);
      res.status(500).send(JSON.stringify(responseForm));
    })

})


router.post("/json/create", Utils.isLoggedIn, function (req, res) {
 
  let email = req.user.local.email;
  const addDesignForm = AddDesignForm.parseDesignForm(req.body);
  let responseForm, name, description, resolution;

  name = addDesignForm.getName();
  description = addDesignForm.getDescription();
  resolution = addDesignForm.getResolution();
  
  designDAO.createAndSaveNewDesign(email, name, description, resolution)
    .then(function (newDesign) {
      if (newDesign == null) {

        responseForm = new ResponseForm(false, "Number of Designs Exceed 10", null);
        res.status(406);

      } else {
        responseForm = new ResponseForm(true, "Create New Design Success", newDesign);
        res.status(200);

      }

      res.send(JSON.stringify(responseForm));
    })
    .catch(function (e) {

      const responseForm = new ResponseForm(false, e.toString(), null);
      res.status(500).send(JSON.stringify(responseForm));
    })

})


router.delete("/json/delete/:designId", Utils.isLoggedIn, function (req, res) {
  let email = req.user.local.email;
  let designid = req.params.designId;
  let responseForm;

  designDAO.deleteDesignByDesignId(designid)
    .then(function (deletedCount) {

      return designDAO.getListDesignByEmail(email);
    })
    .then(function (designList) {

      responseForm = new ResponseForm(true, "Delete Design Success", designList);
      res.status(200).send(JSON.stringify(responseForm));
    })
    .catch(function (e) {

      responseForm = new ResponseForm(false, e.toString(), null);
      res.status(500).send(JSON.stringify(responseForm));
    })

})


module.exports = router;