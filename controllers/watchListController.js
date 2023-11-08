import User from '../models/userModel.js';
import Show from '../models/showModel.js';

// addToCollection
export const addShowToList = async (req, res) => {
  const { userId, listType } = req.params;
  const { tmdbId } = req.body;

  var show = await Show.findOne({ tmdbId: tmdbId });
  if (!show) {
    show = await Show.create({
      ...req.body,
      tmdbId: tmdbId,
    });
  }
  try {
    const user = await User.findOne({ _id: userId });

    // check if show already in list
    if (user[listType].includes(show._id)) {
      return res.status(404).send(`show with tmdbId:${tmdbId} already in list`);
    }

    await user.addToList(listType, show._id);

    if (!show) {
      res.status(404).send(`failed to create show with tmdbId:${tmdbId}`);
    } else {
      res.status(200).json(show);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
// -----------------------------------------------------
export const removeShowFromList = async (req, res) => {
  const { userId, listType } = req.params;
  const { tmdbId } = req.body;

  try {
    const show = await Show.findOne({ tmdbId: tmdbId });
    const user = await User.findOne({ _id: userId });

    if (!show) {
      return res.status(500).send(`show with tmdbId:${tmdbId} not found`);
    }

    // this does not work for now
    // check if the show in the list
    // const showIds = user[listType].map((item) => item._id);
    // if (!showIds.includes(show._id)) {
    //   return res
    //     .status(500)
    //     .send(`show with tmdbId:${tmdbId} is not in the targeted list`);
    // }

    user.deleteFromList(listType, show._id);

    if (!show) {
      return res.status(404).send(`show with tmdbId:${tmdbId} not found`);
    } else {
      return res.status(200).json(show);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
// -----------------------------------------------------

//  old functions before refactoring

// export const addShowToList = async (req, res) => {
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
//     const newShow = {};
//     newShow[whichList] = show?._id;

//     const user = await User.updateOne(
//       { firebaseId: req.params.firebaseId },
//       { $addToSet: newShow },
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
// --------------------------------------------------------
// export const removeShowFromList = async (req, res) => {
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
// // --------------------------------------------------------
// --------------------------------------------------------
// --------------------------------------------------------

// export const addShowToList = async (req, res) => {
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
//     const newShow = {};
//     newShow[whichList] = show?._id;

//     const user = await User.updateOne(
//       { firebaseId: req.params.firebaseId },
//       { $addToSet: newShow },
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
