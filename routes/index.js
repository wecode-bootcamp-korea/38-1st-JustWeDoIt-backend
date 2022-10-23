const express = require("express");
const mainRouter = require('./mainRouter');
const router = express.Router();

// const userRouter = require('./userRouter');
// const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');

// router.use('/users', userRouter.router);
// router.use('/products', productRouter.router);
router.use('/carts', cartRouter.router);

router.use('/products',mainRouter);

module.exports = router;