'use strict';
const passport = require('passport');
const express = require('express'),
    apiRoutes = require('express-promise-router')(),
    UserController = require('../controllers/UserController'),
    OrderController = require('../controllers/OrderController'),
     CategoryController = require('../controllers/CategoryController'),
    ProductController = require('../controllers/ProductController');
const productController = require('../controllers/ProductController');
const userController = require('../controllers/UserController');
const cartController = require('../controllers/CartController'),
    ejs = require('ejs');
const AprioriController = require('../controllers/AprioriController');
const config = require('../../config/main');
const jwt = require('jsonwebtoken');

// Set up middleware
const requireAuth = passport.authenticate('jwt', { session: false });

// Load models
const User = require('../models/User');
//support try catch err automatically
//const router = express.Router();

apiRoutes.route('/product')
    .get((req, res) => {
        // check if login => about else render login
        ejs.renderFile("./api/view/product.ejs", {}, (err, html) => {
            res.end(html);
        })
    })
    .post(productController.createAProduct);

apiRoutes.route('/product')
    .post(productController.addProduct)

apiRoutes.route('/product/list')
    .get(productController.readAllProduct)
    .post(productController.addProductsToCart);
//check role
apiRoutes.route('/cart')
    .get(cartController.readAllCart);


apiRoutes.route('/confidenceResult')
    .post(AprioriController.create_confidence)
    .get(AprioriController.find_recomendation)
//check role

apiRoutes.route('/confidenceResult/all')
    .get(AprioriController.find_recomendation)
    //.post(AprioriController.find_recomendation)

apiRoutes.route('/cart/:productId')
    .get(cartController.readCartItem)
    .delete(cartController.deleteCartItem);

apiRoutes.route('/about')
    .get((req, res) => {
        // check if login => render about else forward login
        if (typeof req.session !== 'undefined') {
            var item = {};
            item.username = req.session.name;
            item.age = "21";
            ejs.renderFile('./api/view/about.ejs', item, (err, html) => {
                res.end(html);
            });
        } else {
            res.redirect('/login');
        }
    });


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
                    var payload = { id: user.userId, password: user.password, email: user.email, role: user.role };
                    const token = jwt.sign(payload, 'baobao', {
                        expiresIn: 10080 // in seconds
                    });
                    req.session.name = user.username;
                console.log('co user')
                // res.redirect('/about');
                /*ejs.renderFile('./api/view/about.ejs', {username: user.username}, (err, html) => {
                    res.end(html);
                });*/


                req.session.save(function(err) {
                    // session saved
                    req.session.reload(function(err) {
                        // session updated
                        res.redirect('/about');
                    })
                })
                    res.status(200).json({ success: true, token: ' ' + token });
                } else {
                    res.status(401).json({ success: false, message: 'Authentication failed. Passwords did not match.' });
                }
            });
        }
    });
});


// Set up middleware authentication
apiRoutes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['authorization'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, 'baobao', function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.token = token;
                req.decoded = decoded;
                console.log(decoded);
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});


/*
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
    .post(UserController.create_UserOders);*/





//-----------------------------------------------------------------------
apiRoutes.route('/users')
    .get(UserController.Search_all_user)
    .post(UserController.Create_user);

apiRoutes.route('/user/:userId')
    .get(UserController.Search_a_User)
    .put(UserController.Replace_User)
    .patch(UserController.Update_User);

apiRoutes.route('/user/:userId/orders')
    .get(OrderController.get_UserOders)
    .post(OrderController.create_UserOders);

apiRoutes.route('/user/:userId/orders/:orderId')
    .delete(OrderController.delete_UserOrders);

apiRoutes.route('/categories')
    .get(CategoryController.Search_all_categories)
    .post(CategoryController.Create_category);

apiRoutes.route('/category/:categoryId')
    .get(CategoryController.Search_a_category)
    .put(CategoryController.Update_Category)
    .delete(CategoryController.Delete_Category);

/*apiRoutes.route('/category/:categoryId/products')
    .get(ProductController.get_Product)
    .post(ProductController.create_Products);*/
// API Route Section

// Initialize passport for use
//app.use(passport.initialize());


// Bring in defined Passport Strategy









apiRoutes.get('/dashboard', (req, res) => {
    //var token = req.body.token || req.query.token || req.headers['authorization'];
    res.send(req.decoded);
});


apiRoutes.post('/logout', function(req, res, next) {
    //console.log(req.token);
    jwt.verify(req.token, 'wrong-secret', function(err, decoded) {
        if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
            // if everything is good, save to request for use in other routes
            return res.json({ mess: 'logout success' })
        }
    });
});

apiRoutes.get('/logout', (req, res) => {
    if (typeof req.session !== 'undefined')
        req.session.destroy((err) => {
            console.log('session was destroyed');
            // req.session.reload();
            // req.logout();
            res.clearCookie('my.connect.sid');
            res.redirect('/about');
        });
    else {
        res.redirect('/login');
    }
});

module.exports = apiRoutes;