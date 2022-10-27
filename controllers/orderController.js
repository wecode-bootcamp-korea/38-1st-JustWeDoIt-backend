const { orderService } = require('../services');
const { catchAsync } = require('../utils/error');

const orderInfo = catchAsync(async (req, res) => { 
  
  //const userId = req.user;
 
  const orderInfo = await orderService.orderInfo(userId); 

  res.status(201).json({
    userId: userId,
    data: orderInfo
  });
});

const getCarts = catchAsync(async (req, res) => { 
  
  //const userId = req.user;
 
  const getCarts = await orderService.getCarts( userId); 

  res.status(201).json({
    userId: userId
  });
});

const orderAdd = catchAsync(async (req, res) => { 
  
  const { getCarts, orderNumber, userId, orderStatusId } = req.body; 
  //const userId = req.user;
 
  const orderAdd = await orderService.orderAdd( userId); 

  res.status(201).json({
    userId: userId
  });
});

const orderItem = catchAsync(async (req, res) => { 
  
  const { stockId, orderId, quantity } = req.body; 
  //const userId = req.user;
 
  const orderItem = await orderService.orderItem( userId); 

  res.status(201).json({
    userId: userId
  });
});

module.exports = {
  orderInfo,
  getCarts,
  orderAdd,
  orderItem
};