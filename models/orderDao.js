const { database } = require('./dataSource');

const orderInfo = async ( userId ) => { 
  const orderInfo = await database.query( 
    `
    SELECT 
      p.id AS productId,
      p.name AS productName,
      p.thumbnail_image_url AS ProductThumbnailImageUrl,
      p.price AS productPrice,
      s.size AS Size,
      oi.quantity AS quantity

      FROM orders o
      JOIN order_items oi ON oi.order_id = o.id
      JOIN stock s ON oi.stock_id = s.id
      JOIN products p ON s.product_id = p.id
      WHERE user_id = ?
     `,[userId]
  );
   return orderInfo;
};
  
const getCarts = async(userId) => {
    return await database.query(`
        SELECT
            user_id,
            stock_id,
            quantity
        FROM carts
        WHERE user_id=?;`,[userId]
    );
};

const orderAdd = async ( getCarts, orderNumber, userId, orderStatusId ) => { 
  for(var baseNumber=0; baseNumber<gorderNumbeetCarts.length; baseNumber++){
    const orderAdd = await queryRunner.query(
 
    `INSERT INTO orders
      (
        order_number AS orderNumber,
        user_id AS userId,
        order_status_id AS orderStatusId
      )
      VALUES ( ?, ?, ? )
      `,[getCarts[baseNumber].orderNumber, userId, getCarts[baseNumber].orderStatusId]
      );
      return orderAdd
}; 

const orderItem = async ( stockId, orderId, quantity ) => {
  const orderItem = await database.query(
    `INSERT INTO order_items
      (
        stock_id,
        order_id,
        quantity
      )
      VALUES ( ?, ?, ? )
    `,[ stockId, orderId, quantity ]
  );
  return orderitem
};

module.exports = {
  orderInfo,
  getCarts,
  orderAdd,
  orderItem  
};
