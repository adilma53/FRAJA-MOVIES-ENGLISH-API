import User from '../models/userModel.js';

export const addFriend = async (req, res) => {
  const { userId, friendId } = req.params;

  var friend = await User.findOne({ _id: friendId });
  if (!friend) {
    return res.status(500).send(`friend with _id:${friendId} not found`);
  }
  try {
    // Find the user by _id and update their watched list
    const newFriend = {};
    newFriend['friends'] = friend?._id;

    const user = await User.updateOne(
      { _id: userId },
      { $addToSet: newFriend },
      { new: true }
    );

    if (!friend) {
      return res.status(500).send(`friend with _id:${friendId} not found`);
    } else {
      return res.status(200).json(friend);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
// -----------------------------------------------------
export const removeFriend = async (req, res) => {
  const { userId, friendId } = req.params;

  var friend = await User.findOne({ _id: friendId });
  if (!friend) {
    return res.status(500).send(`friend with _id:${friendId} not found`);
  }
  try {
    // Find the user by _id and update their watched list
    const friendToRemove = {};
    friendToRemove['friends'] = friend?._id;
    const user = await User.updateOne(
      { _id: userId },
      { $pull: friendToRemove },
      { new: true }
    );

    if (!friend) {
      return res.status(500).send(`friend with _id:${friendId} not found`);
    } else {
      return res.status(200).json(friend);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
