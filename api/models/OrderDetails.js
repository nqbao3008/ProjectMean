
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var OrderDetailSchema = new Schema({
  quantity: {
  	type: Number,  
  	min: 1
  },
  productID: { 
  	type: Schema.Types.ObjectId, 
  	ref: 'Product' 
  },
  orderID: { 
  	type: Schema.Types.ObjectId, 
  	ref: 'Order' 
  }
});


module.exports = mongoose.model('orderDetail', OrderDetailSchema);