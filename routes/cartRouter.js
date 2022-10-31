const express = require('express');
const { loginRequired } = require('../utils/auth');

const { createCart, getCarts, updateCart, deleteCart } = require('../controllers/cartController');

const router = express.Router();

router.post('', loginRequired, createCart);
router.get('', loginRequired, getCarts);
router.patch('/:cartId', loginRequired, updateCart);
router.delete('/:cartId', loginRequired, deleteCart);

module.exports = router
