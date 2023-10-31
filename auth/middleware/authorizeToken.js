const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const { TOKEN_KEY } = process.env;

exports.authorizeToken = async (req, res, next) => {
  // token can be retrieved from multiple potential sources
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send('authorization token is required');
  }

  try {
    const decodedToken = await jwt.verify(token, TOKEN_KEY);

    req.currentUser = decodedToken;
  } catch (error) {
    return res.status(401).send('invalid token provided');
  }

  return next();
};
