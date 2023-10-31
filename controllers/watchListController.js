import User from '../models/userModel.js';
import Show from '../models/showModel.js';

// addToCollection
export const addShowToList = async (req, res) => {
  const whichList = req.params.listType;
  const tmdbId = { tmdbId: req.body.tmdbId };
  const firebaseId = { firebaseId: req.params.firebaseId };

  var show = await Show.findOne(tmdbId);
  if (!show) {
    show = await Show.create({
      ...req.body,
      tmdbId: req.body.tmdbId,
    });
  }
  try {
    const user = await User.findOne(firebaseId);

    // check if show already in list
    if (user[whichList].includes(show._id)) {
      return res
        .status(404)
        .send(`show with tmdbId:${req.body.tmdbId} already in list`);
    }

    await user.addToList(whichList, show._id);

    if (!show) {
      res
        .status(404)
        .send(`failed to create show with tmdbId:${req.body.tmdbId}`);
    } else {
      res.status(200).json(show);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};
// -----------------------------------------------------
export const removeShowFromList = async (req, res) => {
  const whichList = req.params.listType;
  const tmdbId = { tmdbId: req.body.tmdbId };
  const firebaseId = { firebaseId: req.params.firebaseId };

  var show = await Show.findOne(tmdbId);
  // check if show already in list

  try {
    const user = await User.findOne(firebaseId);

    if (!show || !user[whichList].includes(show._id)) {
      return res
        .status(404)
        .send(`show with tmdbId:${req.body.tmdbId} is not in this list`);
    }

    user.deleteFromList(whichList, show._id);

    if (!show) {
      return res
        .status(404)
        .send(`show with tmdbId:${req.body.tmdbId} not found`);
    } else {
      return res.status(200).json(show);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
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
