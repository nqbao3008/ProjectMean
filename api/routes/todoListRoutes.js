'use strict';
const passport = require('passport');
const express = require('express'),
    apiRoutes = require('express-promise-router')(),
    UserController = require('../controllers/UserController'),
    OrderController = require('../controllers/OrderController');


const config = require('../../config/main');
const jwt = require('jsonwebtoken');

// Set up middleware
const requireAuth = passport.authenticate('jwt', { session: false });

// Load models
const User = require('../models/User');
//support try catch err automatically
//const router = express.Router();

apiRoutes.route('/user')
    .get(UserController.Search_all_user)
    .post(UserController.Create_user);

apiRoutes.route('/user/:userId')
    .get(UserController.Search_a_User)
    .put(UserController.Replace_User)
    .patch(UserController.Update_User);

apiRoutes.route('/user/:userId/orders')
    .get(UserController.get_UserOders)
    .post(UserController.create_UserOders);

apiRoutes.route('/user/:userId/orders/:orderId')
    .get(UserController.get_UserOders)
    .post(UserController.create_UserOders);
    

    // API Route Section

      // Initialize passport for use
  //app.use(passport.initialize());
    

    // Bring in defined Passport Strategy
   

   
    

    // Register new users
    apiRoutes.post('/register', function(req, res) {
        console.log(req.body);
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ success: false, message: 'Please enter email and password.' });
        } else {
            const newUser = new User(req.body);

            // Attempt to save the user
            newUser.save(function(err) {
                if (err) {
                    return res.status(400).json({ success: false, message: 'That email address already exists.' });
                }
                res.status(201).json({ success: true, message: 'Successfully created new user.' });
            });
        }
    });

    // Authenticate the user and get a JSON Web Token to include in the header of future requests.
    apiRoutes.post('/authenticate', function(req, res) {
        console.log('ssss');
        User.findOne({
            email: req.body.email
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
            } else {
                // Check if password matches
                User.schema.methods.comparePassword(req.body.password, user.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        // Create token if the password matched and no error was thrown
                        var payload = {id: user.userId, password: user.password};
                        const token = jwt.sign(payload, 'baobao', {
                            expiresIn: 10080 // in seconds
                        });
                        res.status(200).json({ success: true, token: 'JWT ' + token });
                    } else {
                        res.status(401).json({ success: false, message: 'Authentication failed. Passwords did not match.' });
                    }
                });
            }
        });
    });

apiRoutes.get('/dashboard', passport.authenticate('jwt',{session: false}), (req, res)=>{
    res.send('It worked! User')
})
module.exports = apiRoutes;

