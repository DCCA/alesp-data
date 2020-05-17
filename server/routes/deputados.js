// Import packages
const express = require('express');
// Start router
const router = express.Router();
// Import models
const deputadosControllers = require('../controllers/deputados');
// Routes
router.get('/get-deputados', deputadosControllers.getDeputados);
router.get('/get-deputado', deputadosControllers.getDeputado);

module.exports = router;
