var express = require("express");
var router = express.Router();
const { Users } = require("../model/users");
const { Scores } = require("../model/scores")

const { authorize } = require('../utils/authorise');
const userModel = new Users();
const scoreModel = new Scores();


router.put('/updateUsername/:username',function(req,res){
    if(!req.body || 
        (req.body.hasOwnProperty("nUsername") && req.body.nUsername.length===0)) return res.status(400).end();
        const scoreData = scoreModel.updateOne(req.params.username, req.body);
        const userData = userModel.updateOne(req.params.username , req.body);
        if (!userData || !scoreData) return res.status(401).end();
        return res.json(userData);
});

router.put('/updatePassword/:username',async function(req,res){
    if(!req.body || 
        (req.body.hasOwnProperty("nPassword") && req.body.nPassword.length===0) ||
        (req.body.hasOwnProperty("oldPassword") && req.body.oldPassword.length===0)) return res.status(400).end();
    const userData = await userModel.updatePassword(req.params.username,req.body);
    if(!userData) return res.status(401).end();
    return res.json(userData);
});

module.exports = router;  