const express = require('express');
const { orderController } = require('../controllers'); // 객체로 담겨있으면 객체로 해줘야한다, 불러올 로직을 담아준다.
const { loginRequired } = require('../utils/auth');

const router = express.Router();

router.post('/:productid', loginRequired, orderController.orderAdd); // 파람스를 쓸려면 값을 넣어줘야한다.
router.get('', orderController.orderItems);
// router.post('', loginRequired, orderController.shippingInfo);
// router.delete('', loginRequired, orderController.cartsDelete);
// router.patch('', loginRequired, orderController.stockSubtract);
//router.post('/info',  loginRequired, orderController.orderInfo); post, get 인지 고민
module.exports = router;

