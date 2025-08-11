import axios from 'axios';

export const searchSongs = async (req, res, next) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });

    const response = await axios.get('https://api.deezer.com/search', { params: { q } });
    return res.json(response.data);
  } catch (err) {
    next(err);
  }
};
export const getSongDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.deezer.com/track/${id}`);
    return res.json(response.data);
  } catch (err) {
    next(err);
  }
};