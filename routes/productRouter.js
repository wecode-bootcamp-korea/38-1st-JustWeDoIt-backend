const express = require('express');

const { productController, moveProductController } = require('../controllers')
const router = express.Router();

router.get('/main',productController.requestAllMain);
router.get('/mains',productController.getProducts);
router.get('/mains/:categoryId', productController.categoryFilter);
router.get('/details',moveProductController.requestProduct);

module.exports = router;
