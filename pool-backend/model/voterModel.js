const mongoose = require('mongoose');
const validator = require('validator')

const voterSchema = new mongoose.Schema({
	voterEmail:{
		type:String,
		required:true,
		unique:true,
		validate(val){
			if(!validator.isEmail(val)) throw new Error('Please insert a valid eamil')
		},
	},
	voterIP:{
		type:String,
		// required:true,
		unique:true,
	},
	chooseOption:{
		type:String,
		required:true,
	}
})

module.exports = voterSchema;