const { mainService } = require('../services');
const { catchAsync } = require('../utils/error');

const requestMain = catchAsync(async ( req, res ) => {

    const offset = await req.query.offset;
    const limit = await req.query.limit;

    const main = await mainService.requestMain(offset,limit);
    res.status(200).json(main);
});

module.exports = { requestMain };