const express = require('express');
const Product = require('../db/pruductModel');
const Order = require('../db/orderModel');
const router = new express.Router();
const {addItem,readItems} =  require('../db/db.js');
const {v4:uuid} = require('uuid');

router.get('/product', async (req,res) => {
	try {
		const products = await Product.find();
		if(products.length < 1) {
			return res.status(204).send();
		}
		res.status(200).send(products);
	} catch (e) {
		console.log(e);
		res.status(500).send('Server Error Please try again');
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
		res.status(201).send('successfully saved your product')
	} catch (e) {
		console.log(e);
		res.status(500).send('Failed to save product')
	}
});

router.post('/order', async (req,res) => {
	const order = new Order(req.body);
	try {
		await order.save();
		res.status(201).send('Successfully received the order')
	} catch (e) {
		console.log(e);
		res.send('Failed to received order.Try again')
	}
});

router.get('/order', async (req,res) => {
	try {
		const orders = await Order.find();
		if(orders.length < 1) {
			return res.status(204).send();
		}
		res.send(orders)
	} catch(e) {
		console.log(e);
		res.status(500).send('Something goes wrong.Please try again');
	}
})

module.exports = router;