const { productService } = require('../services')
const { catchAsync } = require('../utils/error');


const requestProduct = catchAsync(async (req, res) => {

    const productId = req.query.id;

    const data = await productService.requestProduct(productId);

    res.status(200).json( data );
})

module.exports = { requestProduct }