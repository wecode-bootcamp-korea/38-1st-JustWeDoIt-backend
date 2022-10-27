const { orderDao } = require('../models/orderDao');

const orderInfo = async (userId) => { 
  return await orderDao.orderInfo(userId); 


const getCarts = async (userId) => { 
  if (!user_id || !cart_id) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }

  return await orderDao.getCarts(userId); 
};

const orderAdd = async (userId) => {
  const date = new Date();
  const components = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
];
  const orderId = components.join(“”);
  }

  return await orderDao.orderAdd(userId);
};

const orderInfo = async (userId) => { 
  if (!user_id || !order_id) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }

  return await orderDao.orderInfo(userId); 
};

const orderItem = async (userId) => { 
  if (!user_id || !order_id) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }

  return await orderDao.orderItem(userId); 
};

module.exports = {
  orderInfo,
  getCarts,
  orderAdd,
  orderItem
};