const { productDao } = require('../models');

const getProducts = async (offset, limit, size, gender, special, price, headerFilter ) => {

    const numberOffset = Number(offset)
    const numberLimit = Number(limit)

    const main = await productDao.getProducts(numberOffset, numberLimit,size, gender, special, price, headerFilter);

    return main;
}

const requestAllMain = async ()=>{
        return await productDao.requestAllMain();
}

const categoryFilter = async (categoryId) => {
        return await productDao.categoryFilter(categoryId);
}
module.exports = { getProducts,requestAllMain,categoryFilter };
