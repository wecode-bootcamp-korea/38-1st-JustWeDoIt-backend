const { userDao } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signUp = async (userName, password, fullName, phoneNumber, address, birth, gender) => {

  const today = new Date();
  const todayTime = today.getTime();
  const birthTime = new Date(birth);
  const limitAge = 15;

  let age = Math.floor((todayTime - birthTime) / (1000 * 60 * 60 * 24 * 365));
  if (age < limitAge) {
    const err = new Error(`Under ${limitAge} years old`)
    err.statusCode = 400;
    throw err
  }
  const idValidation = new RegExp(
    `^[a-zA-Z0-9_-]{6,99}$`
  );
  if (!idValidation.test(userName)) {
    const err = new Error(`ID_IS_NOT_VALID`);
    err.statusCode = 400;
    throw err;
  };

  const pwValidation = new RegExp(
    `^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16})`
  );
  if (!pwValidation.test(password)) {
    const err = new Error(`PASSWORD_IS_NOT_VALID`);
    err.statusCode = 400;
    throw err;
  };

  const mobileValidation = new RegExp(
    `^[0-9]{2,3}[0-9]{3,4}[0-9]{4}`

  );
  if (!mobileValidation.test(phoneNumber)) {
    const err = new Error(`MOBILE_IS_NO_VALID`);
    err.statusCode = 400;
    throw err;
  }

  const checkUsername = await userDao.checkUsername(userName)
  if (checkUsername) {
    const err = new Error("already exists userid");
    err.statusCode = 400;
    throw err
  }

  const makeHash = async (password, saltRound) => {
    return await bcrypt.hash(password, saltRound);
  }
  password = await makeHash(password, 10);

  return await userDao.signUp(userName, password, fullName, phoneNumber, address, birth, gender)

}


const signIn = async (userName, password) => {
  const user = await userDao.getUserByUsername(userName);

  if (user === undefined) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;

    throw error;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;

    throw error;
  }

  const accessToken = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return [user.fullName, accessToken]

};

const getUserById = async (id) => {
  return await userDao.getUserById(id);
};

module.exports = {
  signUp,
  signIn,
  getUserById,
};