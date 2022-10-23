const express = require("express");
const mainRouter = require('./mainRouter');
const router = express.Router();

router.use('/products',mainRouter);

module.exports = router;