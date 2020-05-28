const express = require('express');
const Product = require('../db/pruductModel');
const Order = require('../db/orderModel');
const router = new express.Router();
const {addItem,readItems} =  require('../db/db.js');
const {v4:uuid} = require('uuid');

router.get('/product', async (req,res) => {
	try {
		const data = await Product.find();
		res.status(200).send(data);
	} catch (e) {
		console.log(e);
		res.status(204).send([]);
	}
})


router.post('/product', async (req,res) => {
	const {itemName,price,quantity} = req.body;
	const img = `https://via.placeholder.com/200x150.jpg?text=${itemName}`
	console.log(req.body);
	const product = new Product({
		itemID:uuid(),
		itemName,
		price,
		quantity,
		img,
	});
	try {
		await product.save();
		res.status(201).send({success:'successfully saved your product'})
	} catch (e) {
		console.log(e);
		res.status(500).send({err:'failed to save product'})
	}
});

router.post('/order', async (req,res) => {
	console.log(req.body)
	const order = new Order(req.body);
	try {
		await order.save();
		res.status(201).send('successfully saved the order')
	} catch (e) {
		console.log(e);
		res.status(500).send({error:'failed to save order'})
	}
});

router.get('/order', async (req,res) => {
	try {
		const orders = await Order.find();
		res.send(orders)
	} catch(e) {
		console.log(e);
		res.status(204).send({error:'something goes wrong,please try again'})
	}
})

module.exports = router;
