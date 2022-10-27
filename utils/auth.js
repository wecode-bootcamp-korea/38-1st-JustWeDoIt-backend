const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { getUserById } = require('../services/userService');

const loginRequired = async (req, res, next) => {

  // 1) Getting token and check if it is there
  const accessToken = req.headers.authorization;
  console.log(accessToken);

  if (!accessToken) {
    const error = new Error('NEED_ACCESS_TOKEN');
    error.statusCode = 401;

    return res.status(error.statusCode).json({ message : error.message });
  }

  // 2) Verification token
  console.log("-------------------------", accessToken);
  const decoded = await promisify(jwt.verify)(accessToken, process.env.JWT_SECRET);

  console.log("-------------", decoded);

  // 3) Check if user still exists
  const user = await getUserById(decoded.userId);

  if(!user) {
    const error = new Error('USER_DOES_NOT_EXIST');
    error.statusCode = 404;

    return res.status(error.statusCode).json({ message : error.message });
  }

  // 4) Grant access
  req.user = decoded.userId;
  next();
}

module.exports = { loginRequired }