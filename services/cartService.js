const cartDao = require('../models/cartDao');

const createCartItem = async (userId, stockId) => {
  return await cartDao.createCartItem(userId, stockId)
}

const getCartByUserId = async (userId) => {
  return await cartDao.getCartByUserId(userId)
}

const getStockByUserId = async (userId) => {
  return await cartDao.getStockByUserId(userId)
}

const updateCartItem = async (userId, cartId, stockId, quantity) => {
  const cart = await cartDao.getCartByUserId(userId);

  return await cartDao.updateCartItem(
    userId,
    cartId,
    stockId ? stockId : cart.stockId,
    quantity ? quantity : cart.buyingQuantity
  )
}

const deleteCartItem = async (userId, stockId) => {
  return await cartDao.deleteCartItem(userId, stockId)
}


module.exports = {
  createCartItem,
  getCartByUserId,
  getStockByUserId,
  updateCartItem,
  deleteCartItem,
}