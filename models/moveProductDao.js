const { database }= require('./dataSource');

const requestProduct = async (productId) => {
    const data = await database.query(`
        SELECT 
            p.id,
            p.name AS productName,
            p.description,
            p.price,
            i.image_url AS imageUrl,
            c.name AS category,
            s.name AS special,
            g.gender,
            t.size,
            t.stock
        FROM products p
        JOIN categories c ON p.category_id = c.id
        JOIN special s ON p.special_id = s.id
        JOIN gender g ON p.gender_id = g.id
        JOIN product_images i ON p.id = i.product_id
        JOIN stock t ON p.id = t.product_id
        WHERE p.id = ?
    `,
    [productId])

    return data;
}

module.exports = { requestProduct }