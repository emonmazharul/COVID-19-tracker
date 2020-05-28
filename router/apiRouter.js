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
<<<<<<< HEAD
		res.status(500).send('Server Error Please try again');
=======
		res.status(204).send([]);
>>>>>>> 6282e539ad47ec48730f3b58c81a46bb32e2c469
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
<<<<<<< HEAD
		res.status(500).send('Failed to save product')
=======
		res.status(500).send({err:'failed to save product'})
>>>>>>> 6282e539ad47ec48730f3b58c81a46bb32e2c469
	}
});

router.post('/order', async (req,res) => {
	const order = new Order(req.body);
	try {
		await order.save();
		res.status(201).send('Successfully received the order')
	} catch (e) {
		console.log(e);
<<<<<<< HEAD
		res.send('Failed to received order.Try again')
=======
		res.status(500).send({error:'failed to save order'})
>>>>>>> 6282e539ad47ec48730f3b58c81a46bb32e2c469
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
<<<<<<< HEAD
		res.status(500).send('Something goes wrong.Please try again');
=======
		res.status(204).send({error:'something goes wrong,please try again'})
>>>>>>> 6282e539ad47ec48730f3b58c81a46bb32e2c469
	}
})

module.exports = router;
