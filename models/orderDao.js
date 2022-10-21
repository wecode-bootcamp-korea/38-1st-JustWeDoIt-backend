const database = require('./dataSource');
const { affectedRowsErrorHandler } = require('../utils/error');

const orderInDetail = async (productOptionId, quantity) => {
  const result = await database.query(
    `
    UPDATE 
        product_options
    SET
        stock = stock - ?
    WHERE id = ?
    `,
    [quantity, productOptionId]
  );
  affectedRowsErrorHandler(result);
  return result;
};

const orderInCart = async (userId) => {
  const queryRunner = database.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const result1 = await queryRunner.query(
      `
      UPDATE
          product_options po
      JOIN carts c
          ON c.product_option_id = po.id
      SET
          po.stock = po.stock - c.quantity
      WHERE c.user_id = ?
      `,
      [userId]
    );

    const result = await queryRunner.query(
      `
      DELETE
      FROM carts
      WHERE user_id = ?
      `,
      [userId]
    );

    await queryRunner.commitTransaction();
    await queryRunner.release();
    return result1.affectedRows;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
  }
};

const checkCartForOrder = async (userId) => {
  const result = await database.query(
    `
    SELECT
        c.product_option_id AS productOptionId,
        c.quantity,
        po.stock
    FROM carts c
    JOIN product_options po
    ON c.product_option_id = po.id
    WHERE user_id = ?
    `,
    [userId]
  );
  return result;
};

module.exports = {
  orderInDetail,
  orderInCart,
  checkCartForOrder,
};