const cartService = require('../services/cartService');
const { catchAsync } = require('../utils/error');

const createCartItem = async (req, res) => {
  const userId = req.user;
  const { productId, size } = req.body;

  if (!productId || !size) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await cartService.createCartItem(userId, productId, size);
  const data = await cartService.getCartByUserId(userId);

  return res.status(201).json({ 
    message : 'CART_ITEM_CREATED',
    data : data 
  });
}

const getCartItem = async (req, res) => {
  const userId = req.user;

  const data = await cartService.getCartByUserId(userId);

  return res.status(200).json({ 
    message : 'SUCCESS',
    data : data
  });
}

const updateCartItem = async (req, res) => {
  const userId = req.user;
  const { cartId, productId, newSize, buyingQuantity } = req.body;

  await cartService.updateCartItem(userId, cartId, productId, newSize, buyingQuantity);

  const data = await cartService.getCartByUserId(userId);

  return res.status(201).json({
    message : 'SUCCESS',
    data : data 
  });
}

const deleteCartItem = async (req, res) => {
  const userId = req.user;
  const stockId = req.params.stockId;

  if (!stockId) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await cartService.deleteCartItem(userId, stockId);

  return res.status(204).json({});
}

module.exports = {
  createCartItem,
  getCartItem,
  updateCartItem,
  deleteCartItem
}