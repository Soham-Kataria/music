// controllers/search.controller.js
import axios from 'axios';

export const searchSongs = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Search query is required' });

    let allResults = [];
    let url = `https://api.deezer.com/search?q=${encodeURIComponent(q)}`;

    while (url) {
      const response = await axios.get(url);

      if (!response.data.data || response.data.data.length === 0) break;

      allResults = allResults.concat(response.data.data);

      // If Deezer provides a 'next' URL, fetch it; otherwise, stop
      url = response.data.next || null;
    }

    res.json({
      total: allResults.length,
      data: allResults
    });
  } catch (err) {
    next(err);
  }
};
