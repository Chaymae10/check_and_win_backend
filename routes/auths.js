var express = require('express');
var router = express.Router();
const { Users } = require("../model/users");
const userModel = new Users();
const {Scores} = require("../model/scores");
const scoresModel = new Scores();
/* GET home page. */
router.post('/login', async function(req, res , next) {
  if(!req.body || 
    (req.body.hasOwnProperty("username") && req.body.username.length===0) || 
    (req.body.hasOwnProperty("password") && req.body.password.length===0))
    return res.status(400).end();
    const authenticatedUser = await userModel.login(
      req.body.username,
      req.body.password
    );
    if(!authenticatedUser) return res.status(401).end();
    return res.json(authenticatedUser);
});

router.post('/register',async function(req,res , next ){
  if(!req.body || 
    (req.body.hasOwnProperty("username") && req.body.username.length===0) || 
    (req.body.hasOwnProperty("password") && req.body.password.length===0))
  return res.status(400).end();
  const authenticatedUser =  await userModel.register(
    req.body.username,
    req.body.password
  );
  scoresModel.addOne( req.body.username);
  if(!authenticatedUser) return res.status(409).end();
  return res.json(authenticatedUser);
});

router.get('/', function (req, res) {
  return res.json(userModel.getAll());
});

module.exports = router;
