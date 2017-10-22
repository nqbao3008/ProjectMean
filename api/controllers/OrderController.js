'use strict';
const User = require('../models/User');
const Order = require('../models/Orders');
var mongoose = require('mongoose');
module.exports = {

    get_UserOders: async(req, res, next)=>{
     const {userId} =req.params;
     const user = await User.findById(userId).populate('OrderID');
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
        //Save the Order
        await newOrder.save();
        //Add orderID to User
        user.OrderID.push(newOrder);
        //Save the user
        await user.save();
        res.status(201).json(newOrder);

    },

    update_UserOrders: async(req, res, next) => {
        const { orderId } = req.params;
        const newOrder =  req.body;
        const result = await Order.findOneAndUpdate({ _id: orderId}, newOrder, { new: true });
        res.status(200).json(result);
    },
    
    delete_UserOrders: (req, res, next) => {
        var  orderId  = mongoose.mongo.ObjectID(req.params.orderId),
             userId  = mongoose.mongo.ObjectID(req.params.userId);
        console.log(orderId);
        console.log(typeof orderId);
        console.log(typeof userId);

       
        User.findByIdAndUpdate(
            userId,
            { $pull: { 'OrderID': { _id: orderId } } },{new: true},function(err,model){
                if(err){
                    console.log(err);
                    return res.send(err);
                }
                return res.json(model);
            });
       
    }
}