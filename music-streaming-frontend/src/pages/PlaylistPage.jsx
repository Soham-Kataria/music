import React, { useState, useEffect } from "react";
import PlaylistList from "../components/Playlist/PlaylistList";
import PlaylistForm from "../components/Playlist/PlaylistForm";
import PlaylistDetail from "../components/Playlist/PlaylistDetail";
import apiClient from "../api/apiClient";

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const res = await apiClient.get("/playlists");
      setPlaylists(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error("Failed to fetch playlists", err);
    }
  };

  const handleSelect = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsEditing(false);
    setMessage("");
  };

  const handleCreate = async (data) => {
    try {
      await apiClient.post("/playlists", data);
      await fetchPlaylists();
      setIsEditing(false);
      setMessage("Playlist created successfully!");
    } catch (err) {
      console.error("Failed to create playlist", err);
      setMessage("Failed to create playlist.");
    }
  };

const handleUpdate = async (data) => {
  if (!selectedPlaylist) return;
  try {
    // Update in backend and get updated playlist in the response
    const { data: updatedPlaylist } = await apiClient.put(
      `/playlists/${selectedPlaylist._id}`,
      data
    );

    // Update local list without extra GET
    await fetchPlaylists();
    setSelectedPlaylist(updatedPlaylist);

    setIsEditing(false);
    setMessage("Playlist updated successfully!");
  } catch (err) {
    console.error("Failed to update playlist", err);
    setMessage("Failed to update playlist.");
  }
};

  const handleDelete = async () => {
    if (!selectedPlaylist) return;
    try {
      await apiClient.delete(`/playlists/${selectedPlaylist._id}`);
      await fetchPlaylists();
      setSelectedPlaylist(null);
      setIsEditing(false);
      setMessage("Playlist deleted successfully!");
    } catch (err) {
      console.error("Failed to delete playlist", err);
      setMessage("Failed to delete playlist.");
    }
  };

  // New: Remove song handler
  const handleRemoveSong = async (songId) => {
    if (!selectedPlaylist) return;

    try {
      // Call backend API to remove song
      await apiClient.delete(`/playlists/${selectedPlaylist._id}/songs/${songId}`);

      // Update local playlist state to remove the song immediately
      const updatedSongs = selectedPlaylist.songs.filter(song => song.id !== songId);
      const updatedPlaylist = { ...selectedPlaylist, songs: updatedSongs };
      setSelectedPlaylist(updatedPlaylist);

      // Also update in playlists array for consistency
      setPlaylists((prev) =>
        prev.map((pl) => (pl._id === updatedPlaylist._id ? updatedPlaylist : pl))
      );

      setMessage("Song removed from playlist!");
    } catch (err) {
      console.error("Failed to remove song from playlist", err);
      setMessage("Failed to remove song.");
    }
  };

  return (
    <div className="page-container playlist-page">
      <div className="playlist-list-container">
        <PlaylistList playlists={playlists} onSelect={handleSelect} selected={selectedPlaylist?._id} />
        {!isEditing && (
          <button
            onClick={() => {
              setIsEditing(true);
              setSelectedPlaylist(null);
              setMessage("");
            }}
            className="common-button"
          >
            + Create Playlist
          </button>
        )}
        {isEditing && (
          <PlaylistForm
            onSubmit={selectedPlaylist ? handleUpdate : handleCreate}
            initialData={selectedPlaylist || {}}
            onCancel={() => {
              setIsEditing(false);
              setMessage("");
            }}
          />
        )}
      </div>

      <div className="playlist-detail-container">
        <PlaylistDetail playlist={selectedPlaylist} onRemoveSong={handleRemoveSong} isEditing={isEditing}  />

        {selectedPlaylist && !isEditing && (
          <>
            <button onClick={() => setIsEditing(true)} className="common-button" style={{ marginRight: "10px" }}>
              Edit Playlist
            </button>
            <button onClick={handleDelete} className="common-button delete-button">
              Delete Playlist
            </button>
          </>
        )}

        {message && (
          <p style={{ marginTop: "1rem", fontWeight: "600", color: "#1db954" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
