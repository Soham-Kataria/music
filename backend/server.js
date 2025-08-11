import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import songsRoutes from './routes/songs.routes.js';
import authRoutes from './routes/auth.routes.js';
import playlistsRoutes from './routes/playlists.routes.js';
import searchSongs from './routes/search.routes.js';

import { errorHandler, notFound } from './middlewares/errorHandler.js';

dotenv.config();
const app = express();

// connect DB (non-blocking)
connectDB().catch(err => {
  console.error('Failed to connect to DB', err);
  process.exit(1);
});



// middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// routes
app.use('/api/songs', songsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/playlists', playlistsRoutes);
app.use('/api/search', searchSongs);

app.get('/', (req, res) => res.send('Music Streaming API Backend Running 🎵'));

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

