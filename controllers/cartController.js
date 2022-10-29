const cartService = require('../services/cartService');

const createCart = async (req, res) => {
  const userId = req.user;
  const { stockId } = req.body;

  if (!stockId) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await cartService.createCart(userId, stockId);
  const carts = await cartService.getCartsByUserId(userId);

  return res.status(201).json({ 
    message : 'CART_ITEM_CREATED',
    data : carts 
  });
}

const getCarts = async (req, res) => {
  const userId = req.user;

  const data = await cartService.getCartsByUserId(userId);

  return res.status(200).json({ 
    message : 'SUCCESS',
    data : data
  });
}

const updateCart = async (req, res) => {
  const userId = req.user;
  const {
    params: { cartId },
    body: {
      stockId,
      buyingQuantity
    }
  } = req;

  const carts = await cartService.updateCart(userId, cartId, stockId, buyingQuantity);

  return res.status(201).json({
    message : 'SUCCESS',
    data : carts 
  });
}

const deleteCart = async (req, res) => {
  const userId = req.user;
  const { cartId } = req.params;

  if (!cartId) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await cartService.deleteCart(userId, cartId);

  return res.status(204).send();
}

module.exports = {
  createCart,
  getCarts,
  updateCart,
  deleteCart
}