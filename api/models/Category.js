var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CategorySchema = new Schema({
    Name: {
        type: String
    },
    Position: {
        type: String
    }
    Status: {
        type: String
    }

});


module.exports = mongoose.model('Category', CategorySchema);