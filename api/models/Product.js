var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
    CategoryID: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    status: {
        type: String
    }

});


module.exports = mongoose.model('Product', ProductSchema);