const express    = require("express");
const router     = express.Router();
const mongoose   = require('mongoose');
const fs         = require('fs');
const path       = require('path');
const Formidable = require('formidable');
const User       = require('../models/User');
const Gateway    = require('../models/Gateway');
const Design     = require('../models/Design');
const Drawing    = require('../models/Drawing');
const Utils      = require('../controller/Utils');
const DrawingDAO = require('../models/dao/DrawingDAO');
const DesignDAO  = require('../models/dao/DesignDAO');
const CompiledDrawDAO = require('../models/dao/CompiledDrawingDAO');
const ResponseForm = require('../models/form/CommonResponseForm');
const Resolution = require('../models/constant/resolution');



const drawingDAO      = new DrawingDAO();
const designDAO       = new DesignDAO();
const compiledDrawing = new CompiledDrawDAO();


router.get("/json/fetch/:designId", Utils.isLoggedIn, function (req, res) {
    let email = req.user.local.email;
    let designId = req.params.designId;
    let responseForm;

    let searchObj = { "email": email, "designId": designId };
    compiledDrawing.findOneByObject(searchObj)
        .then(function (draw) {
            
            responseForm = new ResponseForm(true, "Fetch Compiled Drawing Success", draw);
            res.status(200).send(JSON.stringify(responseForm));
        })
        .catch(function (e) {
            responseForm = new ResponseForm(false, e.toString(), null);
            res.status(500).send(JSON.stringify(responseForm));
        })

})


router.get("/compiled/:designName/:designId", Utils.isLoggedIn, function(req, res){
    let email = req.user.local.email;
    let designId = req.params.designId;
    let sessionUser = req.user.local;
    let resolution = Resolution.hd;

    designDAO.getDesignByIdAndEmail(designId, email)
        .then(design => {

            resolution = Resolution[design.resolution];
            res.status(200).render('running', { title: "Light SCADA", user: sessionUser, resolution});
        })
        .catch(e => {
            res.redirect("/design");
        })
})


module.exports = router;

