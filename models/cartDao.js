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
    INSERT INTO carts (
      user_id,
      stock_id
    ) VALUES (?, ?);`,
    [ userId, stockId ]
  );

  return data;
  }
}

const getCartByUserId = async (userId) => {
  const result = await database.query(`
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

  let arr = [];
  for (let i = 0; i < result.length; i++) {
    arr.push(result[i].productId)
  }
  console.log(arr)
  // 중복제거 필요
  const uniqueArr = arr.filter((element, index) => {
    return arr.indexOf(element) === index;
});
console.log(uniqueArr);

  return result;
}

const getStockByUserId = async (userId) => {

  return await database.query(`
    SELECT
      s.product_id AS productId,
      p.name AS productName,
      s.id AS stockId,
      s.size,
      s.stock AS stockQuantity
    FROM stock s
    JOIN products p ON s.product_id = p.id
    WHERE s.product_id = (
      SELECT s.product_id
      FROM stock s
      WHERE s.id =1
    );`, [ userId ]
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