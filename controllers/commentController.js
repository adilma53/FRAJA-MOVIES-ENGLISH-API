import User from '../models/userModel.js';
import Comment from '../models/commentModel.js';

export const createComment = async (req, res) => {
  const firebaseId = { firebaseId: req.params.firebaseId };

  const user = await User.findOne(firebaseId);
  try {
    const comment = await Comment.create({
      ...req.body,
      author: user._id,
    });

    const newComment = {};
    newComment['comments'] = comment?._id;

    await User.updateOne(
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
    const { commentId } = req.body;
    const { firebaseId } = req.params;

    const commentTORemove = {};
    commentTORemove['comments'] = commentId;

    const user = await User.updateOne(
      { firebaseId: firebaseId },
      { $pull: commentTORemove },
      { new: true }
    );

    const comment = await Comment.findByIdAndDelete(commentId);

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
// -----------------------------------------------------
export const updateComment = async (req, res) => {
  const { commentId } = req.body;

  try {
    const comment = await Comment.findOneAndUpdate(
      {
        _id: commentId,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!comment) {
      return res
        .status(404)
        .send(`comment with commentId:${commentId} not found`);
    } else {
      return res.status(200).json(comment);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
