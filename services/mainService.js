const { mainDao } = require('../models');

const requestMain = async (offset, limit, size, gender, special, price, headerFilter ) => {
    //offset limit number 형변환
    const numberOffset = Number(offset)
    const numberLimit = Number(limit)

    // const sizeArray = size.split(','); // size query parameter 배열로 만들기
    // sizeArray.map(x=>parseInt(x)); // 배열 요소들 number로 형변환

    // const genderArray = gender.split(',');
    // const specialArray = special.split(',');
    // const priceArray = price.split(',');
    


    const main = await mainDao.requestMain(numberOffset, numberLimit,size, gender, special, price, headerFilter);

    return main;
}

const requestAllMain = async ()=>{
        return await mainDao.requestAllMain();
}

module.exports = { requestMain,requestAllMain };