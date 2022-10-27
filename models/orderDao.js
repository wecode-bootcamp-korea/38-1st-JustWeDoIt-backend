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
      oi.quantity AS quantity,
      u.point AS point

      FROM orders o
      JOIN order_items oi ON oi.order_id = o.id
      JOIN stock s ON oi.stock_id = s.id
      JOIN products p ON s.product_id = p.id
      JOIN users u ON o.user_id = u.id
      WHERE u.id = ?
     `,[userId]
  );
   return orderInfo;
};
  
const getCarts = async(userId) => {
    return await database.query(`
        SELECT
            user_id AS userId,
            stock_id AS stockId,
            quantity 
        FROM carts
        WHERE user_id=?;`,[userId]
    );
};

const orderAdd = async ( orderNumber, userId, orderStatusId ) => { 
    const orderAdd = await database.query(
 
    `INSERT INTO orders
      (
        order_number,
        user_id,
        order_status_id
      )
      VALUES ( ?, ?, ? )
      `,[orderNumber, userId, orderStatusId]
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
  return orderItem
};
const findOrderProducts = async (orderId) => {
  const result =await database.query(`
    SELECT
      p.name,
      p.thumbnail_image_url AS image,
      p.price,
      p.id AS productId,
      s.id
    FROM order_items oi
    JOIN stock s ON s.id = oi.stock_id
    JOIN products p ON p.id = s.product_id
    WHERE oi.order_id = 18
  `, [orderId])
  console.log(result)
  return result;
}
module.exports = {
  orderInfo,
  getCarts,
  orderAdd,
  orderItem,
  findOrderProducts
};
