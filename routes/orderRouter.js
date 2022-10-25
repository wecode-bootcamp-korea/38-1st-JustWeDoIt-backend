const express = require('express');
const orderController  = require('../controllers');
//const { orderItems } = require('../models/orderDao');

const router = express.Router();

router.post('', loginRequired, orderController.orderAdd);
router.get('', loginRequired, orderController.orderItems);
router.post('', loginRequired, orderController.shippingInfo);
router.delete('', loginRequired, orderController.cartsDelete);
router.patch('', loginRequired, orderController.stockSubtract);
//router.post('/info',  loginRequired, orderController.orderInfo); post, get 인지 고민
module.exports = router;