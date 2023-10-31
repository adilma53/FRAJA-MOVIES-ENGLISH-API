import bcrypt from 'bcrypt';

export const hashPassword = async (password, saltRounds = 10) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

export const verifyHashedPassword = async (unhashed, hashed) => {
  try {
    const passwordMatch = await bcrypt.compare(unhashed, hashed);
    return passwordMatch;
  } catch (error) {
    throw error;
  }
};
