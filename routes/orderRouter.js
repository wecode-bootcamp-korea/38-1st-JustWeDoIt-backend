const express = require('express');
const orderController  = require('../controllers');

const router = express.Router();

router.get('/orderInfo',  loginRequired, orderController.orderInfo);


module.exports = router;