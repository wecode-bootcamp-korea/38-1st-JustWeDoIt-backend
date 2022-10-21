const database = require('./dataSource');
const { globalErrorHandler } = require('../utils/error');

const orderInfo = async (cartId, quantity) => {
  const result = await database.query(
    `
    UPDATE 
      
    SET
        stock = stock - ?
    WHERE id = ?
    `,
    [quantity, cartId]
  );
  globalErrorHandler(result);
  return result;
};

module.exports = {
  orderInfo
};