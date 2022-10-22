const { orderDao } = require('../models');
//const { checkStock } = require('../utils/checkStock');

const orderInfo = async (cartId, quantity) => {
  if (!cartId || !quantity) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }

  //await checkStock(productOptionId, quantity);

  return await orderDao.orderInfo(cartId, quantity);
};



module.exports = {
  orderInfo
  
};