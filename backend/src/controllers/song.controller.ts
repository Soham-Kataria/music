import { Request, Response } from 'express';
import { SongService } from '../services/song.service.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { AppError } from '../middlewares/errorHandler.js';

export const searchSongs = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query.q as string;
  if (!query) {
    throw new AppError("Query parameter 'q' is required", 400);
  }

  const results = await SongService.searchSongs(query);
  res.json({ data: results, total: results.length });
});

export const getSongDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const song = await SongService.getSongById(id);

  if (!song) {
    throw new AppError('Song not found', 404);
  }

  res.json(song);
});
