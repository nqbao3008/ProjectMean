'use strict';

const express = require('express'),
    router = require('express-promise-router')(),
    UserController = require('../controllers/UserController');
//support try catch err automatically
//const router = express.Router();

router.route('/')
    .get(UserController.Search_all_user)
    .post(UserController.Create_user);

router.route('/:userId')
    .get(UserController.Search_a_User)
    .put(UserController.Replace_User)
    .patch(UserController.Update_User);

router.route('/:userId/orders')
.get(UserController.get_UserOders)
.post(UserController.create_UserOders);

module.exports = router;

/*module.exports = function(app) {
  
  var todoPost = require('../controllers/PostController'),
  todoComment = require('../controllers/CommentController');

  // todoList Routes
  
// // api/posts/


  

    app.route('/posts').post(todoPost.create_a_post);

    app.route('/posts/:postId/comments').post(todoComment.postComment);

// api/posts/:postId/comments 

   }*/
/*
https://www.youtube.com/watch?v=G_xHi0jywmc
*/