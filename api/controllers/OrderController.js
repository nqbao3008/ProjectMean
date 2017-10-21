'use strict';
const User = require('../models/User');
const Order = require('../models/Orders');

module.exports = {

    get_UserOders: async(req, res, next)=>{
        const {userId} =req.params;
        const user = await User.findById(userId).populate('OrderID');
        console.log('user',userId);
        res.status(200).json(user)
    }
}