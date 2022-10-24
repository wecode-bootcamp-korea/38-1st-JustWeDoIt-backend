const {database} = require('./dataSource');

const requestMain = async ( offset, limit, size, gender, special, price ,headerFilter) => {

const whereTrigger = async (size, gender, special, price ,headerFilter) => {
    if( size ||  gender || special || price || headerFilter ){
        return `WHERE `;
    }
    else{
        return ``
    }
}

    const genderFilter = async (genders) => {

        switch(genders){
        
            case `man`:
                return `g.id=2`
            case `woman`:
                return `g.id=3`
            case `unisex`:
                return `g.id=1`
            default:
                return ``
        } 
    }
        
        const specialFilter = async (special) => {
          switch(special){
            case `echo`:
              return `s.id=1`
            case `noEcho`:
                return `s.id=2`
            default:
              return ``
          }
        }
        
        const headerFilterFilter = async (headerFilter) => {
          switch(headerFilter){
            case `low`:
              return `price asc,`;
            case `high` :
              return `price desc,`;
            case `recent`:
              return `id asc, `;
            default:
              return ``
          }
        }
        
        const sizeFilter = async (size) => {
            
            if(size){
                
                if(gender || special || price || headerFilter){
                    return ` AND k.size IN (${size})` // size만 있을경우 AND제거 필요 다른 방법 강구
                }
                if(!gender && !special && !price && !headerFilter){
                    return ` k.size IN (${size})`
                }
            }
            if(!size){
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


const whereTriggerAsync = await whereTrigger(size, gender, special, price ,headerFilter);
const genderFilterAsync = await genderFilter(gender);
const specialFilterAsync = await specialFilter(special);
const sizeJoinAsync = await sizeJoin(size);
const sizeFilterAsync = await sizeFilter(size); //size filter 고민

const headerFilterFilterAsync = await headerFilterFilter(headerFilter);

console.log(whereTriggerAsync,genderFilterAsync,specialFilterAsync)
const whereStringArray = [];
whereStringArray.push(genderFilterAsync,specialFilterAsync,specialFilterAsync);
console.log({for문전:whereStringArray})
for(let i=0;i<whereStringArray.length;i++){
    if(whereStringArray[i] ===''||""||``){
        whereStringArray.splice(i,1);
    }
}

let whereString = whereStringArray.toString();
let resultWhereWhithoutSize = whereString.replaceAll(',',' AND ');
let resultWhere = resultWhereWhithoutSize.concat(sizeFilterAsync);
console.log(whereStringArray)
console.log(whereString)
console.log(resultWhere);
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
            ${sizeJoinAsync}
            ${whereTriggerAsync}${resultWhere}
            ORDER BY ${headerFilterFilterAsync} products.id LIMIT ? OFFSET ? 
            `
            ,[ limit, offset ] // where and 자동으로 넣기 > replaceAll() 이랑 배열의 ''가 있는 경우 제거하는 로직 구성
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