const cartDao = require('../models/cartDao');

const createCart = async (userId, stockId) => {
  return await cartDao.createCart(userId, stockId)
}

const getCartsByUserId = async (userId) => {
  return await cartDao.getCartsByUserId(userId);
}

const updateCart = async (userId, cartId, stockId, buyingQuantity) => {
  const [ cart ] = await cartDao.getCartByCartId(cartId);

  return await cartDao.updateCart(
    userId,
    cartId,
    stockId ? stockId : cart.stockId,
    buyingQuantity ? buyingQuantity : cart.buyingQuantity
  )
}

const deleteCart = async (userId, cartId) => {
  return await cartDao.deleteCart(userId, cartId)
}

module.exports = {
  createCart,
  getCartsByUserId,
  updateCart,
  deleteCart,
}