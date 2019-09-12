var express = require('express');
var router = express.Router();
var User = require('../../model/User');

router.get('/', function(req, res){
  res.status(201).json({
    message:'Home Page'
  });
});

router.get('/list', function(req, res){
  User.find({}, function(err,rtn){
    if(err){
      res.status(500).json({
        message:'Server Error',
        err:err
      });
    }
    else {
      if(rtn.lenght<1){
        res.status(204).json({
          message:'Data Not Found'
        });
      }
      else {
        res.status(200).json({
          user:rtn
        });
      }
    }
  });
});

router.get('/detail/:id', function(req, res){
  User.findById(req.params.id, function(err,rtn){
    if(err){
      res.status(500).json({
        message:'Server Error',
        error:err
      })
    }
    else {
      if(rtn == null){
        res.status(204).json({
          message:'No Data '
        })
      }
      else {
        res.status(200).json({
          user:rtn
        });
      }
    }
  });
});

router.delete('/delete/:id', function(req,res){
  User.findByIdAndRemove(req.params.id, function(err,rtn){
    if(err){
      res.status(500).json({
        message:'Server Error',
        error:err
      })
    }
    else {
      res.status(200).json({
        message:'User Deleted'
      });
    }
  });
});




module.exports = router;
