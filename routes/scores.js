var express = require("express");
var router = express.Router();
const { authorize } = require("../utils/authorise");
const { Scores } = require("../model/scores");
const scoreModel = new Scores();



router.get("/top" , function (request, response) {

  console.log(scoreModel.getAll());
  return response.json(scoreModel.getAll());
});

router.post("/updateMaxScore",   function (req, res) {
  const maxScore = scoreModel.updateMaxScore(req.body.username, req.body.score);
  return res.json(maxScore);
});

router.get('/:username',function (req, res) {
  return res.json(scoreModel.getOneByUsername(req.params.username));
});

module.exports = router;
