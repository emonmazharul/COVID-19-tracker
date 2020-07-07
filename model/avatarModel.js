const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const avatarSchema = new Schema({
	avatar:{
		type:Buffer
	},
	mimeType:{
		type:String,
		default:'image/jpg',
	}
})

avatarSchema.methods.toJSON = function(){
	const avatar = this;
	const avatarObject = avatar.toObject();
	delete avatar._id;
	return avatarObject;;
}

module.exports = avatarSchema;