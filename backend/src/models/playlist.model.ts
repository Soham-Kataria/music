import mongoose, { Schema, Document } from 'mongoose';

export interface ISong {
  id: string;
  title: string;
  artist: string;
  preview: string | null;
  artwork: string | null;
  album: string | null;
  genre: string | null;
  releaseDate: string | null;
}

export interface IPlaylist extends Document {
  name: string;
  description?: string;
  user: mongoose.Types.ObjectId;
  songs: ISong[];
  createdAt: Date;
  updatedAt: Date;
}

const songSchema = new Schema<ISong>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    preview: { type: String },
    artwork: { type: String },
    album: { type: String },
    genre: { type: String },
    releaseDate: { type: String },
  },
  { _id: false }
);

const playlistSchema = new Schema<IPlaylist>(
  {
    name: { type: String, required: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    songs: [songSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IPlaylist>('Playlist', playlistSchema);
