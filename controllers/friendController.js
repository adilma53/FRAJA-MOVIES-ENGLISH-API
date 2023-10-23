const { User } = require('../models/userModel');

exports.addFriend = async (req, res) => {
  var friend = await User.findOne({ firebaseId: req.params.friendFirebaseId });
  if (!friend) {
    res
      .status(404)
      .send(`friend with firebaseId:${req.params.friendFirebaseId} not found`);
  }
  try {
    // Find the user by firebaseId and update their watched list
    const newFriend = {};
    newFriend['friends'] = friend?._id;

    const user = await User.updateOne(
      { firebaseId: req.params.firebaseId },
      { $addToSet: newFriend },
      { new: true }
    );

    if (!friend) {
      res
        .status(404)
        .send(
          `friend with firebaseId:${req.params.friendFirebaseId} not found`
        );
    } else {
      res.status(200).json(friend);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};
// -----------------------------------------------------
exports.removeFriend = async (req, res) => {
  var friend = await User.findOne({ firebaseId: req.params.friendFirebaseId });
  if (!friend) {
    res
      .status(404)
      .send(`friend with firebaseId:${req.param.friendFirebaseId} not found`);
  }
  try {
    // Find the user by firebaseId and update their watched list
    const friendToRemove = {};
    friendToRemove['friends'] = friend?._id;

    const user = await User.updateOne(
      { firebaseId: req.params.firebaseId },
      { $pull: friendToRemove },
      { new: true }
    );

    if (!friend) {
      res
        .status(404)
        .send(
          `friend with firebaseId:${req.params.friendFirebaseId} not found`
        );
    } else {
      res.status(200).json(friend);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};
