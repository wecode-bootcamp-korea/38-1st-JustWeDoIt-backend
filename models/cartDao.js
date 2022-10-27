const { database } = require('./dataSource');

const createCartItem = async (userId, stockId) => {

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

const stockIdToSize = async (stockId) => {
  return await database.query(`
    SELECT size
    FROM stock
    WHERE id = ?;`, [ stockId ]
  )
}

const sizeToStockId = async (productId, size) => {
  return await database.query(`
    SELECT id
    FROM stock
    WHERE product_id = ? AND size = ?;`, [ productId, size ]
  )
}

const sizeStock = async (productId) => {
  const sizeStock = await database.query(`
    SELECT
      size,
      stock
    FROM
      stock
    WHERE product_id = ?;`, [ productId ]
  )

  return sizeStock;
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

const getCartByUserId = async (userId) => {
  const cart = await database.query(`
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
      p.thumbnail_image_url AS thumbnailImage 
    FROM carts c 
    JOIN stock s ON c.stock_id = s.id 
    JOIN products p ON s.product_id = p.id 
    JOIN categories ON p.category_id = categories.id 
    JOIN special ON p.special_id = special.id 
    JOIN gender ON p.gender_id = gender.id
    WHERE c.user_id = ?;`, [ userId ]
  );

  return cart;
}

const updateCartItem = async (userId, cartId, stockId, buyingQuantity) => {
  const updatedRows = (await database.query(`
    UPDATE carts
    SET
      stock_id = ?,
      quantity = ?
    WHERE id = ? AND user_id = ?;`, [ stockId, buyingQuantity, cartId, userId ]    
  )).affectedRows
  // 변수 선언 후 실행하는 코드는 없어도 되는지?

  if (updatedRows !== 1) throw new Error('UNEXPECTED_NUMBER_OF_RECORDS_UPDATED')

  const result = await database.query(`
    SELECT *
    FROM carts
    WHERE id = ? AND user_id = ?;`, [ cartId, userId ]
    );

  return result;
}

const deleteCartItem = async (userId, stockId) => {
  return await database.query(`
      DELETE FROM carts
      WHERE user_id = ? AND stock_id = ?;`, [ userId, stockId ]
  )
}

module.exports = {
  createCartItem,
  stockIdToSize,
  sizeToStockId,
  sizeStock,
  getCartByCartId,
  getCartByUserId,
  updateCartItem,
  deleteCartItem,
}