import React from "react";

const PlaylistList = ({ playlists, onSelect, selected }) => {
  if (!Array.isArray(playlists) || playlists.length === 0) {
    return <p className="no-playlists">No playlists available.</p>;
  }

  return (
    <ul className="playlist-list">
      {playlists.map((playlist, index) =>
        playlist ? (
          <li
            key={playlist._id || index}
            onClick={() => onSelect(playlist)}
            className={`playlist-item ${selected === playlist._id ? "selected" : ""}`}
          >
            {playlist.name || "Unnamed Playlist"}
          </li>
        ) : null
      )}
    </ul>
  );
};

export default PlaylistList;
