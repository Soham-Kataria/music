import Playlist from '../models/playlists.models.js';

// @desc Get all playlists of logged-in user
// @route GET /api/playlists
export const getPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id });
    res.json(playlists);
  } catch (err) {
    next(err);
  }
};

// @desc Create a new playlist
// @route POST /api/playlists
export const createPlaylist = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Playlist name is required' });

    const playlist = await Playlist.create({
      name,
      description,
      user: req.user.id,
      songs: [],
    });

    res.status(201).json(playlist);
  } catch (err) {
    next(err);
  }
};

// @desc Update playlist details or songs
// @route PUT /api/playlists/:id
export const updatePlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

    if (playlist.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    const { name, description, songs } = req.body;

    if (name !== undefined) playlist.name = name;
    if (description !== undefined) playlist.description = description;
    if (songs !== undefined) playlist.songs = songs;

    const updated = await playlist.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// @desc Delete playlist
// @route DELETE /api/playlists/:id
export const deletePlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

    if (playlist.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    await playlist.deleteOne();
    res.json({ message: 'Playlist deleted' });
  } catch (err) {
    next(err);
  }
};
// @desc Add a single song to a playlist
// @route POST /api/playlists/:id/songs
import axios from 'axios';

// @desc Add a single song to a playlist (fetch details from Deezer)
// @route POST /api/playlists/:id/songs
export const addSongToPlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

    if (playlist.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    const { trackId } = req.body;
    if (!trackId) return res.status(400).json({ message: 'trackId is required' });

    // Prevent duplicates
    if (playlist.songs.some(song => song.id === trackId))
      return res.status(400).json({ message: 'Song already in playlist' });

    // Fetch song details from Deezer API
    const response = await axios.get(`https://api.deezer.com/track/${trackId}`);
    const track = response.data;

    if (!track || !track.id) return res.status(404).json({ message: 'Track not found in Deezer' });

    // Add to playlist
    playlist.songs.push({
      id: track.id.toString(),
      title: track.title,
      artist: track.artist?.name || 'Unknown Artist',
      preview: track.preview || null,
    });

    const updated = await playlist.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};


// @desc Remove a single song from a playlist
// @route DELETE /api/playlists/:id/songs/:songId
export const removeSongFromPlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

    if (playlist.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    playlist.songs = playlist.songs.filter(song => song.id !== req.params.songId);
    const updated = await playlist.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};


export const searchSongs = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Search query is required' });

    // MusicBrainz search recordings endpoint
    const url = 'https://musicbrainz.org/ws/2/recording/';

    const response = await axios.get(url, {
      params: {
        query: q,
        fmt: 'json',
        limit: 25,
      },
      headers: {
        'User-Agent': 'YourAppName/1.0 ( your-email@example.com )',
      },
    });

    // Map MusicBrainz response to your desired format
    const tracks = response.data.recordings.map((rec) => ({
      id: rec.id,
      title: rec.title,
      artist: rec['artist-credit']?.map((a) => a.name).join(', ') || 'Unknown Artist',
      release: rec.releases?.[0]?.title || 'Unknown Release',
      date: rec.releases?.[0]?.date || 'Unknown Date',
    }));

    res.json({ total: response.data.count, data: tracks });
  } catch (err) {
    next(err);
  }
};