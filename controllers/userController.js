import User from '../models/userModel.js';
import Show from '../models/showModel.js';

export const createUser = async (req, res) => {
  const email = await User.findOne({ email: req.body.email });
  if (email) {
    res.status(300).send('this email already exists');
  } else {
    try {
      const user = await User.create({
        ...req.body,
        firebaseId: req.params.firebaseId,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.params.firebaseId });

    if (!user) {
      res.status(200).send('user not found');
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      firebaseId: req.params.firebaseId,
    });

    if (!user) {
      res.status(404).send('user firebaseId not found');
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        firebaseId: req.params.firebaseId,
      },
      req.body,
      { new: true }
    );

    if (!user) {
      res
        .status(404)
        .send(`user with firebaseId:${req.params.firebaseId} not found`);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// -----------------------------------------------------

// -----------------------------------------------------

// export const removeShowFromHistory = async (req, res) => {
//   // addShowToHistory
//   const whichList = req.params.listType;
//   // addToList
//   var show = await Show.findOne({ tmdbId: req.body.tmdbId });
//   if (!show) {
//     show = await Show.create({
//       ...req.body,
//       tmdbId: req.body.tmdbId,
//     });
//   }
//   try {
//     // Find the user by firebaseId and update their watched list
//     const showToRemove = {};
//     showToRemove[whichList] = show?._id;

//     const user = await User.updateOne(
//       { firebaseId: req.params.firebaseId },
//       { $pull: showToRemove },
//       { new: true }
//     );

//     if (!show) {
//       res.status(404).send(`show with tmdbId:${req.body.tmdbId} not found`);
//     } else {
//       res.status(200).json(show);
//     }
//   } catch (error) {
//     res.status(500);
//     throw new Error(error.message);
//   }
// };
// -----------------------------------------------------
