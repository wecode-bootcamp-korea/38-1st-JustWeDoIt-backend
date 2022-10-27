const userController= require('./userController')
const productController = require('./productController');
const moveProductController = require('./moveProductController');
const cartController = require('./cartController');
const orderController = require('./orderController');

module.exports = { 
	userController,
	productController, 
	moveProductController,
	cartController,
	orderController
}