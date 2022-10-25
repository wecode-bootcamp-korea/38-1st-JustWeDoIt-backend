const { productService } = require('../services');
const { catchAsync } = require('../utils/error');

const getProducts = catchAsync(async ( req, res ) => {


    const { offset, limit, size, gender, special, price, headerFilter } = req.query;

    const main = await productService.getProducts(offset, limit, size, gender, special, price, headerFilter );
    res.status(200).json(main);
});

const requestAllMain = catchAsync(async ( req, res )=> {
    const main = await productService.requestAllMain();

    res.status(201).json(main);
})

const categoryFilter = catchAsync( async ( req, res ) => {

    const { categoryId } = req.params;
    console.log(categoryId)
    const categoryFilter = await productService.categoryFilter(categoryId);
    res.status(201).json(categoryFilter);
})
module.exports = { getProducts, requestAllMain,categoryFilter };