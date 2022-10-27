const express = require('express');
const { orderController } = require('../controllers'); 
//const { loginRequired } = require('../utils/auth');

const router = express.Router();

router.get('/1',  orderController.orderInfo);
router.get('/2',  orderController.getCarts);
router.post('/3',  orderController.orderAdd);
module.exports = router;

