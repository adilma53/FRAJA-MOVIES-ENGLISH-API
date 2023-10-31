import User from '../../models/userModel.js';
import { hashData, verifyHashedData } from '../utils/hashing.js';
import { createJwtToken } from '../utils/createJwtToken.js';

export const signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    const isUserExists = await User.findOne({ email: email });
    if (isUserExists) {
      return res.status(500).send('this email already exists');
    }

    const hashedPassword = await hashData(password);

    const data = {
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    };

    const user = await User.create(data);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(500).send('failed to create user try again please');
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    const data = {
      email: email.trim(),
    };

    const user = await User.findOne(data);
    if (!user) {
      return res.status(500).send('invalide email try again');
    }

    const passwordMatch = await verifyHashedData(password, user.password);

    if (!passwordMatch) {
      return res.status(500).send('invalide password try again');
    } else {
      // return res.status(500).send('failed to create user try again please');

      const tokenData = { userId: user._id, email };
      const token = await createJwtToken(tokenData);

      user.token = token;

      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
