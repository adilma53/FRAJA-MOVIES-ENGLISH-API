import jwt from 'jsonwebtoken';

import dontenv from 'dotenv';
dontenv.config();

const { TOKEN_KEY, TOKEN_EXPIRY } = process.env;

export const createJwtToken = async (
  tokenData,
  tokenKey = TOKEN_KEY,
  expiresIn = TOKEN_EXPIRY
) => {
  try {
    const token = await jwt.sign(tokenData, tokenKey, { expiresIn });

    return token;
  } catch (error) {
    throw error;
  }
};
