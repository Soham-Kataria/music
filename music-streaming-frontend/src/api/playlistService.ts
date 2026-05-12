import apiClient from "./apiClient";
import type { Playlist } from "../types";

export interface PaginatedResponse<T> {
  data: T[];
  count?: number;
}

export const playlistService = {
  getPlaylists: async () => {
    const res = await apiClient.get<PaginatedResponse<Playlist>>("/playlists");
    return res.data.data;
  },

  createPlaylist: async (data: { name: string; description: string }) => {
    const res = await apiClient.post<Playlist>("/playlists", data);
    return res.data;
  },

  updatePlaylist: async (id: string, data: { name: string; description: string }) => {
    const res = await apiClient.put<Playlist>(`/playlists/${id}`, data);
    return res.data;
  },

  deletePlaylist: async (id: string) => {
    await apiClient.delete(`/playlists/${id}`);
  },

  addSongToPlaylist: async (playlistId: string, trackId: string) => {
    await apiClient.post(`/playlists/${playlistId}/songs`, { trackId });
  },

  removeSongFromPlaylist: async (playlistId: string, songId: string) => {
    await apiClient.delete(`/playlists/${playlistId}/songs/${songId}`);
  },
};
