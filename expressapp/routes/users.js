var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');


router.post('/register',function(req,res,_next){
  addToDB(req,res)
});

async function addToDB(req,res){
  const user = new User({
    email:req.body.email,
    username:req.body.username,
    password:User.hashPassword(req.body.password),
    creation_dt:Date.now(),
    balance:Number()
  });

  try{
    doc= await user.save();
    return res.status(201).json(doc);
  }
  catch{
    return res.status(501).json(err);
  }
}

router.post('/login', function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    
    if (err) return res.status(501).json(err); 
    if (!user) return res.status(501).json(info); 
    
    req.logIn(user, function(err) {
      if (err) return res.status(501).json(err); 
      return res.status(200).json({user:user});
    });
  })(req, res, next);
});

router.get('/user',isValidUser,function(req,res,next){
  return res.status(200).json(req.user);
});

router.get('/logout', isValidUser,function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout successful'});
})

function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorised Request'});
}

router.post('/update',function(req,res,next){
  User.findByIdAndUpdate(req.body._id, {balance:req.body.balance}, {new: true}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(req.body);
    }
  });
});

module.exports = router;