const database = require('./dataSource');

const { globalErrorHandler } = require('../utils/error');

const orderAdd = async ( userId, orderId ) => { //주문에 넣어주기
  const result = await database.query(
    `
    INSERT INTO orders
    (
      order_number,
      order_status_id
    )
    VALUES ( ?, ? );
    `,[ userId, orderId ]
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

const shippingInfo = async (userId, orderId, addresseeName, addresseeAddress, company, trackingNumber, shippingStatusId )=> { //수취인 입력
  const result = await database.query(
    `
    INSERT INTO shipments
    (
      order_id AS orderId,
      addressee_name AS addresseeName,
      addressee_address AS addresseeAddress,
      addressee_phone_number AS addressPhoneNumber,
      company,
      tracking_number AS trackingNumber,
      shipping_status_id AS shippingStatusId
    )
    VALUES ( ?, ?, ?, ?, ?, ?, ? )
    WHERE user_id = ?;
    `,[userId, orderId, addresseeName, addresseeAddress, company, trackingNumber, shippingStatusId]
  );
  return result;
};

const cartsDelete = async (userId, cartId) => { //카트 삭제
  const result = await database.query(
    `
    DELETE

    FROM carts

    WHERE user_id = ? AND cart_id =?

    `,[userId,cartId]
  );
  return result;
};


const userPoint = async (userId, totalPoint) => { //포인트 차감
  const result = await database.query(
    `
    UPDATE users

    SET point = point -?tlsdls753/@
    

    WHERE user_id = ? AND 상품

    `,[userId, totalPoint]
  );
  return result;
};
    
const stockSubtract = async (userId) => { //수량 차감
  const result = await database.query(
    `
    UPDATE stock s
    SET s.stock = stock - oi.quantity = ?
    WHERE
    join order_items oi stock_id = s.product_id


      SELECT
      u.id,
      s.id,
      p.id,
      o.user_id,
      oi.order_id,
      oi.stock_id,
      s.product_id
      FROM stock s
      JOIN products p ON s.product_id = p.id
      JOIN order_items oi ON oi.stock_id = s.id
      JOIN orders o ON oi.order_id = o.id
      JOIN users u ON s.product_id = p.id)
  
    `,[userId]
  );
  return result;
};

module.exports = {
  orderAdd,
  orderItems,
  shippingInfo,
  userPoint,
  cartsDelete,
  stockSubtract
  
};
