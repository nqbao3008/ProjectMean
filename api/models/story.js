var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Person = require('person');

var storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person'},
  title: String
});

module.exports = mongoose.model('Story', storySchema);