const { orderService } = require('../services');
const { catchAsync } = require('../utils/error');

const orderAdd = catchAsync(async (req, res) => { 
  
  const { cartItem } = req.body;
  const userId = req.user;
 
  const orderInfo = await orderService.orderAdd(cartItem);

  res.status(201).json({
    userId: userId,
    data: orderInfo
  });
});


module.exports = {
    orderAdd
};