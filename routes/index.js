const express = require("express");
const router = express.Router();
c
const orderRouter = require('./orderRouter');
router.use('/order', orderRouter);

module.exports = router;