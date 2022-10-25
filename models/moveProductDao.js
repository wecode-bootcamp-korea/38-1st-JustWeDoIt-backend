const { database }= require('./dataSource');

const productImages = async (productId) => {
    const productImages = await database.query(
        `
        select image_url from product_images WHERE product_id=? group by image_url;
        `,[productId]
    )

    return productImages;
}

const sizeStock = async (productId) => {
    const sizeStock = await database.query(
        `
        SELECT
            size,
            stock
        FROM
            stock
        WHERE product_id = ?
        `,[productId]
    )
    
    return sizeStock;
}

// JSON_OBJECT() !! or JSON_ARRAY
const requestProduct = async (productId) => {
    const data = await database.query(
        `
        SELECT DISTINCT
            p.id AS productId,
            p.name AS productName,
            p.description,
            p.price,
            c.name AS category,
            s.name AS special,
            g.gender,
            p.thumbnail_image_url AS thumbnailImage,
            stock.id AS stockId
        FROM products p
        JOIN categories c ON p.category_id = c.id
        JOIN special s ON p.special_id = s.id
        JOIN gender g ON p.gender_id = g.id
        JOIN product_images i ON p.id = i.product_id
        JOIN stock ON p.id = stock.product_id
        WHERE p.id = ?
    `
    ,
    [productId])

    return data;
}

module.exports = { requestProduct , productImages, sizeStock }






// imageUrl : 1url,2url