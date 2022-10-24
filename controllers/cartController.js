const cartService = require('../services/cartService');
const { catchAsync } = require('../utils/error');

const createCartItem = async (req, res) => {
  // const userId = req.user;
  const userId = req.params.userId;
  const stockId = req.params.stockId;

  if (!stockId) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  const data = await cartService.createCartItem(userId, stockId);

  return res.status(201).json({ 
    message : 'CART_ITEM_CREATED',
    data : data 
  });
}

const getCartItem = async (req, res) => {
  // const userId = req.user;
  const userId = req.params.userId;

  const data = await cartService.getCartByUserId(userId);

  let stockList = [];
  let stockInfo = {};
  
  for (let i = 0; i < data.length; i++) {
    stockList = await cartService.sizeStock(data[i].productId);

    stockList !== 0 &&
    stockList.map((el) => {
      const {size, stock} = el;
      
      stockInfo = {...stockInfo,
        [size] : stock
      }
    })

    data[i].stockInfo = stockInfo
  }

  return res.status(200).json({ 
    message : 'SUCCESS',
    data : data
  });
}

const updateCartItem = async (req, res) => {
  // const userId = req.user.id;
  const userId = req.params.userId;
  const { cartId, stockId, quantity } = req.body;

  const data = await cartService.updateCartItem(userId, cartId, stockId, quantity);

  return res.status(201).json({
    message : 'SUCCESS',
    data : data 
  });
}

const deleteCartItem = async (req, res) => {
  // const userId = req.user;
  const userId = req.params.userId;
  const stockId = req.params.stockId;

  if (!stockId) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await cartService.deleteCartItem(userId, stockId);

  return res.status(204);
}

module.exports = {
  createCartItem,
  getCartItem,
  updateCartItem,
  deleteCartItem
}