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

const categoryFilter = async (id , offset , limit ) => {

        let numberOffset = Number(offset);
        let numberLimit = Number(limit);
        
        return await productDao.categoryFilter(id , numberOffset , numberLimit );
}

const getStockByProductId = async (productId) => {
  return await productDao.getStockByProductId(productId)
}

module.exports = { getProducts,requestAllMain,categoryFilter,getStockByProductId };
