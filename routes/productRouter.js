const express = require('express');

const { productController, moveProductController } = require('../controllers')
const router = express.Router();

// 나는 RESTful하게 엔드포인트를 제대로 설계하고 있는가??

// GET :8000/products
router.get('',productController.getProducts);

// GET :8000/products/1
router.get('/:productId',moveProductController.requestProduct);

// GET :8000/products?categoryId=1
// GET :8000/categories/1/products
router.get('', productController.categoryFilter);


module.exports = router;
