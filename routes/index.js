const express = require('express');
const productRouter = require('./productRouter');
const userRouter = require('./userRouter'); 
const router = express.Router();

const cartRouter = require('./cartRouter'); 

router.use('/products',productRouter);
router.use('/carts', cartRouter);
router.use('/users', userRouter);

module.exports = router;