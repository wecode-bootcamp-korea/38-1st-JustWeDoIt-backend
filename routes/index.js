const express = require('express');
const router = express.Router();

const cartRouter = require('./cartRouter');
const userRouter = require('./userRouter'); 

router.use('/carts', cartRouter.router);
router.use('/users', userRouter);

module.exports = router;