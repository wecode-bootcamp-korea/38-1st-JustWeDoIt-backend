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
    const { offset, limit } = req.query;
    console.log(offset, limit)
    const { id } = req.params;
    console.log(id)
    const categoryFilter = await productService.categoryFilter( id, offset, limit );
    
    res.status(201).json(categoryFilter);
})
module.exports = { getProducts, requestAllMain,categoryFilter };