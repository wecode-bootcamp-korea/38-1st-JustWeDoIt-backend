const express = require('express');
const { loginRequired } = require('../utils/auth');

const { getCartItem, createCartItem, updateCartItem, deleteCartItem } = require('../controllers/cartController');

const router = express.Router();

// router.post('/:stockId', loginRequired, createCartItem);
router.post('/:stockId/:userId', createCartItem);
// router.get('', loginRequired, getCartItem);
router.get('/:userId', getCartItem);
// router.patch('/:stockId', loginRequired, );
router.patch('/:userId', updateCartItem);
// router.delete('/:stockId', loginRequired, deleteCartItem);
router.delete('/:stockId/:userId', deleteCartItem);

module.exports = {
  router
}