const express = require('express');
const orderController  = require('../controllers');

const router = express.Router();

router.get('/CartIterm',  loginRequired, orderController.CartIterm);


module.exports = router;