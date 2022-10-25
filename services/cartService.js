const cartDao = require('../models/cartDao');

const createCartItem = async (userId, stockId) => {
  return await cartDao.createCartItem(userId, stockId)
}

const stockIdToSize = async (stockId) => {
  return await cartDao.stockIdToSize(stockId)
}

const sizeToStockId = async (size) => {
  return await cartDao.sizeToStockId(size)
}

const sizeStock = async (productId) => {
  return await cartDao.sizeStock(productId)
}

const getCartByUserId = async (userId) => {
  const data = await cartDao.getCartByUserId(userId);

  let stockList = [];
  let stockInfo = {};
  
  for (let i = 0; i < data.length; i++) {
    stockList = await cartDao.sizeStock(data[i].productId);

    stockList !== 0 &&
    stockList.map((el) => {
      const {size, stock} = el;
      
      stockInfo = {...stockInfo,
        [size] : stock
      }
    })

    data[i].stockInfo = stockInfo
  }

  return data;
}

const updateCartItem = async (userId, cartId, productId, newSize, buyingQuantity) => {

  const [ cart ] = await cartDao.getCartByCartId(cartId);

  let changedSize = newSize ? newSize : cart.size
  const [ data ] = await cartDao.sizeToStockId(productId, changedSize);
  const stockId = Object.values(data);

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
  stockIdToSize,
  sizeToStockId,
  sizeStock,
  getCartByUserId,
  updateCartItem,
  deleteCartItem,
}