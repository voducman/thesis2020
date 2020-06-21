const express    = require("express");
const router     = express.Router();
const Log        = require('../models/Log');
const {isLoggedIn} = require('../controller/Utils');
const ResponseForm = require('../models/form/CommonResponseForm');

router.get("/:gatewayId", isLoggedIn,async function(req, res){
    let sessionUser = req.user.local;
    let gatewayId = req.params.gatewayId;
    let log = await Log.findOne({gatewayId});
    res.render('history', { title: "Light SCADA", user: sessionUser, log: log || {value: ''} });
})


router.post("/setup/log", isLoggedIn, function (req, res){
    let responseForm;
    let {gatewayId, history} = req.body;

    Log.findOne({gatewayId})
    .then(function(log){
        if (log == null){
            let logg = new Log({gatewayId, 'value': history});
            return logg.save();
        }else{
            log.value = history;
            return log.save();
        }
    })
    .then(function(updatedLog){
        responseForm = new ResponseForm(true, "Change Log Format Success.", null);
        res.status(200).send(JSON.stringify(responseForm));
    })
    .catch(function(e){

        responseForm = new ResponseForm(true, "Change Log Format Get Error.", null);
        res.status(500).send(JSON.stringify(responseForm));
    })
    
})

// API for Device
router.get("/log/:gatewayId",async function(req, res){
    let responseForm, gatewayId = req.params.gatewayId;

    if (!gatewayId) {
        responseForm = new ResponseForm(false, null, null);
        return res.status(404).send(JSON.stringify(responseForm));
    }

    let log = await Log.findOne({gatewayId});
    if (log == null){
        responseForm = new ResponseForm(true, null, "");
    }else{
        responseForm = new ResponseForm(true, null, log.value);
    }
    
    res.status(200).send(JSON.stringify(responseForm));
})

module.exports = router;