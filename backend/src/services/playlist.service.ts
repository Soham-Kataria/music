import Playlist, { IPlaylist } from '../models/playlist.model.js';
import { SongService } from './song.service.js';
import { AppError } from '../middlewares/errorHandler.js';

export class PlaylistService {
  static async getUserPlaylists(userId: string): Promise<IPlaylist[]> {
    return Playlist.find({ user: userId });
  }

  static async createPlaylist(userId: string, name: string, description?: string): Promise<IPlaylist> {
    if (!name) throw new AppError('Playlist name is required', 400);

    return Playlist.create({
      name,
      description,
      user: userId,
      songs: [],
    });
  }

  static async updatePlaylist(
    playlistId: string,
    userId: string,
    updates: { name?: string; description?: string; songs?: any[] }
  ): Promise<IPlaylist> {
    const playlist = await this.getAndVerifyOwnership(playlistId, userId);

    if (updates.name !== undefined) playlist.name = updates.name;
    if (updates.description !== undefined) playlist.description = updates.description;
    if (updates.songs !== undefined) playlist.songs = updates.songs;

    return playlist.save();
  }

  static async deletePlaylist(playlistId: string, userId: string): Promise<void> {
    const playlist = await this.getAndVerifyOwnership(playlistId, userId);
    await playlist.deleteOne();
  }

  static async addSong(playlistId: string, userId: string, trackId: string): Promise<IPlaylist> {
    const playlist = await this.getAndVerifyOwnership(playlistId, userId);

    if (playlist.songs.some((song) => song.id === trackId)) {
      throw new AppError('Song already in playlist', 400);
    }

    const track = await SongService.getSongById(trackId);
    if (!track) {
      throw new AppError('Track not found in iTunes', 404);
    }

    playlist.songs.push(track);
    return playlist.save();
  }

  static async removeSong(playlistId: string, userId: string, songId: string): Promise<IPlaylist> {
    const playlist = await this.getAndVerifyOwnership(playlistId, userId);

    playlist.songs = playlist.songs.filter((song) => song.id !== songId);
    return playlist.save();
  }

  private static async getAndVerifyOwnership(playlistId: string, userId: string): Promise<IPlaylist> {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) throw new AppError('Playlist not found', 404);

    if (playlist.user.toString() !== userId) {
      throw new AppError('Not authorized', 403);
    }

    return playlist;
  }
}
