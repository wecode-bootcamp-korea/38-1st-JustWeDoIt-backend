const express = require('express');

const { mainController, moveProductController } = require('../controllers')
const router = express.Router();

router.get('/',mainController.requestMain);
router.get('/products',moveProductController.requestProduct);

module.exports = router;