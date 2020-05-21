const express = require('express');
const router = express.Router();

const depesasControllers = require('../controllers/despesas');

router.get('/get-despesas', depesasControllers.getDespesas);

module.exports = router;
