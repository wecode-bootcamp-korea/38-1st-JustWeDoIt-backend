const { database } = require('./dataSource');

const createCart = async (userId, stockId) => {
  const [ stockList ] = await database.query(`
    SELECT EXISTS (
      SELECT *
      FROM carts
      WHERE user_id = ? AND stock_id = ?);`,
    [ userId, stockId ]
  );
    
  if (+Object.values(stockList)) {
    return await database.query(`
      UPDATE carts 
      SET quantity = quantity + 1
      WHERE user_id = ? AND stock_id = ?;`, [ userId, stockId ]
    )
  } else {
    return await database.query(`
      INSERT INTO carts (
        user_id,
        stock_id
      ) VALUES (?, ?);`,
      [ userId, stockId ]
    );
  }
}

const getCartByCartId = async (cartId) => {
  return await database.query(`
    SELECT
      c.id AS cartId,
      c.user_id AS userId,
      c.stock_id AS stockId,
      s.size,
      c.quantity AS buyingQuantity
    FROM carts c
    JOIN stock s ON c.stock_id = s.id
    WHERE c.id = ?;`, [ cartId ]
  )
}

const getCartsByUserId = async (userId) => {
  return await database.query(`
    SELECT
      c.id AS cartId,
      c.user_id AS userId, 
      c.stock_id AS stockId,
      p.id AS productId,
      p.name AS productName, 
      p.price, 
      c.quantity AS buyingQuantity,
      s.stock AS stockQuantity, 
      s.size, 
      categories.name AS category, 
      special.name AS special, 
      gender.gender, 
      p.thumbnail_image_url AS thumbnailImage,
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT(
          "stockId", stock.id,
          "size", stock.size,
          "stock", stock.stock
        ))
        FROM stock
        JOIN products ON stock.product_id = products.id
        WHERE products.id = p.id
        GROUP BY products.id
      ) AS stockInfo
    FROM carts c 
    JOIN stock s ON c.stock_id = s.id 
    JOIN products p ON s.product_id = p.id 
    JOIN categories ON p.category_id = categories.id 
    JOIN special ON p.special_id = special.id 
    JOIN gender ON p.gender_id = gender.id
    WHERE c.user_id = ?;`, [ userId ]
  );
}

const updateCart = async (userId, cartId, stockId, buyingQuantity) => {

  const updatedRows = (await database.query(`
    UPDATE carts
    SET
      stock_id = ?,
      quantity = ?
    WHERE id = ? AND user_id = ?;`, [ stockId, buyingQuantity, cartId, userId ]    
  )).affectedRows

  if (updatedRows !== 1) throw new Error('UNEXPECTED_NUMBER_OF_RECORDS_UPDATED')

  return getCartsByUserId(userId);
}

const deleteCart = async (userId, cartId) => {
  return await database.query(`
      DELETE FROM carts
      WHERE user_id = ? AND id = ?;`, [ userId, cartId ]
  )
}

module.exports = {
  createCart,
  getCartByCartId,
  getCartsByUserId,
  updateCart,
  deleteCart,
}