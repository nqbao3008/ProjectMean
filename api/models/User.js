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
    mail: { 
    	type: String 
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
    	type: String 
    },
    accID: { 
    	type: Schema.Types.ObjectId, 
    	ref: 'Account' 
    },
    OrderID: [{
    	type: Schema.Types.ObjectId, 
    	ref: 'Order'
    }]
});


module.exports = mongoose.model('User', UserSchema);