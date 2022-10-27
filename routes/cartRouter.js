const express = require('express');
const { loginRequired } = require('../utils/auth');

const { getCartItem, createCartItem, updateCartItem, deleteCartItem } = require('../controllers/cartController');

const router = express.Router();

router.post('', loginRequired, createCartItem);
router.get('', loginRequired, getCartItem);
router.patch('', loginRequired, updateCartItem);
router.delete('/:stockId', loginRequired, deleteCartItem);

module.exports = router
