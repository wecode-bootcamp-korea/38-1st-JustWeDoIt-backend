const { mainService } = require('../services');
const { catchAsync } = require('../utils/error');

const requestMain = catchAsync(async ( req, res ) => {
    const main = await mainService.requestMain();

    res.status(200).json({data: main});
});

module.exports = { requestMain };