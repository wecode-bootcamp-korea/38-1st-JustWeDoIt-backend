const { orderService } = require('../services');
const { catchAsync } = require('../utils/error');

const orderInfo = catchAsync(async (req, res) => { 
  
  const { userId } = req.body;
  
  const orderInfo = await orderService.orderInfo(userId); 

  res.status(201).json({
    userId: userId,
    data: orderInfo
  });
});

const orderAdd = catchAsync(async (req, res) => { 
  
  const { userId } = req.body; 
 
  await orderService.orderAdd(userId); 
  const orderInfo = await orderService.orderInfo(userId); 

  res.status(201).json({
    data : orderInfo
  });
});


module.exports = {
  orderInfo,
  orderAdd
};