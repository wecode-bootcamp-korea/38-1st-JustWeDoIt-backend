const express = require('express');
const orderController  = require('../controllers');

const router = express.Router();

router.get('', loginRequired, orderController.orderInfo);
//router.post('/info',  loginRequired, orderController.orderInfo); post, get 인지 고민
module.exports = router;