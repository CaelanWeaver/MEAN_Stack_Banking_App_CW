var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/register',function(req,res,_next){
  addToDB(req,res)
});

async function addToDB(req,res){
  var user = new User({
    email:req.body.email,
    username:req.body.username,
    password:User.hashPassword(req.body.password),
    creation_dt:Date.now()
  });

  try{
    doc= await user.save();
    return res.status(201).json(doc);
  }
  catch{
    return res.status(501).jsno(err);
  }
}

module.exports = router;