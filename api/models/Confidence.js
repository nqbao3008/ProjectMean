var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ConfidenceSchema = new Schema({
    id1: {
        type: String
    },
    id2: {
        type: String
    },
    confidence:{
        type: Number
    },
    status: {
        type: String
    }
});

module.exports = mongoose.model('Confidence', ConfidenceSchema);