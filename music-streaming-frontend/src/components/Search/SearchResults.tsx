import React, { useState, useEffect } from "react";
import { playlistService } from "../../api/playlistService";
import Button from "../Common/Button";
import type { Track, Playlist } from "../../types";

interface SearchResultsProps {
  results: Track[];
  onTrackSelect: (track: Track, allTracks: Track[]) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onTrackSelect }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const data = await playlistService.getPlaylists();
      setPlaylists(data);
    } catch (err) {
      console.error("Failed to fetch playlists", err);
    }
  };

  const handleAddToPlaylist = async (songId: string) => {
    if (!selectedPlaylistId) {
      setMessage("Please select a playlist first.");
      return;
    }
    try {
      await playlistService.addSongToPlaylist(selectedPlaylistId, songId);
      setMessage("Song added to playlist!");
    } catch (err) {
      console.error("Failed to add song to playlist", err);
      setMessage("Failed to add song.");
    }
  };

  if (!results || results.length === 0) {
    return <p>No results found</p>;
  }

  return (
    <div>
      {/* Playlist Dropdown */}
      <div style={{ marginBottom: "1rem" }}>
        <select
          className="common-button"
          value={selectedPlaylistId}
          onChange={(e) => {
            setSelectedPlaylistId(e.target.value);
            setMessage("");
          }}
        >
          <option className="common-button" value="">Select Playlist</option>
          {playlists.map((pl) => (
            <option key={pl._id} value={pl._id}>
              {pl.name}
            </option>
          ))}
        </select>
        {message && (
          <p style={{ color: "green", marginTop: "0.5rem" }}>{message}</p>
        )}
      </div>

      {/* Search Results List */}
      <ul className="search-results">
        {results.map((track, index) => (
          <li
            key={track.id || track._id || `${track.title}-${index}`}
            className="search-result-item"
          >
            {/* Clickable track name to play */}
            <div
              className="search-result-info"
              onClick={() => onTrackSelect(track, results)}
              style={{ cursor: "pointer" }}
            >
              <span className="search-result-title">{track.title}</span>
              {track.artist && (
                <span className="search-result-artist"> - {track.artist}</span>
              )}
            </div>

            {/* Add to Playlist button */}
            <Button
              style={{ marginLeft: "auto" }}
              onClick={() => handleAddToPlaylist(track.id)}
            >
              Add
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
