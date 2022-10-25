const cartDao = require('../models/cartDao');

const createCartItem = async (userId, stockId) => {
  return await cartDao.createCartItem(userId, stockId)
}

const sizeStock = async (productId) => {
  return await cartDao.sizeStock(productId)
}

const getCartByUserId = async (userId) => {
  return await cartDao.getCartByUserId(userId)
}

const updateCartItem = async (userId, cartId, stockId, buyingQuantity) => {
  const cart = await cartDao.getCartByCartId(cartId);

  return await cartDao.updateCartItem(
    userId,
    cartId,
    stockId ? stockId : cart.stockId,
    buyingQuantity ? buyingQuantity : cart.buyingQuantity
  )
}

const deleteCartItem = async (userId, stockId) => {
  return await cartDao.deleteCartItem(userId, stockId)
}


module.exports = {
  createCartItem,
  sizeStock,
  getCartByUserId,
  updateCartItem,
  deleteCartItem,
}