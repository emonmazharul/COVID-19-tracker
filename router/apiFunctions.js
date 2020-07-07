const User = require('../model/userModel');
const Sale = require('../model/saleModel');
const bcrypt = require('bcryptjs');

async function postUser(req,res){
	const {name,email,password} = req.body;
	const user = new User({name,email,password});
	try {
		await user.save();
		req.session.user_id = user._id;
		res.status(201).send(user);
	} catch (e) {
		console.log(e);
		const passwordError = `user validation failed: password: Path \`password\` (\`${password}\`) is shorter than the minimum allowed length (8).`
		const emailError = `E11000 duplicate key error collection: salemanager.users index: email_1 dup key: { : "${email}" }`
		let errorMsg = '';
		passwordError === e.message ? errorMsg = 'Password is shorter than expected' : errorMsg
		emailError === e.message ? errorMsg = 'Email already in used' : errorMsg;
		res.status(400).send({error:errorMsg});
	}
}

async function getUser(req,res) {
	try {
		const user = await User.findById(req.session.user_id);
		if(!user) throw new Error('You aren\'t authenticated')
		const sales = await user.populate({
			path:'sales',
			options:{
				sort:{createdAt:'-1'}
			}
		}).execPopulate();
		res.status(200).send({user,sales:user.sales});
	} catch (e) {
		console.log(e);
		res.status(401).send({error:e.message})
	}
}

async function login(req,res){
	const {email,password} = req.body;
	try {
		const user = await User.findByCredentials(email,password);
		req.session.user_id = user._id
		return res.status(201).send(user);
	} catch (e) {
			res.status(400).send({error:e.message})
	}
}

function logout(req,res){
	req.session.destroy(err => {
		if(err){
			console.log(err);
			return res.status(401).send({error:'Failed to logout'})
		}
		res.status(200).send({success:'Successfully Logout'})
	})
}

async function postSale(req,res){
	const {saleNote,saleYear,shopName,shopIncomes} = req.body;
	const totalIncome = Array.isArray(shopIncomes) && shopIncomes.map(shop => shop.income).reduce((acc,item) => acc+item);
	const sale = new Sale({
		owner:req.session.user_id,
		shopName,
		saleYear,
		saleNote,
		shopIncomes,
		totalIncome,
	});
	try {
		await sale.save();
		const user = await User.findById(req.session.user_id);
		await user.populate({
			path:'sales',
			options:{
				sort:{createdAt:'-1'}
			}
		}).execPopulate();
		res.status(201).send({success:'Successfully saved your sale',sales:user.sales});
	} catch (e) {
		console.log(e);
		res.status(400).send({error:'Failed to save!Please try again'});
	}
}

async function deleteSale(req,res){
	try {
		const {_id:deletedSaleId} = await Sale.findByIdAndDelete(req.body.id);
		const user = await User.findById(req.session.user_id);
		await user.populate({
			path:'sales',
			options:{
				sort:{createdAt:'-1'}
			}
		}).execPopulate();
		res.status(200).send({
			sales:user.sales,
			deletedSaleId,
		});
	} catch (e) {
		res.status(400).send({error:'failed to delete'})
	}
}

async function postAvatar(req,res){
	try {
		if(!req.file) throw new Error('upload failed')
		const {buffer,mimetype:mimeType} = req.file;
		const user = await User.findById(req.session.user_id);
	 	user.avatar = {
	 		avatar:buffer,
	 		mimeType,
	 	}
	 	await user.save();
		res.status(201).send({
			avatar:user.avatar,
			success:'Successfully uploaded avatar',
		});
	} catch (e) {
		console.log(e);
		res.status(401).send({success:e.message});
	}
}

async function getAvatar(req,res) {
	try {
		const user = await User.findById(req.session.user_id);
		const {avatar=undefined,mimeType=undefined} = user.avatar;
		res.set('Content-Type', mimeType);
		res.status(200).send(avatar);
	} catch (e) {
		console.log(e);
		res.status(401).send({error:'failed to load avatar'})
	}
}

async function deleteUser(req,res) {
	const {password} = req.body;
	try {
		const user = await User.findById(req.session.user_id);
		const isMatch = await bcrypt.compare(password,user.password);
		if(!isMatch) throw new Error('Incorrect Password');
		await User.findByIdAndDelete(user._id);
		res.status(200).send({success:'Successfully delete your account'})
	} catch (e) {
		console.log(e);
		res.status(401).send({error:e.message});
	}
}

module.exports = {
	postUser,
	getUser,
	login,
	logout,
	postSale,
	deleteSale,
	postAvatar,
	getAvatar,
	deleteUser,





}