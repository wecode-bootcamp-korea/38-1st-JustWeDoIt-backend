const { moveProductDao } = require('../models')

const requestProduct = async (productId) => {
    const data = await moveProductDao.requestProduct(productId);

    return data;
}

module.exports = { requestProduct }
