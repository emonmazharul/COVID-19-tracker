const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
	userName:{
 		type:String,
 		required:true,
 		trim:true,
	},
	userAddress:{
		type:String,
		required:true,
		trim:true,
	},
	userOccupation:{
		type:String,
		required:true,
		trim:true,
	},
	quantity: {
		type:String,
		required:true,
		trim:true,
	},
	orderdItem:{
		type:Number,
		required:true,
	},
	itemID: {
		type:String,
		required:true,
		trim:true,
	},
	itemName: {
		type:String,
		required:true,
		trim:true,
	},
	itemPrice: {
		type:Number,
		required:true,
		trim:true,
	},
	totalPrice:{
		type:Number,
		required:true,
		trim:true,
	},
	img:{
		type:String,
		required:true,
		trim:true,
	}

});

const Order = mongoose.model('order', orderSchema)

module.exports = Order;