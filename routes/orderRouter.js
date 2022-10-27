const express = require('express');
const { orderController } = require('../controllers'); 
const { loginRequired } = require('../utils/auth');

const router = express.Router();

router.get('',  orderController.orderInfo);
router.get('',  orderController.getCarts);
router.post('',  orderController.orderAdd);
router.post('',  orderController.orderItem); 
module.exports = router;

