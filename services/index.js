const productService = require('./productService');
const moveProductService = require('./moveProductService');
const userService = require('./userService')
const orderService = require('./orderService');

module.exports = { 
	userService,
	moveProductService,
	productService,
	orderService
}

