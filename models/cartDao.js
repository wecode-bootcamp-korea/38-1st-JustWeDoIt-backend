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
    const data = await database.query(`
    INSERT INTO carts (0
      user_id,
      stock_id
    ) VALUES (?, ?);`,
    [ userId, stockId ]
  );

  return data;
  }
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

  const cartObj = JSON.parse(JSON.stringify(cart));
  const productId = cartObj.productId

  // size : stock 
  // 객체 만들고 데이터 안에 끼워서 응답

  return result;
}

const getStockByUserId = async (userId) => {
  const stockId = await database.query(`
    SELECT c.stock_id
    FROM carts c
    WHERE user_id = ?;`, [ userId ]
  );
  const stockIdObj = JSON.parse(stockId);

  const productId = await database.query(`
    SELECT s.product_id
    FROM stock s
    WHERE id = ?;`, [ stockIdObj ]
  );
  const productIdObj = JSON.parse(productId);
  // productIdObj 안에 있는 숫자 값들이 (1, 2, 10) 형태로 들어가야 함

  return await database.query(`
    SELECT
      size,
      stock
    FROM stock
    WHERE product_id IN (?);`, [ productIdObj ]
  );
}

const updateCartItem = async (userId, cartId, stockId, quantity) => {
  const updatedRows = (await database.query(`
    UPDATE carts
    SET
      stock_id = ?,
      quantity = ?
    WHERE id = ?, user_id = ?;`, [ stockId, quantity, cartId, userId ]    
  )).affectedRows
  // 변수 선언 후 실행하는 코드는 없어도 되는지?

  if (updatedRows !== 1) throw new Error('UNEXPECTED_NUMBER_OF_RECORDS_UPDATED')

  const result = await database.query(`
    SELECT *
    FROM carts
    WHERE id = ?, user_id = ?;`, [ cartId, userId ]
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
  getCartByUserId,
  getStockByUserId,
  updateCartItem,
  deleteCartItem,
}