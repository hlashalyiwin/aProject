var express = require('express');
var router = express.Router();
var Admin = require('../model/Admin');
var Post = require('../model/Post');
var User = require('../model/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'aProject' });//views=> index
});

router.get('/signup', function(req,res, next){
  res.render('signup',{ title: ' Sign Up'});
});
router.post('/signup', function(req,res,next){
  var admin = new Admin();
  admin.name = req.body.name;
  admin.email = req.body.email;
  admin.password = req.body.password;
  admin.save(function(err, rtn){
    if(err) throw err;
    console.log('rtnrtn' + rtn);
    res.redirect('/signin');
  });
});

router.get('/signin', function(req,res,next){
  res.render('signin');
});
router.post('/signin', function(req,res,next){
  // console.log('call');
  Admin.findOne({email:req.body.email},function(err,admin){
    if(err) throw err;
    console.log('admin' + admin);
    if(admin != null && Admin.compare(req.body.password, admin.password)){
      req.session.user = {name: admin.name, email:admin.email, id:admin._id}
      res.redirect('/users/useradd11');
    }else{
      res.redirect('/');
    }
  });
});
module.exports = router;
