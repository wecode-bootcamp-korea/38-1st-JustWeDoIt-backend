const express = require('express');

const { mainController, moveProductController } = require('../controllers')
const router = express.Router();

router.get('/main',mainController.requestAllMain);
router.get('/mains',mainController.requestMain);

router.get('/details',moveProductController.requestProduct);

module.exports = router;