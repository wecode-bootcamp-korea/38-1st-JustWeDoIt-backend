const { orderService } = require('../services');
const { catchAsync } = require('../utils/error');

const orderInfo = catchAsync(async (req, res) => { 
  const { cartId, quantity } = req.body;
  const userId = req.user;
 
  const a = await orderService.orderInfo(cartId, quantity);

  res.status(201).json({
    userId: userId,
    data: a,
  });
});


module.exports = {
    orderInfo
};