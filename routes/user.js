const express = require("express");
const router = express.Router();

router.get("/infor", function(req, res){
    if (req.isAuthenticated()){
        req.user.local.password = "";
        res.send(req.user.local);
    }else{
        res.status(404).end();
    }
})


module.exports = router;