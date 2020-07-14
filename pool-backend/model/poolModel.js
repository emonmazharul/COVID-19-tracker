const mongoose = require('mongoose');
const validator = require('validator');
const imageSchema = require('./imageModel');

const Schema = mongoose.Schema;

const poolSchema = new Schema({
	poolQuestion:{
		type:String,
		required:true,
		trim:true,
	},
	creatorName:{
		type:String,
		required:true,
		trim:true,
	},
	creatorEmail:{
		type:String,
		required:true,
		trim:true,
		validate(val){
			if(!validator.isEmail(val)){
				throw new Error('Please insert a valid email');
			}
		}
	},
	poolOptions:[{
		optionName:{
			type:String,
			required:true,
			trim:true,
		},
		vote:{
			type:Number,
			default:0,
		},
		//later will add this option to the pool.
		optionImage:{
			type:imageSchema,
		}
	}],
	voters:[{
		chooseOption:{
			type:String,
			required:true,
		},
		voterEmail:{
			type:String,
			required:true,
			validate(val){
				if(!validator.isEmail(val)) throw new Error('please insert a valid email')
			}
		},
		voterIP:{
			type:String,
		}
	}],
	totalVote:{
		type:Number,
		default:0,
	},
	//expire at,
	expireAt:{
		type: Date,
		default:new Date(Date.now() + 1000*64*64*(24)),
	},
	poolEnded:{
		type:Boolean,
		default:false,
	}
},{
	timestamps:true,
});

poolSchema.methods.toJSON = function(){
	const pool = this;
	const poolObject = pool.toObject();
	delete poolObject._id;
	delete poolObject.__v;
	delete poolObject.creatorName;
	delete poolObject.creatorEmail;
	delete poolObject.createdAt,
	delete poolObject.updatedAt
	return poolObject;
}

const Pool = mongoose.model('Pool', poolSchema);

module.exports = Pool;