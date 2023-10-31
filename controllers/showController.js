import Show from '../models/showModel.js';

export const createShow = async (req, res) => {
  const email = await Show.findOne({ tmdbId: req.params.tmdbId });
  if (email) {
    res.status(300).send('this show already exists');
  } else {
    try {
      const show = await Show.create({
        ...req.body,
        tmdbId: req.params.tmdbId,
      });
      res.status(200).json(show);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  }
};

export const getShows = async (req, res) => {
  try {
    const shows = await Show.find();
    res.status(200).json(shows);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

export const getShow = async (req, res) => {
  try {
    const show = await Show.findOne({ tmdbId: req.params.tmdbId });

    if (!show) {
      res.status(200).send(`show with tmdbId:${req.params.tmdbId} not found`);
    } else {
      res.status(200).json(show);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

export const deleteShow = async (req, res) => {
  try {
    const show = await Show.findOneAndDelete({
      tmdbId: req.params.tmdbId,
    });

    if (!show) {
      res.status(404).send(`show with tmdbId:${req.params.tmdbId} not found`);
    } else {
      res.status(200).json(show);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

export const updateShow = async (req, res) => {
  try {
    const show = await Show.findOneAndUpdate(
      {
        tmdbId: req.params.tmdbId,
      },
      req.body,
      { new: true }
    );

    if (!show) {
      res.status(404).send(`show with tmdbId:${req.params.tmdbId} not found`);
    } else {
      res.status(200).json(show);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};
