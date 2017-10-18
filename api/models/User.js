var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nameCheck = (name) => {
    return (name.length > 5 && name.length < 100 && name.match(/[a-z]/i) && name.match(/[0-9]/i))
}

var UserSchema = new Schema({
    name: {
        type: String,
        //validate: nameCheck 
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    phone: {
        type: Number
    },
    status: {
        type: String
    },
    address: {
        type: String
    },
    role: {
        type: String,
        enum: ['Client', 'Manager', 'Admin'],
        default: 'Client'
    },
    accID: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    userName: {
        type: String,
        minlength: 10,
        maxlengh: 20
    },
    password: {
        type: String
    },
    OrderID: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }]
});


module.exports = mongoose.model('User', UserSchema);