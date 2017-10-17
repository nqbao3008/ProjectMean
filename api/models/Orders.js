var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var OrdersSchema = new Schema({
    UserID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    OrderDate: {
        type: Date,
        default: Date.now
    },
    OderStatus: {
        type: String
    }
});


module.exports = mongoose.model('Order', OrdersSchema);