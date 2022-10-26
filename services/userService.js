const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { userDao } = require('../models');
const { validatePassword, validateEmail } = require('../utils/validators');

const hashPassword = async(plaintextPassword) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  
  return await bcrypt.hash(plaintextPassword, salt);
}

const getUserById = async (id) => {
	return await userDao.getUserById(id)
}

const signUp = async (name, email, residentNumberFront, residentNumberback, password) => {
  validatePassword(password);
  validateEmail(email);

  const hashedPassword = await hashPassword(password)

  const createUser = await userDao.createUser(
    name,
    email,
    residentNumberFront,
    residentNumberback,
    hashedPassword
  );
  
  return createUser;
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user) {
    const err = new Error('SPECIFIED_USER_DOES_NOT_EXIST');
    err.statusCode = 404;
    throw err;
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    const err = new Error('INVALID_PASSWORD');
    err.statusCode = 401;
    throw err;
  }

  return jwt.sign({ sub: 'Access Token', aud: user.name, email: user.email, userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

module.exports = {
  signUp,
  signIn,
  getUserById
}