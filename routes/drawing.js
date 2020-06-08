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
const ResponseForm    = require('../models/form/CommonResponseForm');
const Resolution      = require('../models/constant/resolution');



const drawingDAO         = new DrawingDAO();
const designDAO          = new DesignDAO();
const compiledDrawingDAO = new CompiledDrawDAO();


router.post("/upload/symbol", Utils.isLoggedIn, function(req, res){
    let email = req.user.local.email;
    let responseForm, symbolURL = null;

    let incommingForm = new Formidable.IncomingForm();
    incommingForm.uploadDir = path.join('public/userdata', email, 'symbol');
    incommingForm.keepExtensions = true;

    incommingForm.parse(req, function(error, fields, files){
        if (error){
            responseForm = new ResponseForm(false, "Upload not success.", null);
            res.status(406).send(JSON.stringify(responseForm));
        }

        symbolURL = files.image.path.replace('public', '/static');
        responseForm = new ResponseForm(true, "Upload success.", symbolURL);
        res.status(200).send(JSON.stringify(responseForm));
    })
    
})

router.post("/json/update/:designId", Utils.isLoggedIn, function(req, res){
    let email = req.user.local.email;
    let designId = req.params.designId;
    let responseForm
    
    drawingDAO.getDrawingByIdAndEmail(designId, email)
        .then(draw => {
            draw.drawing = JSON.stringify(req.body);
            draw.lastModified = Date.now();
            return draw.save();

        })
        .then(() => {
            responseForm = new ResponseForm(true, "Update Drawing Success", null);
            res.status(200).send(JSON.stringify(responseForm));
        })
        .catch(e => {
            responseForm = new ResponseForm(false, "Update Drawing Get Error", null);
            res.status(500).send(JSON.stringify(responseForm));
        })

    
})


router.post("/compile", Utils.isLoggedIn, function(req, res){
    let email = req.user.local.email;
    let {designId} = req.body;
    let drawing, responseForm;
    
    drawingDAO.getDrawingByIdAndEmail(designId, email)
    .then(draw => {

        drawing = draw.drawing;
        return compiledDrawingDAO.getCompiledDrawingByIdAndEmail(designId, email)
    })
    .then(compiledDrawing => {    
        if (compiledDrawing == null){
            return compiledDrawingDAO.createAndSaveNewDrawing(designId, email, drawing)
        }else{
            compiledDrawing.drawing = drawing;
            return compiledDrawing.save()
        }
    })
    .then(compiledDrawing => {
        designDAO.getDesignByIdAndEmail(designId, email)
        .then(design => {
            design.runLink = '/running/compiled/' + design.name + '/' + designId;
            design.compiled = true;
            design.save();
        })

        responseForm = new ResponseForm(true, "Compile Drawing Success", true);
        res.status(200).send(JSON.stringify(responseForm));
    })
    .catch(e => {

        responseForm = new ResponseForm(false, "Compile Drawing Get Error", null);
        res.status(500).send(JSON.stringify(responseForm));
    })
    
})


router.get("/:designName/:designId", Utils.isLoggedIn, function(req, res){
    let email = req.user.local.email;
    let designId = req.params.designId;
    let sessionUser = req.user.local;
    let resolution = Resolution.hd;
    let symbols = getSymbolSetURL();
    
    designDAO.getDesignByIdAndEmail(designId, email)
        .then(design => {

            resolution = Resolution[design.resolution];
            res.status(200).render('drawing', { title: "Advanced SCADA", user: sessionUser, resolution, symbols});
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
            
            if (draw == null) {

                drawingDAO.createAndSaveNewDrawing(designId, email)
                    .then(function (newDrawing) {

                        responseForm = new ResponseForm(true, "Create New Drawing Success", newDrawing);
                        res.status(200).send(JSON.stringify(responseForm));
                    })
                    .catch(function (e) {
                        
                        responseForm = new ResponseForm(false, "Cannot Create New Drawing", null);
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

// Private methods
function getSymbolSetURL(){
    const symbolPath = path.join(__dirname, '../public/images/symbols');

    let folders, files, results = [];
    folders = fs.readdirSync(symbolPath);

    folders.forEach(folder => {
        let symbolObj = {};
        let files = fs.readdirSync(path.join(symbolPath, folder));
        files = files.map(file => `/static/images/symbols/${folder}/${file}`);
        symbolObj[folder.replace(/_/g, " ")] = files;
        results.push(symbolObj);
    })

    return results;
}
