import Show from '../models/showModel.js';

export const createShow = async (req, res) => {
  const { tmdbId } = req.query;

  const isShow = await Show.findOne({ _id: tmdbId });
  if (isShow) {
    return res.status(300).send('this show already exists');
  } else {
    try {
      const show = await Show.create({
        _id: tmdbId,
        ...req.body,
      });
      return res.status(200).json(show);
    } catch (error) {
      return res.status(500).send(error.message);
    }
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
