const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
	image:{
		type:Buffer,
		required:true,
	},
	mimeType:{
		type:String,
		trim:true,
		default:'image/jpg',
	}
});

module.exports = imageSchema;