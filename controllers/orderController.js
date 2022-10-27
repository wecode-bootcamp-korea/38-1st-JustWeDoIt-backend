const { orderService } = require('../services');
const { catchAsync } = require('../utils/error');

const orderInfo = catchAsync(async (req, res) => { 
  
  const userId = req.body.userId;
  
  const orderInfo = await orderService.orderInfo(userId); 

  res.status(201).json({
    userId: userId,
    data: orderInfo
  });
});

const getCarts = catchAsync(async (req, res) => { 
  
  const userId = req.body.userId;
 
  const getCarts = await orderService.getCarts(userId); 

  res.status(201).json({
    data : getCarts 
  });
});

const orderAdd = catchAsync(async (req, res) => { 
  
  const { userId } = req.body; 
  //const  userId  = req.body;
 
  const data = await orderService.orderAdd(userId); 
  const orderInfo = await orderService.orderInfo(userId); 

  res.status(201).json({
    data : orderInfo
  });
});


module.exports = {
  orderInfo,
  getCarts,
  orderAdd
};