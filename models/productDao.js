const { database } = require('./dataSource');

const getStockByProductId = async (productId) => {
  return await database.query(`
    SELECT
      s.product_id AS productId,
      p.name AS productName,
      s.id AS stockId,
      s.size,
      s.stock AS stockQuantity
    FROM stock s
    JOIN products p ON s.product_id = p.id
    WHERE s.product_id = ?;` [ productId ]
  );
}

module.exports = {
  getStockByProductId,
}