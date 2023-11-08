import User from '../models/userModel.js';
import Show from '../models/showModel.js';

export const createUser = async (req, res) => {
  const { userId } = req.params;
  const { email } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(500).send('this user email already exists');
  } else {
    try {
      const user = await User.create({
        ...req.body,
        _id: userId,
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(500).send(`user with id:${userId} not found`);
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOneAndDelete({
      _id: userId,
    });

    if (!user) {
      return res.status(500).send(`user with id:${userId} not found`);
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(500).send(`user with id:${userId} not found`);
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).send(error.message);
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
//       return res.status(404).send(`show with tmdbId:${req.body.tmdbId} not found`);
//     } else {
//       return res.status(200).json(show);
//     }
//   } catch (error) {
//     return res.status(500);
//     throw new Error(error.message);
//   }
// };
// -----------------------------------------------------
