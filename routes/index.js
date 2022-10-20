const express = require("express");
const mainRouter = require('./mainRouter');
const router = express.Router();

router.use('/main',mainRouter);

module.exports = router;