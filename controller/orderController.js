const { orderService } = require('../services');
const { catchAsync } = require('../utils/error');

const orderAdd = catchAsync(async (req, res) => { 
  
  const { orderId } = req.body;
  const userId = req.user;
 
  const orderInfo = await orderService.orderAdd(orderId);

  res.status(201).json({
    userId: userId,
    data: orderInfo
  });
});

const orderItems = catchAsync(async (req, res) => { 
  
  const { orderId } = req.body;
  const userId = req.user;
 
  const orderInfo = await orderService.orderItems(orderId);

  res.status(201).json({
    userId: userId,
    data: orderInfo
  });
});

const shippingInfo = catchAsync(async (req, res) => { 
  
  const { orderId, addresseeName, addresseeAddress, company, trackingNumber, shippingStatusId} = req.body;
  const userId = req.user;
 
  const orderInfo = await orderService.shippingInfo(orderId,addresseeName, addresseeAddress, company, trackingNumber, shippingStatusId);

  res.status(201).json({
    userId: userId,
    data: orderInfo
  });
});

const cartsDelete = catchAsync(async (req, res) => { 
  
  const { cartId } = req.body;
  const userId = req.user;
 
  const orderInfo = await orderService.userPoint(cartId);

  res.status(201).json({
    userId: userId,
    data: orderInfo
  });
});

const userPoint = catchAsync(async (req, res) => { 
  
  const { orderId } = req.body;
  const userId = req.user;
 
  const orderInfo = await orderService.cartsDelete(orderId);

  res.status(201).json({
    userId: userId,
    data: orderInfo
  });
});

const stockSubtract = catchAsync(async (req, res) => { 
  
  const { orderId } = req.body;
  const userId = req.user;
 
  const orderInfo = await orderService.stockSubtract(orderId);

  res.status(201).json({
    userId: userId,
    data: orderInfo
  });
});
// 유저의 구매 정보 보내주기
// 주문번호 출력

module.exports = {
  orderAdd,
  orderItems,
  shippingInfo,
  userPoint,
  cartsDelete,
  stockSubtract
};