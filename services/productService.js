const { productDao } = require('../models');

const getProducts = async (offset, limit, size, gender, special, price, headerFilter ) => {
        const products = await productDao.getProducts(offset, limit, size, gender, special, price, headerFilter);
        
        return main;
}

const requestAllMain = async ()=>{
        return await productDao.requestAllMain();
}

const categoryFilter = async (categoryId) => {
        return await productDao.categoryFilter(categoryId);
}

const getProduct = async (productId) => {
        return await productDao.getProductById(productId);
}

module.exports = { getProducts,requestAllMain,categoryFilter };
