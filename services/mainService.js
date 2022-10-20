const { mainDao } = require('../models');

const requestMain = async (offset,limit) => {
    const main = await mainDao.requestMain(offset,limit);

    return main;
}

module.exports = { requestMain };