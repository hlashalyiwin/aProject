var express = require('express');
var router = express.Router();
var User = require('../model/User');
var multer = require('multer');
var imgUpload = multer({dest:'public/images/uploads'});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/useradd11',function(req, res, next){
  res.render('users/user_add', { title : ' User Added '});//views => users=>useradd
});

router.post('/useradd11', imgUpload.single('img') , function(req,res, next){
  console.log('call me');
  var user = new User();// database object
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  if(req.file)
  user.img = '/images/uploads/' + req.file.filename;
  user.save(function(err,rtn){//save method
    if(err) throw err;
    console.log('rtn', rtn);
    res.redirect('/users/userdetail/'+ rtn.id);
  });
});
router.get('/userdetail/:id', function(req,res,next){
  User.findById(req.params.id, function(err, rtn){//findById parmameter 2
    if(err) throw err;
    console.log(rtn);
    res.render('users/userdetail',{ title: 'User Detail', user: rtn});
});
});

router.get('/list', function(req,res,next){
  User.find( {}, function(err, rtn){
    if(err) throw err;
    console.log('rtn', rtn);
    res.render('users/userlist', { title:'User List', user: rtn});
  });
});

router.get('/userUpdate/:id', function (req,res, next) {
  User.findById(req.params.id,function (err,rtn){
    if(err) throw err;
    console.log('fhgfkjfhk'+rtn);
     res.render('users/user_update', { user : rtn });
  });
});

router.post('/userUpdate',imgUpload.single('img') ,function(req, res, next){
  var update = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  if(req.file)
  update.img = '/images/uploads/' + req.file.filename;
  User.findByIdAndUpdate(req.body.id, { $set: update}, function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/list');
  });
});

router.get('/userDelete/:id', function(req, res){
  User.findByIdAndRemove(req.params.id, function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/list');
  });
});
module.exports = router;
