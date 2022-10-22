const express = require("express");
const router = express.Router();

const orderRouter = require('./orderRouter');
router.use('/orders', orderRouter);

module.exports = router;