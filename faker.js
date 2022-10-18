require("dotenv").config();

const { faker } = require('@faker-js/faker');
const { DataSource } = require('typeorm');

const database = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

function createRandomUser() {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone_number: faker.phone.number('010-####-####'),
    address: faker.address.streetAddress(),
    resident_number_front: faker.random.numeric(6),
    resident_number_back: faker.random.numeric(1, { bannedDigits: ['0', '5', '6', '7', '8', '9']}),
    point: faker.random.numeric(7)
  }
}

function createRandomProduct() {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    // category_id: 
    // special_id:
    // gender_id :
    // thumbnail_image_url :
    price : faker.commerce.price(10000, 100000, 0, '₩')
  }
}

// let userArray = [];
// let productArray = [];

// for (let i = 0; i < 2; i++) {
//   userArray[i] = createRandomUser();
// }

// for (let i = 0; i < 2; i++) {
//   productArray[i] = createRandomProduct();
// }

const postMockUserData = async (name, email, password, phone_number, address, resident_number_front, resident_number_back, point) => {
  return await database.query(`
    INSERT INTO users(
      name,
      email,
      password,
      phone_number,
      address,
      resident_number_front,
      resident_number_back,
      point
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    [ name, email, password, phone_number, address, resident_number_front, resident_number_back, point ]
  );
}

const postMockProductData = async (name, description, price) => {
  return await database.query(`
    INSERT INTO products(
      name,
      description,
      price
    ) VALUES (?, ?, ?);`,
    [ name, description, price ]
  );
}

const makeMockData = async() => {
  await database.initialize()

  for (let i = 0; i < 100; i++) {
    const user = createRandomUser()
    console.log(user)

    postMockUserData(
      user.name,
      user.email,
      user.password,
      user.phone_number,
      user.address,
      user.resident_number_front,
      user.resident_number_back,
      user.point,
      )
    
    // postMockProductData(
    //   createRandomProduct.name, 
    //   createRandomProduct.description,
    //   createRandomProduct.price
    // )
  }
}

makeMockData();

