import React from "react";
import Button from "../Common/Button";
import { usePlayer } from "../../context/PlayerContext";
import type { Playlist, Song, Track } from "../../types";

interface PlaylistDetailProps {
  playlist: Playlist | null;
  onRemoveSong?: (songId: string) => void;
  isEditing?: boolean;
}

const PlaylistDetail: React.FC<PlaylistDetailProps> = ({ playlist, onRemoveSong, isEditing }) => {
  const { playTrack, currentTrack } = usePlayer();

  const handlePlaySong = (song: Song) => {
    if (!playlist) return;
    
    // Map Song to Track type for the player
    const track: Track = {
      id: song.id || song._id || "",
      _id: song._id,
      title: song.title,
      artist: song.artist,
      preview: song.preview || song.audioUrl,
    };

    // Convert playlist songs to Tracks for the player queue
    const queue: Track[] = playlist.songs.map(s => ({
      id: s.id || s._id || "",
      _id: s._id,
      title: s.title,
      artist: s.artist,
      preview: s.preview || s.audioUrl,
    }));

    playTrack(track, queue);
  };

  if (!playlist) return <p className="playlist-empty">Select a playlist to see details.</p>;

  return (
    <div className="playlist-detail">
      <h2>{playlist.name}</h2>
      {playlist.description && <p className="playlist-description">Description - {playlist.description}</p>}

      {playlist.songs.length === 0 ? (
        <p>No songs in this playlist.</p>
      ) : (
        <ul className="playlist-song-list">
          {playlist.songs.map((song) => {
            const songId = song.id || song._id;
            const isActive = currentTrack && songId === currentTrack.id;
            
            return (
              <li
                key={songId}
                className={`playlist-song-item ${isActive ? "active" : ""}`}
                onClick={() => handlePlaySong(song)}
                style={{ cursor: "pointer" }}
              >
                {song.title} - {song.artist}
                {onRemoveSong && isEditing && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSong(songId!);
                    }}
                    className="remove-song-button"
                    style={{ marginLeft: "10px" }}
                  >
                    Remove
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PlaylistDetail;
