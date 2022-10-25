const express = require('express');
const mainRouter = require('./mainRouter');
const userRouter = require('./userRouter'); 
const router = express.Router();


router.use('/products',mainRouter);
router.use('/users', userRouter);

module.exports = router;