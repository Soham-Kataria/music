import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { config } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import playlistRoutes from './routes/playlist.routes.js';
import songRoutes from './routes/song.routes.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';

const app = express();

// Connect to Database
connectDB().catch((err) => {
  console.error('Failed to connect to DB', err);
  process.exit(1);
});

// Middleware
app.use(cors());
app.use(express.json());
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/search', songRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Music Streaming API Backend Running 🎵 (TypeScript)');
});

// 404 + Error Handler
app.use(notFound);
app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});
