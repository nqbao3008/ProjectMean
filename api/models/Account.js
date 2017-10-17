var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AccountSchema = new Schema({
    userName: {
        type: String,
        minlength: 10,
        maxlengh: 20
    },
    password: {
        type: String
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = mongoose.model('Account', AccountSchema);