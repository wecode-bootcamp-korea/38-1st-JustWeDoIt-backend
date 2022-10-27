const { moveProductDao } = require('../models')

const requestProduct = async (productId) => {
    const data = await moveProductDao.requestProduct(productId);
    const productImage = await moveProductDao.productImages(productId);
    const sizeStock = await moveProductDao.sizeStock(productId);
    const productImageArray = [];
    const sizeStockObject = {};
    const sizeStockArray = [];

    for(let j=0;j<sizeStock.length;j++){
        sizeStockObject[sizeStock[j].size] = sizeStock[j].stock;
    }
    sizeStockArray.push(sizeStockObject);

    for(let i=0;i<productImage.length;i++){
        productImageArray.push(productImage[i].image_url)
    }
    for(let i=0; i<data.length;i++){
    data[i].urlImage = productImageArray
    data[i].sizeStock = sizeStockArray;
    }
    

    
    return data;
}

module.exports = { requestProduct }
