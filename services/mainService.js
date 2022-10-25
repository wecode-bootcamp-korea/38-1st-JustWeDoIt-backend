const { mainDao } = require('../models');

const requestMain = async (offset, limit, size, gender, special, price, headerFilter ) => {

    const numberOffset = Number(offset)
    const numberLimit = Number(limit)

    const main = await mainDao.requestMain(numberOffset, numberLimit,size, gender, special, price, headerFilter);

    return main;
}

const requestAllMain = async ()=>{
        return await mainDao.requestAllMain();
}

const categoryFilter = async (categoryId) => {
        return await mainDao.categoryFilter(categoryId);
}
module.exports = { requestMain,requestAllMain,categoryFilter };
