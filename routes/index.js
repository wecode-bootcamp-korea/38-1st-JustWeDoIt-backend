const express = require('express');
const router = express.Router();

const productRouter = require('./productRouter');
const userRouter = require('./userRouter'); 
const cartRouter = require('./cartRouter');
const orderRouter = require('./orderRouter');

router.use('/products', productRouter);
router.use('/carts', cartRouter);
router.use('/users', userRouter);
router.use('/orders', orderRouter);

module.exports = router;