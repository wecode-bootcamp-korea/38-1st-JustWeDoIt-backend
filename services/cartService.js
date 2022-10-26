const cartDao = require('../models/cartDao');

const createCartItem = async (userId, stockId) => {
  return await cartDao.createCartItem(userId, stockId)
  /*
    상품 상세페이지에서 데이터를 반환할 때, 아와 같은 구조로 만들어 주세요.
    {
      "data" : {
        "productId" : 1,
        "name" : "A",
        "stocks" : [
          {
            "stock_id" : 1,
            "size" : 230,
            "stock" : 10
          },
          {
            "stock_id" : 2,
            "size" : 240,
            "stock" : 50
          },
          ..
        ]   
      }
    }
  */
}

const getCartByUserId = async (userId) => {
  return await cartDao.getCartByUserId(userId);
}

const updateCart = async (userId, cartId, stockId, quantity) => {
  const [ cart ] = await cartDao.getCartByCartId(cartId);

  return await cartDao.updateCart(
    userId,
    cartId,
    stockId ? stockId : cart.stockId,
    quantity ? quantity : cart.quantity
  )
}

const deleteCart = async (userId, cartId) => {
  return await cartDao.deleteCart(userId, cartId)
}


module.exports = {
  createCartItem,
  getCartByUserId,
  updateCartItem,
  deleteCartItem,
}