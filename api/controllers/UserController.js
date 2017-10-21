'use strict';
const User = require('../models/User');
const Order = require('../models/Orders');

module.exports = {

    Search_all_user_promises: (req, res, next) => {
        User.find({})
            .then(users => {
                res.status(200).json(users);

            })
            .catch(err => {
                next(err);
            })
    },

    create_user_callback: function(req, res) {
        const newUser = new User(req.body);
        newUser.save(function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    },

    Create_user_promises: (req, res, next) => {
        const newUser = new User(req.body);
        console.log(req.body.name);
        newUser.save()
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                next(err);
            })
    },

    Create_user_route_express: async(req, res, next) => {
        try {
            const newUser = new User(req.body);
            const user = await newUser.save();
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    },
    //express-promise-router support try/ catch err

    Create_user: async(req, res, next) => {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json(user);

    },

    Search_all_user: async(req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },

    Search_a_User: async(req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user);

    },

    Update_User: async(req, res, next) => {
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findOneAndUpdate({ _id: userId}, newUser, { new: true });
        res.status(200).json(result);
    },

    Replace_User: async(req, res, next) => {
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findOneAndUpdate({ _id: userId}, newUser, { new: true });
        res.status(200).json(result);
    },

    get_UserOders: async(req, res, next) => {
    	const {userId} =req.params;
    	const user = await User.findById(userId).populate('OrderID');
    	console.log('user',userId);
    	res.status(200).json(user)
    },

    create_UserOders: async(req, res, next) => {
    	const { userId } = req.params;
    	
        //Create new Order
    	const newOrder= new Order(req.body);
    	
        //Get User
    	const user = await User.findById(userId);
    	
        //Assign user as a Oder's UserID
    	newOrder.UserID = user;
    	console.log('user',user);
    	console.log(newOrder);
    	
        //Save the Order
    	await newOrder.save();
    	
        //Add orderID to User
    	user.OrderID.push(newOrder);
    	
        //Save the user
    	await user.save();
    	res.status(201).json(newOrder);

    }
}