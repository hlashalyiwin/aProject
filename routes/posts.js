var express = require('express');
var router = express.Router();
var Post = require('../model/Post');

router.get('/postadd', function(req,res,next){
  res.render('posts/post_add', { title: 'Post Added'});
});
router.post('/postadd', function(req, res, next){
var post = new Post();
post.title = req.body.title;
post.content = req.body.content;
post.author = req.body.author;
post.save(function(err, rtn){
  if(err) throw err;
  console.log('rtn'+ rtn);
  res.redirect('/posts/postdetail/' + rtn.id );
  console.log('called');
});
});


router.get('/postdetail/:id', function(req,res){
  console.log('call me');
  Post.findById(req.params.id, function(err,rtn){
    if(err) throw err;
    console.log('rtn' + rtn );
    res.render('posts/post_detail', { dataTitle: 'Post Detial', post: rtn});
  });
});


router.get('/postupdate/:id', function(req,res, next){
  console.log('call me updated');
  console.log('hla shalyi win');
  Post.findById(req.params.id, function(err,rtn){
    if(err) throw err;
    console.log('rtn'+ rtn);
    res.render('posts/post_update', { dataTitle: 'Post Updated', post:rtn});
  });
});
router.post('/postupdate', function(req,res,next){
  var postupdate={
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  }
  Post.findByIdAndUpdate(req.body.id,{$set:postupdate}, function(err,rtn){
    if(err) throw err;
    console.log('rtn' + rtn);
    res.redirect('/posts/postlist');
  });
});

router.get('/postdelete/:id', function(req,res,next){
  Post.findByIdAndRemove(req.params.id, function(err,rtn){
    if(err) throw err;
    res.redirect('/posts/postlist/');
  })
})

router.get('/postlist', function(req,res,next){
  Post.find({}, function(err,rtn){
    if(err) throw err;
    console.log('rtn'+rtn);
    res.render('posts/post_list', { dataTitle:'Post Listed', post:rtn});
  });
});
module.exports = router;
