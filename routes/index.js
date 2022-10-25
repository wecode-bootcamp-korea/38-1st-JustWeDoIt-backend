const express = require('express');
const router = express.Router();

<<<<<<< HEAD
// const userRouter = require('./userRouter');
// const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');

// router.use('/users', userRouter.router);
// router.use('/products', productRouter.router);
router.use('/carts', cartRouter.router);
=======
const userRouter = require('./userRouter'); 

router.use('/users', userRouter);
>>>>>>> main

module.exports = router;