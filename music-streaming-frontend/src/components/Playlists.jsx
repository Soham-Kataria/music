import React from 'react';
import Player from '../components/Player.jsx';        // If Player.jsx is directly under components
import Playlist from '../components/Playlist/Playlist.jsx';  // If Playlist.jsx inside Playlist folder

const PlaylistList = ({ playlists = [], onSelect }) => {
  if (!playlists.length) {
    return <p style={{ padding: '1rem', textAlign: 'center' }}>No playlists found</p>;
  }

  return (
    <div className="playlist-list">
      {playlists.map(playlist => (
        <div
          key={playlist.id}
          className="playlist-card"
          onClick={() => onSelect(playlist)}
          tabIndex={0}
          role="button"
          onKeyDown={e => { if(e.key === 'Enter') onSelect(playlist); }}
        >
          <img src={playlist.cover} alt={playlist.name} />
          <div className="playlist-title">{playlist.name}</div>
          <div className="playlist-subtitle">{playlist.songs.length} songs</div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;
