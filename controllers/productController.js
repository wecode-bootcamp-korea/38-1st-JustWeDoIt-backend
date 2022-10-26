const { productService } = require('../services');
const { catchAsync } = require('../utils/error');

const getProducts = catchAsync(async ( req, res ) => {
    const { offset, limit, size, gender, special, price, ordering } = req.query;

    const main = await productService.getProducts(+offset, +limit, size, gender, special, price, ordering );
    res.status(200).json(main);
});

const getProduct = catchAsync(async (req, res) => {
    const productId = req.params.id;
    const data = await productService.getProduct(productId);

    res.status(200).json( data );
})

const categoryFilter = catchAsync( async ( req, res ) => {
    const { categoryId } = req.params;
    const categoryFilter = await productService.categoryFilter(categoryId);

    res.status(201).json(categoryFilter);
})

module.exports = { getProducts, requestAllMain,categoryFilter };