const { orderDao } = require('../models');

const orderAdd = async (user_id, cart_id) => {
  if (!user_id || !cart_id) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }

  return await orderDao.orderAdd(user_id, cart_id);
};

// 결제 전 이면 수량이 빠지면 안되는 로직
// 재고의 수량이 없으면 결제가 안되는 로직
// 



module.exports = {
  orderAdd
  
};