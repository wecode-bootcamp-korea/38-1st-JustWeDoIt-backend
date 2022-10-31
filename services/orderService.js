const orderDao = require('../models/orderDao');

const orderInfo = async (userId) => { 
  
  return await orderDao.orderInfo(userId); 
};

const orderAdd = async(userId) => {
  const orderStatusId = 1;

  const date = new Date();
  const components = [
    date.getFullYear(),
    (date.getMonth() + 1),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  ];
  const orderNumber = components.join("");
  
  const order = await orderDao.orderAdd(orderNumber, userId, orderStatusId);
  
  const getCarts = await orderDao.getCarts(userId);

  for(let Item = 0; Item < getCarts.length; Item++){
    const orderItem = await orderDao.orderItem(getCarts[Item].stockId, order.insertId, getCarts[Item].quantity);
  }
};

module.exports = {
  orderInfo,
  orderAdd
};