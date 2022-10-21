const { orderService } = require('../services');
const { catchAsync } = require('../utils/error');

const orderInfo = catchAsync(async (req, res) => {
  const userId = req.user;
  const { productOptionId, quantity } = req.body;
  await orderService.orderInfo(productOptionId, quantity);

  res.status(201).json({
    userId: userId,
    productOptionId: productOptionId,
  });
});

const CartIterm = catchAsync(async (req, res) => {
  const userId = req.user;
  const result = await orderService.CartIterm(userId);

  res.status(200).json({
    userId: userId,
    orderNumber: result,
  });
});

module.exports = {
    orderInfo,
    CartIterm,
};