import axios from 'axios';


export const searchSongs = async (req, res, next) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });

    // iTunes Search API URL
    const url = "https://itunes.apple.com/search";

    // Call iTunes API with term and limit results
    const response = await axios.get(url, {
      params: {
        term: q,
        media: "music",
        limit: 25,
      },
    });

    // iTunes returns results in response.data.results
    // Map to your expected format if needed
    const results = response.data.results.map((item) => ({
      id: item.trackId.toString(),
      title: item.trackName,
      artist: item.artistName,
      preview: item.previewUrl,
      artwork: item.artworkUrl100,
    }));

    return res.json({ data: results, total: results.length });
  } catch (err) {
    next(err);
  }
};


export const getSongDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const url = 'https://itunes.apple.com/lookup';

    const response = await axios.get(url, { params: { id } });
    if (!response.data.results || response.data.results.length === 0) {
      return res.status(404).json({ message: 'Song not found' });
    }

    const item = response.data.results[0];

    const track = {
      id: item.trackId.toString(),
      title: item.trackName,
      artist: item.artistName,
      preview: item.previewUrl,
      artwork: item.artworkUrl100,
      album: item.collectionName,
      genre: item.primaryGenreName,
      releaseDate: item.releaseDate,
    };

    return res.json(track);
  } catch (err) {
    next(err);
  }
};


// import axios from 'axios';


// export const searchSongs = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     if (!q) return res.status(400).json({ message: 'Search query is required' });

//     // MusicBrainz search recordings endpoint
//     const url = 'https://musicbrainz.org/ws/2/recording/';

//     const response = await axios.get(url, {
//       params: {
//         query: q,
//         fmt: 'json',
//         limit: 25,
//       },
//       headers: {
//         'User-Agent': 'YourAppName/1.0 ( your-email@example.com )',
//       },
//     });

//     // Map MusicBrainz response to your desired format
//     const tracks = response.data.recordings.map((rec) => ({
//       id: rec.id,
//       title: rec.title,
//       artist: rec['artist-credit']?.map((a) => a.name).join(', ') || 'Unknown Artist',
//       release: rec.releases?.[0]?.title || 'Unknown Release',
//       date: rec.releases?.[0]?.date || 'Unknown Date',
//     }));

//     res.json({ total: response.data.count, data: tracks });
//   } catch (err) {
//     next(err);
//   }
// };


// export const getSongDetails = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!id) return res.status(400).json({ message: 'Song ID is required' });

//     const url = `https://musicbrainz.org/ws/2/recording/${id}`;

//     const response = await axios.get(url, {
//       params: {
//         fmt: 'json',
//         inc: 'artists+releases+tags+ratings', // optional: include extra data
//       },
//       headers: {
//         'User-Agent': 'YourAppName/1.0 ( your-email@example.com )',
//       },
//     });

//     const rec = response.data;

//     // Format the song details
//     const songDetails = {
//       id: rec.id,
//       title: rec.title,
//       artist: rec['artist-credit']?.map((a) => a.name).join(', ') || 'Unknown Artist',
//       release: rec.releases?.[0]?.title || 'Unknown Release',
//       date: rec.releases?.[0]?.date || 'Unknown Date',
//       tags: rec.tags?.map((tag) => tag.name) || [],
//       rating: rec.rating?.value || 'No Rating',
//     };

//     res.json(songDetails);
//   } catch (err) {
//     next(err);
//   }
// };