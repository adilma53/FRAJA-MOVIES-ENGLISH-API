import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

import Show from '../models/showModel.js';

export const createShow = async (req, res) => {
  const { tmdbId } = req.query;

  try {
    const show = await Show.create({
      _id: tmdbId,
    });

    if (!show) {
      return res
        .status(500)
        .send(`show with _id:${tmdbId} can not be created try again please`);
    }
    return res.status(200).json(show);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find();
    return res.status(200).json(shows);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
// Convert the tmdbId to a valid ObjectId
// const objectId = mongoose.Types.ObjectId(tmdbId);

// const isShow = await Show.findOne({ _id: objectId });
// if (isShow) {
//   return res.status(400).send('This show already exists');
// }
export const getShow = async (req, res) => {
  const { tmdbId } = req.query;

  try {
    const show = await Show.findOne({ _id: tmdbId });

    if (!show) {
      return res.status(200).send(`show with tmdbId:${tmdbId} not found`);
    } else {
      return res.status(200).json(show);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const deleteShow = async (req, res) => {
  const { tmdbId } = req.query;

  try {
    const show = await Show.findOneAndDelete({ _id: tmdbId });

    if (!show) {
      return res.status(404).send(`show with tmdbId:${tmdbId} not found`);
    } else {
      return res.status(200).json(show);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const updateShow = async (req, res) => {
  const { tmdbId } = req.query;

  try {
    const show = await Show.findOneAndUpdate({ _id: tmdbId }, req.body, {
      new: true,
    });

    if (!show) {
      return res.status(404).send(`show with tmdbId:${tmdbId} not found`);
    } else {
      return res.status(200).json(show);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
