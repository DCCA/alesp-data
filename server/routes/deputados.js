// Import packages
const express = require('express');
// Start router
const router = express.Router();
// Import models
const Deputados = require('../models/deputados');
// Routes
router.get('/get-deputados', async (req, res, next) => {
	try {
		const deputados = await Deputados.find();
		res.status(200).json(deputados);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
