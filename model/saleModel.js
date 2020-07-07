const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saleSchema = new Schema({
		owner:{
			type:mongoose.Schema.Types.ObjectId,
			required:true,
			ref:'User',
		},
		shopName:{
			type:String,
			required:true,
			trim:true,
		},
		saleYear:{
			type:String,
			required:true,
			trim:true,
		},
		saleNote:{
			type:String,
			trim:true,
		},
		shopIncomes:[{
			monthName:{
				type:String,
				required:true,
				trim:true,
			},
			income:{
				type:Number,
				required:true,
			}
		}],
		totalIncome:{
			type:Number,
			required:true,
		}
},{
	timestamps:true
})

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;