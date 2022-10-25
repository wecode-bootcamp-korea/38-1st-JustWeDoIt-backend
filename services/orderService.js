const { orderDao } = require('../models/orderDao');

const orderAdd = async (userId, orderId, orderNumber, orderStatusId) => { // 컨트롤에 넣어준 값을 그대로
  if (!user_id || !order_id) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }

  return await orderDao.orderAdd(userId, orderId, orderNumber, orderStatusId); //다오에 들어갈 객체
};

const orderItems = async (userId, orderId) => { // 컨트롤에 넣어준 값을 그대로
  /*if (!userId || !orderId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }*/

  return await orderDao.orderItems(userId, orderId); //다오에 들어갈 객체
};
// 결제 전 이면 수량이 빠지면 안되는 로직
// 재고의 수량이 없으면 결제가 안되는 로직
// 



module.exports = {
  orderAdd,
  orderItems
  
};