const cartService = require('../services/cartService');

const createCarts = async (req, res) => {
  const userId = req.user;
  const { stockId } = req.body;

  if (!stockId) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await cartService.createCarts(userId, stockId);
  const data = await cartService.getCartByUserId(userId);

  return res.status(201).json({ 
    message : 'CART_ITEM_CREATED',
    data : data 
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
  // PATCH :8000/carts/10 <- 10은 cartId
  const {
    user: { userId },
    params: { cartId },
    body: {
      productId,
      newSize,
      buyingQuantity
    }
  } = req

  const carts = await cartService.updateCart(userId, cartId, productId, newSize, buyingQuantity);

  return res.status(201).json({
    message : 'SUCCESS',
    data : carts
  });

}

const deleteCartItem = async (req, res) => {
  // DELETE :8000/carts/10
  const userId = req.user;
  const { cartId } = req.params

  await cartService.deleteCartItem(userId, stockId);

  return res.status(204).send();
}

module.exports = {
  createCartItem,
  getCartItem,
  updateCartItem,
  deleteCartItem
}