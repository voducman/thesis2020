const express    = require("express");
const router     = express.Router();
const mongoose   = require('mongoose');
const fs         = require('fs');
const User       = require('../models/User');
const Gateway    = require('../models/Gateway');
const Design     = require('../models/Design');
const Drawing    = require('../models/Drawing');
const Utils      = require('../controller/Utils');
const DrawingDAO = require('../models/dao/DrawingDAO');
const DesignDAO  = require('../models/dao/DesignDAO');
const ResponseForm = require('../models/form/CommonResponseForm');
const Resolution = require('../models/constant/resolution');



const drawingDAO = new DrawingDAO();
const designDAO  = new DesignDAO();


router.get("/:designName/:designId", Utils.isLoggedIn, function(req, res){
    let email = req.user.local.email;
    let designId = req.params.designId;
    let sessionUser = req.user.local;
    let resolution = Resolution.hd;
    
    designDAO.getDesignByIdAndEmail(designId, email)
        .then(design => {

            resolution = Resolution[design.resolution];
            console.debug(resolution);
            res.status(200).render('drawing', { title: "Advanced SCADA", user: sessionUser, resolution});
        })
        .catch(e => {
            res.redirect("/design");
        })
    
})

router.get("/json/fetch/:designId", Utils.isLoggedIn, function (req, res) {
    let email = req.user.local.email;
    let designId = req.params.designId;
    let responseForm;

    let searchObj = { "email": email, "designId": designId };
    drawingDAO.findOneByObject(searchObj)
        .then(function (draw) {
            console.debug(draw);
            if (draw == null) {

                drawingDAO.createAndSaveNewDrawing(designId, email)
                    .then(function (newDrawing) {

                        responseForm = new ResponseForm(true, "Create New Drawing Success", newDrawing);
                        res.status(200).send(JSON.stringify(responseForm));
                    })
                    .catch(function (e) {
                        
                        responseForm = new ResponseForm(false, "Cannot create new Drawing", null);
                        res.status(500).send(JSON.stringify(responseForm));
                    })
            } else {

                responseForm = new ResponseForm(true, "Fetch Drawing Success", draw);
                res.status(200).send(JSON.stringify(responseForm));
            }
        })
        .catch(function (e) {
            console.log(String(e));
            responseForm = new ResponseForm(false, e.toString(), null);
            res.status(500).send(JSON.stringify(responseForm));
        })

})


module.exports = router;