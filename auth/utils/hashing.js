import bcrypt from 'bcrypt';

export const hashData = async (password, saltRounds = 10) => {
  try {
    const hashedData = await bcrypt.hash(password, saltRounds);
    return hashedData;
  } catch (error) {
    throw error;
  }
};

export const verifyHashedData = async (unhashed, hashed) => {
  try {
    const dataMatch = await bcrypt.compare(unhashed, hashed);
    return dataMatch;
  } catch (error) {
    throw error;
  }
};
