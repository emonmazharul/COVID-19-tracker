const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const avatarSchema = require('./avatarModel');
const Sale = require('./saleModel');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name:{
		type:String,
		required:true,
		trim:true,
	},
	email:{
		type:String,
		required:true,
		trim:true,
		unique:true,
		lowercase:true,
		validate(val){
			if(!validator.isEmail(val)) {
				throw new Error('Please insert a valid email address');
			}
		}
	},
	password:{
		type:String,
		minlength:8,
		required:true,
	},
	avatar:{
		type:avatarSchema,
	}
},{
	timestamps:true,	
})

userSchema.virtual('sales',{
	ref:'Sale',
	localField:'_id',
	foreignField:'owner'
})

userSchema.methods.toJSON = function(){
	const user = this;
	const userObject = user.toObject();
	delete userObject._id;
	delete userObject.email;
	delete userObject.password;
	return userObject;
}

userSchema.statics.findByCredentials = async function(email,password){
	try {
		const user = await User.findOne({email});
		if(!user) throw new Error('Invalid email or password');
		const isMatch = await bcrypt.compare(password,user.password);
		if(!isMatch) throw new Error('Invalid email or password');
		return user;
	} catch (e) {
		throw new Error(e.message)
	}
} 

userSchema.pre('save', async function(next){
	try {
		const user = this;
		if(user.isModified('password')) {
			user.password = await bcrypt.hash(user.password, 8);
		}
		next();
	} catch (e) {
		console.log(e);
	}	
})

userSchema.pre('remove', async function(next) {
	try {
		const user = this;
		await Sale.deleteAll({owner:user._id});
		next();
	} catch (e) {
		console.log(e);
	}
})

const User = mongoose.model('user', userSchema);

module.exports = User;