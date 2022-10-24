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

module.exports = { requestMain, requestAllMain};

// ?size=[240,250]&gender=man,woman&special='친환경소재'
// ?size=[240,250]&gender=man,woman
// ?gender=man,woman