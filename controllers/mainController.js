const { mainService } = require('../services');
const { catchAsync } = require('../utils/error');

const requestMain = catchAsync(async ( req, res ) => {


    const { offset, limit, size, gender, special, price, headerFilter } = req.query;

    const main = await mainService.requestMain(offset, limit, size, gender, special, price, headerFilter );
    res.status(200).json(main);
});

const requestAllMain = catchAsync(async ( req, res )=> {
    const main = await mainService.requestAllMain();

    res.status(201).json(main);
})

const categoryFilter = catchAsync( async ( req, res ) => {

    const { categoryId } = req.params;
    console.log(categoryId)
    const categoryFilter = await mainService.categoryFilter(categoryId);
    res.status(201).json(categoryFilter);
})
module.exports = { requestMain, requestAllMain,categoryFilter };
