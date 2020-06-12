const express    = require("express");
const router     = express.Router();
const mongoose   = require('mongoose');
const formidable = require('formidable');
const util       = require('util');
const User       = require('../models/User');
const Gateway    = require('../models/Gateway');
const fs         = require('fs');
const passport   = require("passport");
const {isLoggedIn} = require('../controller/Utils');
const ResponseForm = require('../models/form/CommonResponseForm');
const GatewayDAO = require('../models/dao/GatewayDAO');
const GatewayForm = require('../models/form/GatewayForm');
const PLCForm     = require('../models/form/PLCForm');
const TagForm     = require('../models/form/TagForm');


const gatewayDAO = new GatewayDAO();

router.get("/", isLoggedIn, function (req, res) {
  let sessionUser = req.user.local;

  res.render('gateway', { title: "Advanced SCADA", user: sessionUser });
})


router.put("/json/create/gateway", isLoggedIn, function(req, res){
  let email = req.user.local.email;
  let responseForm;
  let gatewayForm = new GatewayForm(req.body);
  gatewayForm['email'] = email;

  if (!gatewayForm.isValid()) {
    responseForm = new ResponseForm(false, "Gateway Data Invalid", null);
    return res.status(500).send(JSON.stringify(responseForm));
  }

  let { uniqueId } = gatewayForm;
  gatewayDAO.getGatewayByEmailnUniqueId(email, uniqueId)
    .then(function (gateway) {

      if (gateway == null) {
        gatewayDAO.createNewGateway(gatewayForm)
          .then(function (gateways) {

            responseForm = new ResponseForm(true, "Create New Gateway Success", gateways);
            res.status(200).send(JSON.stringify(responseForm));
          })
      } else {

        responseForm = new ResponseForm(false, "Gateway is duplicate", null);
        res.status(406).send(JSON.stringify(responseForm));
      }
    })
    .catch(e => {

      responseForm = new ResponseForm(false, "Create New Gateway Get Error", null);
      res.status(500).send(JSON.stringify(responseForm));
    })
}) 


router.put("/json/update/gateway", isLoggedIn, function (req, res) {
  let email = req.user.local.email;
  let responseForm;
  let gatewayForm = new GatewayForm(req.body);
  gatewayForm['email'] = email;

  if (!gatewayForm.isValid()) {
    responseForm = new ResponseForm(false, "Gateway Data Invalid", null);
    return res.status(500).send(JSON.stringify(responseForm));
  }

  let { uniqueId } = gatewayForm;
  gatewayDAO.getGatewayByEmailnUniqueId(email, uniqueId)
    .then(function (gateway) {

      if (gateway == null) {

        responseForm = new ResponseForm(false, "Not Found Gateway With Unique ID", null);
        res.status(404).send(JSON.stringify(responseForm));
      } else {
        gatewayDAO.updateGateway(gateway, gatewayForm)
          .then(function (gateways) {
         
            responseForm = new ResponseForm(true, "Update Gateway Success", gateways);
            res.status(200).send(JSON.stringify(responseForm));
          })
      }
    })
    .catch(e => {

      responseForm = new ResponseForm(false, "Update Gateway Get Error", null);
      res.status(500).send(JSON.stringify(responseForm));
    })
})

router.get("/json/fetch/gateways", isLoggedIn, function (req, res) {
  let email = req.user.local.email;
  let responseForm;

  gatewayDAO.findManyByObject({ email })
    .then(gateways => {

      responseForm = new ResponseForm(true, "Fetch Gateway List Success.", gateways);
      res.status(200).send(JSON.stringify(responseForm));
    })
    .catch(e => {
      responseForm = new ResponseForm(false, "Fetch Gateway List Get Error.", []);
      res.status(500).send(JSON.stringify(responseForm));
    })

})

router.post("/json/countPLCnTag", isLoggedIn, function(req, res){
  let email = req.user.local.email;
  let responseForm;
  const {gatewayId} = req.body;

  gatewayDAO.countTotalPLCnTag(gatewayId)
  .then(result => {

    if (result == null) return Promise.reject(null);
    responseForm = new ResponseForm(true, "Count Total PLC & Tag On Specified Gateway Success", result);
    res.status(200).send(JSON.stringify(responseForm));
  })
  .catch(e => {

    responseForm = new ResponseForm(false, "Cannot Count Total PLC & Tag", null);
    res.status(406).send(JSON.stringify(responseForm));
  })
})


router.put("/json/create/plc", isLoggedIn, function(req, res){
  let responseForm;
  let plcForm = new PLCForm(req.body);

  if (!plcForm.isValid()) {
    responseForm = new ResponseForm(false, "PLC Data Invalid", null);
    return res.status(500).send(JSON.stringify(responseForm));
  }

  let { ipAddress } = plcForm;
  gatewayDAO.getPlcByIpAddress(ipAddress)
    .then(function (plc) {
      if (plc == null) {
        gatewayDAO.createNewPlc(plcForm)
          .then(function (plcs) {

            responseForm = new ResponseForm(true, "Create New PLC Success", plcs);
            res.status(200).send(JSON.stringify(responseForm));
          })
      } else {

        responseForm = new ResponseForm(false, "PLC is duplicate", null);
        res.status(406).send(JSON.stringify(responseForm));
      }
    })
    .catch(e => {

      responseForm = new ResponseForm(false, "Create New PLC Get Error", null);
      res.status(500).send(JSON.stringify(responseForm));
    })
})

router.put("/json/update/plc", isLoggedIn, function (req, res) {
  let email = req.user.local.email;
  let responseForm;
  let plcForm = new PLCForm(req.body);

  if (!plcForm.isValid()) {
    responseForm = new ResponseForm(false, "PLC Data Invalid", null);
    return res.status(500).send(JSON.stringify(responseForm));
  }

  let { plcId } = plcForm;
  gatewayDAO.getPlcById(plcId)
    .then(function (plc) {

      if (plc == null) {
       
        responseForm = new ResponseForm(false, "Not Found PLC With PLC's ID", null);
        res.status(404).send(JSON.stringify(responseForm));
      } else {

        gatewayDAO.updatePlc(plc, plcForm)
          .then(function (updatedPlc) {
            
            responseForm = new ResponseForm(true, "Update PLC Success", updatedPlc);
            res.status(200).send(JSON.stringify(responseForm));
          })
      }
    })
    .catch(function (e) {

      responseForm = new ResponseForm(false, "Update PLC Get Error", null);
      res.status(500).send(JSON.stringify(responseForm));
    })

})


router.post("/json/fetch/plcs", isLoggedIn, function (req, res) {
  let email = req.user.local.email;
  let responseForm;

  let {gatewayId} = req.body;
  gatewayDAO.plcDAO.findManyByObject({ gatewayId })
    .then(plcs => {

      responseForm = new ResponseForm(true, "Fetch PLC List Success.", plcs);
      res.status(200).send(JSON.stringify(responseForm));
    })
    .catch(e => {
      responseForm = new ResponseForm(false, "Fetch PLC List Get Error.", []);
      res.status(500).send(JSON.stringify(responseForm));
    })

})


router.put("/json/update/tag", isLoggedIn, function (req, res) {
  let email = req.user.local.email;
  let responseForm;
  let tagForm = new TagForm(req.body);

  if (!tagForm.isValid()) {
    responseForm = new ResponseForm(false, "Tag Data Invalid", null);
    return res.status(500).send(JSON.stringify(responseForm));
  }

  let { gatewayId, plcId, name } = tagForm;
  gatewayDAO.getTagByGatewayIdnPlcIdnTagName(gatewayId, plcId, name)
    .then(function (tag) {

      if (tag == null) {
        gatewayDAO.createNewTag(tagForm)
          .then(function (newTag) {

            responseForm = new ResponseForm(true, "Create New Tag Success", newTag);
            res.status(200).send(JSON.stringify(responseForm));
          })
      } else {
        gatewayDAO.updateTag(tag, tagForm)
          .then(function (updatedTag) {
            
            responseForm = new ResponseForm(true, "Update Tag Success", updatedTag);
            res.status(200).send(JSON.stringify(responseForm));
          })
      }
    })
    .catch(function (e) {

      responseForm = new ResponseForm(false, "Update Tag Get Error", null);
      res.status(500).send(JSON.stringify(responseForm));
    })

})





router.delete("/json/delete/gateway", isLoggedIn, function (req, res) {
  let email = req.user.local.email;
  let responseForm;

  let { uniqueId } = req.body;
  gatewayDAO.deleteGatewayByUniqueId(uniqueId, email)
    .then(function (gateways) {

      responseForm = new ResponseForm(true, "Delete Gateway Success", gateways);
      res.status(200).send(JSON.stringify(responseForm));
    })
    .catch(function (e) {

      responseForm = new ResponseForm(false, "Cannot Delete Gateway", null);
      res.status(500).send(JSON.stringify(responseForm));
    })
})

router.delete("/json/delete/plc", isLoggedIn, function (req, res) {
  let email = req.user.local.email;
  let responseForm;

  let { plcId } = req.body;
  gatewayDAO.deletePLCById(plcId)
    .then(function (isSuccess) {

      responseForm = new ResponseForm(true, "Delete PLC Success", null);
      res.status(200).send(JSON.stringify(responseForm));
    })
    .catch(function (e) {

      responseForm = new ResponseForm(false, "Cannot Delete PLC", null);
      res.status(500).send(JSON.stringify(responseForm));
    })
})


router.delete("/json/delete/tag", isLoggedIn, function (req, res) {
  let email = req.user.local.email;
  let responseForm;

  let { plcId, name } = req.body;
  gatewayDAO.deleteTagByGatewayIdnTagName(plcId, name)
    .then(function (isSuccess) {

      responseForm = new ResponseForm(true, "Delete Tag Success", null);
      res.status(200).send(JSON.stringify(responseForm));
    })
    .catch(function (e) {

      responseForm = new ResponseForm(false, "Cannot Delete Tag", null);
      res.status(500).send(JSON.stringify(responseForm));
    })
})



router.get("/json/get/listGateway", isLoggedIn, function (req, res) {
  let email = req.user.local.email;
  let responseForm;

})

  router.get("/json/get/listPlc", isLoggedIn, function(req, res){
    let email = req.user.local.email;
    let responseForm;
    
  })

  router.get("/json/get/listTag", isLoggedIn, function(req, res){
    let email = req.user.local.email;
    let responseForm;
    
  })
  
  
  router.get("/fetch", isLoggedIn, function(req, res){
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
  
  router.get("/list", isLoggedIn, function(req, res){
    const sessionUser = req.user.local;
  
    res.render("gateway-list", {title: "Advanced SCADA", user: sessionUser});
  })
  
  router.get("/plc", isLoggedIn, function(req, res){
    const sessionUser = req.user.local;
  
    res.render("gateway-plc", {title: "Advanced SCADA", user: sessionUser});
  })
  
  router.get("/tag", isLoggedIn, function(req, res){
    const sessionUser = req.user.local;
  
    res.render("gateway-tag", {title: "Advanced SCADA", user: sessionUser});
  })
  
  

module.exports = router;
