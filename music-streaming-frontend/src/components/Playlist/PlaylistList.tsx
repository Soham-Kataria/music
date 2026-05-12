import React from "react";
import type { Playlist } from "../../types";

interface PlaylistListProps {
  playlists: Playlist[];
  onSelect: (playlist: Playlist) => void;
  selected?: string;
}

const PlaylistList: React.FC<PlaylistListProps> = ({ playlists, onSelect, selected }) => {
  if (!Array.isArray(playlists) || playlists.length === 0) {
    return (
      <p style={{ padding: "1rem", textAlign: "center" }}>
        No playlists found
      </p>
    );
  }

  return (
    <div className="playlist-list">
      {playlists.map((playlist, index) =>
        playlist ? (
          <div
            key={playlist._id || index}
            className={`playlist-card ${selected === playlist._id ? "selected" : ""}`}
            onClick={() => onSelect(playlist)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(playlist);
              }
            }}
          >
            <div className="playlist-cover-wrapper">
              {playlist.cover ? (
                <img src={playlist.cover} alt={playlist.name} className="playlist-cover" />
              ) : (
                <div className="playlist-cover-placeholder">
                   <span>{playlist.name?.charAt(0) || "P"}</span>
                </div>
              )}
            </div>
            <div className="playlist-info">
              <div className="playlist-title">{playlist.name || "Unnamed Playlist"}</div>
              <div className="playlist-subtitle">
                {playlist.songs?.length || 0} songs
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default PlaylistList;

