import User from '../models/userModel.js';
import Comment from '../models/commentModel.js';

export const addComment = async (req, res) => {
  const getUser = await User.findOne({ firebaseId: req.params.firebaseId });
  try {
    const comment = await Comment.create({
      ...req.body,
      author: getUser._id,
    });

    const newComment = {};
    newComment['comments'] = comment?._id;

    const user = await User.updateOne(
      { firebaseId: req.params.firebaseId },
      { $addToSet: newComment },
      { new: true }
    );

    if (!comment) {
      res.status(404).send(`comment could not be created try again`);
    } else {
      res.status(200).json(comment);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};
// -----------------------------------------------------
export const deleteComment = async (req, res) => {
  try {
    const commentTORemove = {};
    commentTORemove['comments'] = req.body.commentId;

    const user = await User.updateOne(
      { firebaseId: req.params.firebaseId },
      { $pull: commentTORemove },
      { new: true }
    );

    const comment = await Comment.findByIdAndDelete(req.body.commentId);

    if (!comment) {
      res.status(404).send(`comment could not be removed try again`);
    } else {
      res.status(200).json(comment);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};
