const { database } = require('./dataSource');

const getProducts = async ( offset, limit, size, gender, special, price ,headerFilter) => {
    const whereTrigger = async (size, gender, special, price) => {
        if( size ||  gender || special || price ){
            return ` WHERE `;
        }
        else{
            return ``
        }
    }

    const sizeJoin = async (size)=>{
        if(size){
            return`JOIN stock k ON products.id=k.product_id`
        }
        if(!size){
            return ``
        }
    }

    const sizeFilter = async (size) => {
        if(size){
            if(gender || special || price){
                return ` AND k.size IN (${size})`
            }
            if(!gender && !special && !price){
                return ` k.size IN (${size})`
            }
        }
        if(!size){
            return ``
        }
    }

    const genderFilter = async (gender) => {

        switch(gender){
        
            case `남성용`:
                return ` g.id=2 `
            case `여성용`:
                return ` g.id=3 `
            case `공용`:
                return ` g.id=1 `
            case `남성용,여성용`:
                return `g.id=2 OR g.id=3`
            case `남성용,공용`:
                return `g.id=2 OR g.id=1`
            case `여성용,공용`:
                return `g.id=1 OR g.id=3`
            default:
                return ``
        } 
    }
    const specialFilter = async (special) => {
        switch(special){
          case `친환경`:
                if(gender) return ` AND s.id=1 `
                if(!gender) return ` s.id=1`
          case `환경파괴소재`:
                if(gender) return ` AND s.id=2`
                if(!gender) return ` s.id=2`
          default:
              return ``
        }
      }
    const priceFilter = async (price) =>{
        if(!price){
            return ``
        }
        let priceCount = price.split('~')

        if(priceCount.length <= 2){
        let a = price.replace('~','AND')
        if(gender || special){
        return ` AND products.price BETWEEN ${a} `
        }else{
            return `products.price BETWEEN ${a}`
        }
        }
        


        if (priceCount.length > 2){
        const firstSpace = price.indexOf(' ');
        const lastSpace = price.lastIndexOf(' ');
       
        let result = price.replace(price.slice(firstSpace,lastSpace),'');
        let realResult = result.replace(' ',' AND ');
        if(gender || special){
            return ` AND products.price BETWEEN ${realResult}`
        }
        else{
            return ` products.price BETWEEN ${realResult}`
        }
       
        }
    }
    const headerFilterFilter = async (headerFilter) => {
        switch(headerFilter){
          case `lowPrice`:
            return `price asc,`;
          case `highPrice` :
            return `price desc,`;
          case `recent`:
            return `id asc, `;
          default:
            return ``
        }
      }

    const sizeJoinAsync = await sizeJoin(size);
    const sizeFilterAsync = await sizeFilter(size);
    const genderFilterAsync = await genderFilter(gender);
    const specialFilterAsync = await specialFilter(special);
    const priceFilterAsync = await priceFilter(price);
    const headerFilterFilterAsync = await headerFilterFilter(headerFilter);
    const whereTriggerAsync = await whereTrigger(size, gender, special, price);

    const whereStringArray = [];
    whereStringArray.push(genderFilterAsync,specialFilterAsync,priceFilterAsync);

    for(let i=whereStringArray.length-1;i>=0;i--){
        if(whereStringArray[i] === ''||""||``){
            whereStringArray.splice(i,1);
        }
    }

    let whereString = whereStringArray.toString();
    let realWhereString = whereString.replaceAll(',','');
    let resultWhereWhithoutSize = realWhereString.replaceAll(',',' AND ');

    let resultWhere = resultWhereWhithoutSize.concat(sizeFilterAsync);


    const main = await database.query(
        `
            SELECT DISTINCT
                products.id,
                products.name,
                products.thumbnail_image_url AS thumbnailImageUrl,
                products.price,
                c.name AS category,
                s.name AS special,
                g.gender AS gender,
                products.price AS price
            FROM products
            JOIN categories c ON products.category_id=c.id
            JOIN special s ON products.special_id=s.id
            JOIN gender g ON products.gender_id=g.id
            ${sizeJoinAsync}
            ${whereTriggerAsync}${resultWhere}
            ORDER BY ${headerFilterFilterAsync} products.id LIMIT ? OFFSET ? 
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


const categoryFilter = async (id , offset , limit ) => {
    return await database.query(`
    SELECT
        products.id AS id,
        products.name AS name,
        products.thumbnail_image_url AS thumbnailImageUrl,
        products.price AS price,
        c.name AS category,
        s.name AS special,
        g.gender AS gender
    FROM products
    JOIN categories c ON products.category_id=c.id
    JOIN special s ON products.special_id=s.id
    JOIN gender g ON products.gender_id=g.id
    WHERE c.id = ?
    ORDER BY products.id LIMIT ? OFFSET ?
    `,[id , limit, offset ])
}
const getStockByProductId = async (productId) => {
    return await database.query(`
      SELECT
        s.product_id AS productId,
        p.name AS productName,
        s.id AS stockId,
        s.size,
        s.stock AS stockQuantity
      FROM stock s
      JOIN products p ON s.product_id = p.id
      WHERE s.product_id = ?;` [ productId ]
    );
  }
  

module.exports = { getProducts,requestAllMain,categoryFilter,getStockByProductId };
