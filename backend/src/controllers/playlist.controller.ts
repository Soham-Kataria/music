import { Request, Response } from 'express';
import { PlaylistService } from '../services/playlist.service.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { AppError } from '../middlewares/errorHandler.js';

export const getPlaylists = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError('Not authorized', 401);
  const playlists = await PlaylistService.getUserPlaylists(req.user.id);
  res.json({ success: true, data: playlists });
});

export const createPlaylist = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError('Not authorized', 401);
  const { name, description } = req.body;
  const playlist = await PlaylistService.createPlaylist(req.user.id, name, description);
  res.status(201).json(playlist);
});

export const updatePlaylist = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError('Not authorized', 401);
  const updated = await PlaylistService.updatePlaylist(req.params.id, req.user.id, req.body);
  res.json(updated);
});

export const deletePlaylist = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError('Not authorized', 401);
  await PlaylistService.deletePlaylist(req.params.id, req.user.id);
  res.json({ message: 'Playlist deleted' });
});

export const addSongToPlaylist = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError('Not authorized', 401);
  const { trackId } = req.body;
  if (!trackId) throw new AppError('trackId is required', 400);

  const updated = await PlaylistService.addSong(req.params.id, req.user.id, trackId);
  res.json(updated);
});

export const removeSongFromPlaylist = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError('Not authorized', 401);
  const updated = await PlaylistService.removeSong(req.params.id, req.user.id, req.params.songId);
  res.json(updated);
});
