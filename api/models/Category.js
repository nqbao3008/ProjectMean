var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CategorySchema = new Schema({
    Name: {
        type: String
    },
    Position: {
        type: String
    },
    Status: {
        type: String
    },
    productID: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});


module.exports = mongoose.model('Category', CategorySchema);