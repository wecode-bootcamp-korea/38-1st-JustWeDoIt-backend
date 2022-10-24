const express = require('express');
const orderController  = require('../controllers');
//const { orderItems } = require('../models/orderDao');

const router = express.Router();

router.post('', loginRequired, orderController.orderAdd);
router.get('', loginRequired, orderController.orderItems);
//router.post('/info',  loginRequired, orderController.orderInfo); post, get 인지 고민
module.exports = router;