const productDao = require('../models/productDao');

const getStockByProductId = async (productId) => {
  return await productDao.getStockByProductId(productId)
}

module.exports = {
  getStockByProductId,
}