const bcrypt = require('bcrypt');

exports.hashPassword = async (password, saltRounds = 10) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

exports.verifyHashedPassword = async (unhashed, hashed) => {
  try {
    const passwordMatch = await bcrypt.compare(unhashed, hashed);
    return passwordMatch;
  } catch (error) {
    throw error;
  }
};
