const express = require('express')
const path = require('path');
const router = new express.Router();
const clientPath = path.resolve(__dirname, '../', 'client','dist','index.html');

router.get('/*', (req,res) => {
	res.sendFile(clientPath);
})

module.exports = router;