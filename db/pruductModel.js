const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
	itemID:{
		type:String,
		required:true,
		trim:true,
	},
	itemName: {
		type:String,
		required:true,
		trim:true,
	},
	quantity: {
		type:String,
		required:true,
		trim:true,
	},
	price:{
		type:String,
		required:true,
		trim:true,
	},
	img:{
		type:String,
		required:true,
		trim:true,
	},

});

const Product = mongoose.model('product', productSchema)

module.exports = Product;