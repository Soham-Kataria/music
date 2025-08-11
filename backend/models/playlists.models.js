import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Deezer track ID
  title: { type: String, required: true },
  artist: { type: String, required: true },
  preview: { type: String }, // Deezer preview URL
}, { _id: false });

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  songs: [songSchema],
}, { timestamps: true });

export default mongoose.model('Playlist', playlistSchema);
