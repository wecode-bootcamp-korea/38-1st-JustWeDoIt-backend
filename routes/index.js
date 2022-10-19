const express = require("express");
const routerMain = require('./routerMain');
const router = express.Router();

router.use('/main',routerMain);

module.exports = router;