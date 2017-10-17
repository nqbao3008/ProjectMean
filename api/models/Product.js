var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
    CategoryID: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    Name: {
        type: String
    },
    Price: {
        type: Number
    }
    Info: {
        type: String
    }
    Detail: {
        type: String
    }
    Status: {
        type: String
    }

});


module.exports = mongoose.model('Product', ProductSchema);