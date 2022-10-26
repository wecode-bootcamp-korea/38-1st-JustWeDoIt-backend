const {database} = require('./dataSource');

const getProduct = async (productId) => {
    const data = await database.query(
        `
        SELECT DISTINCT
            p.id,
            p.name AS productName,
            p.description,
            p.price,
            c.name AS category,
            s.name AS special,
            g.gender,
            p.thumbnail_image_url AS thumbnailImage,
            JSON_ARRAYAGG(p.image_url) AS images,
            // JSON_ARRAYAGG(s.size) AS stocks,
        FROM products p
        JOIN categories c ON p.category_id = c.id
        JOIN special s ON p.special_id = s.id
        JOIN gender g ON p.gender_id = g.id
        JOIN product_images i ON p.id = i.product_id
        WHERE p.id = ?
        GROUP BY p.id
    `
    ,
    [productId])

    return data;
}

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
        console.log({'싸아아아아아아아아이이이이이이ㅣ쯔으으으우우우' : size})
        if(size){
            // let shiftDeleteSize =size.replace(size[0],'')
            // console.log({'this is AAAAAA' : shiftDeleteSize})
            // let shiftPopDeleteSize = shiftDeleteSize.replace(size[size.length-1],'')
            // console.log({'this is BBBBBBB':shiftPopDeleteSize})

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
            console.log('여기에요 여기~ price가 없어요~')
            return ``
        }
        let priceCount = price.split('~')
        console.log({'priceCount???':priceCount})

        if(priceCount.length <= 2){
        let a = price.replace('~','AND')
        if(gender || special){
            console.log({'price' : price,'gender':gender,'special':special})
        return ` AND products.price BETWEEN ${a} `
        }else{
            return `products.price BETWEEN ${a}`
        }
        }
        


        if (priceCount.length > 2){
        const firstSpace = price.indexOf(' ');
        const lastSpace = price.lastIndexOf(' ');
        console.log('가ㅏ가가가가가각가가가가ㅏ가ㅏ가가가ㅏ가가가가ㅏ',price)
       
        let result = price.replace(price.slice(firstSpace,lastSpace),'');
        console.log('resasdfsdsafsfsfsfsadfsfdfsdafsdfsdfsffsaf',result)
        let realResult = result.replace(' ',' AND ');
        console.log({'realResult는 여기에요':realResult})
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
            ,[ limit, offset ] // where and 자동으로 넣기 > replaceAll() 이랑 배열의 ''가 있는 경우 제거하는 로직 구성
    )
    // console.log(main);
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


const categoryFilter = async (categoryId) => {
    return await database.query(`
    SELECT
        products.id AS productId,
        products.name AS name,
        products.thumbnail_image_url AS thumbnailImageUrl,
        c.name AS category,
        s.name AS special,
        g.gender AS gender
    FROM products
    JOIN categories c ON products.category_id=c.id
    JOIN special s ON products.special_id=s.id
    JOIN gender g ON products.gender_id=g.id
    WHERE c.id = ?
    `,[categoryId])
}
module.exports = { getProducts,requestAllMain,categoryFilter };
