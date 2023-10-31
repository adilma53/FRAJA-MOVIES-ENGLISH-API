import bcrypt from 'bcrypt';
import 'dotenv/config.js';
import jwt from 'jsonwebtoken';

const { TOKEN_KEY } = process.env;

export const authorizeToken = async (req, res, next) => {
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
