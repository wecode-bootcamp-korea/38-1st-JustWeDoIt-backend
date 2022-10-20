const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { getUserById } = require('../services/userService');

const loginRequired = async (req, res, next) => {

  // 1) Getting  and check if it is there
  const accesstoken = req.headers.authorization;

  if (!accesstoken) {
    const error = new Error('NEED_ACCESS_TOKEN');
    error.statusCode = 401;

    return res.status(error.statusCode).json({ message : error.message });
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(accesstoken, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const user = await getUserById(decoded.id);

  if(!user) {
    const error = new Error('USER_DOES_NOT_EXIST');
    error.statusCode = 404;

    return res.status(error.statusCode).json({ message : error.message });
  }

  // 4) Grant access
  req.user = user;
  next();
}

module.exports = { loginRequired }