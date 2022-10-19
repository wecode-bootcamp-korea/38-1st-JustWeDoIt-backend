const { mainDao } = require('../models');

const requestMain = async () => {
    const main = await mainDao.requestMain();

    return main;
}

module.exports = { requestMain };