const {database} = require('./dataSource');


const requestMain = async ( offset, limit, size, gender, special, price ,headerFilter) => {

    const main = await database.query(
        `
            SELECT 
                products.id,
                products.name,
                products.thumbnail_image_url AS thumbnailImageUrl,
                products.price,
                c.name AS category,
                s.name AS special,
                g.gender AS gender
            FROM products
            JOIN categories c ON products.category_id=c.id
            JOIN special s ON products.special_id=s.id
            JOIN gender g ON products.gender_id=g.id
            ORDER BY products.id LIMIT ? OFFSET ? 
            `
            ,[ limit, offset ]
    )

    return main;
}

const requestAllMain = async () => {
    return await database.query(
        `
        SELECT 
                products.id,
                products.name,
                products.thumbnail_image_url AS thumbnailImageUrl,
                products.price,
                c.name AS category,
                s.name AS special,
                g.gender AS gender
            FROM products
            JOIN categories c ON products.category_id=c.id
            JOIN special s ON products.special_id=s.id
            JOIN gender g ON products.gender_id=g.id
            ORDER BY products.id
        `
    )
}

module.exports = { requestMain,requestAllMain };