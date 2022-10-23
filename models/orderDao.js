const database = require('./dataSource');

const { globalErrorHandler } = require('../utils/error');

const orderAdd = async ( user_id, order_id ) => { //주문에 넣어주기
  const result = await database.query(
    `
    INSERT INTO orders
    (
      order_number,
      order_status_id
    )
    VALUES ( ?, ? );
    `,[ user_id, order_id ]
  );
  globalErrorHandler(result);
  return result.insertId;
};

const orderItems = async (userId) => { //주문상품 조회
  const result = await database.query(
    `
    SELECT 
      p.id AS productId,
      p.name AS productName,
      p.thumbnail_image_url AS ProductThumbnailImageUrl,
      p.price AS productPrice,
      s.size AS Size,
      oi.quantity AS quantity

      FROM products p
      JOIN stock s ON s.product_id = p.id
      JOIN order_items oi ON oi.stock_id = s.id
      JOIN order o s ON oi.order_id = o.id
      JOIN users u s ON o.user_id = u.id
      JOIN order_status os ON o.order_status_id = os.id
      JOIN carts c s ON c.stock_id = s.id
      WHERE user_id = ?
    `,[userId]
  );
  globalErrorHandler(result);
  return result;
};

const shippingInfo = async (userId) => { //수취인
  const result = await database.query(
    `
    INSERT INTO shipments
    (
      order_id AS orderId,
      addressee_name AS addressName,
      addressee_address AS address,
      addressee_phone_number AS addressPhoneNumber,
      company,
      tracking_number AS trackingNumber,
      shipping_status_id 
    )
    VALUES ( ?, ?, ?, ?, ?, ?, ? )
    WHERE user_id = ?;
    `,[userId]
  );
  return result;
};
    


module.exports = {
  orderAdd,
  orderItems,
  shippingInfo 
  
};
