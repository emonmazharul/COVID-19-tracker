const express = require('express');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const User = require('../model/userModel');
const Sale = require('../model/saleModel');
const router = new express.Router();
const {
	postUser,
	getUser,
	login,
	logout,
	postSale,
	deleteSale,
	postAvatar,
	getAvatar,
	deleteUser } = require('./apiFunctions')

router.post('/user', postUser);

router.get('/user', getUser);

router.post('/login', login);

router.post('/logout', logout);

router.post('/sale', postSale);

router.delete('/sale', deleteSale);

const upload = multer();

router.post('/avatar', upload.single('avatar'), postAvatar );

router.get('/avatar', getAvatar);

router.delete('/user', deleteUser);

module.exports = router;