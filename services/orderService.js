const { orderDao } = require('../models');
//const { checkStock } = require('../utils/checkStock');

const orderAdd = async (user_id, cart_id) => {
  if (!user_id || !cart_id) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }

  //await checkStock(productOptionId, quantity);

  return await orderDao.orderAdd(user_id, cart_id);
};



module.exports = {
  orderAdd
  
};