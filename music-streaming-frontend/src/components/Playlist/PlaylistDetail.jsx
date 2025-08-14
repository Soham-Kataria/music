// import React, { useState } from "react";
// import Button from "../Common/Button";
// import Player from "../Player";

// const PlaylistDetail = ({ playlist, onRemoveSong, isEditing }) => {
//   const [currentIndex, setCurrentIndex] = useState(-1);
//   const [currentTrack, setCurrentTrack] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // When user clicks on a song
//   const onPlaySong = (song, index) => {
//     setCurrentIndex(index);
//     setCurrentTrack(song);
//     setIsPlaying(true);
//   };

//   const onPlayPause = () => {
//     setIsPlaying((prev) => !prev);
//   };

//   const onNext = () => {
//     if (!playlist || !playlist.songs.length) return;
//     const nextIndex = (currentIndex + 1) % playlist.songs.length;
//     setCurrentIndex(nextIndex);
//     setCurrentTrack(playlist.songs[nextIndex]);
//     setIsPlaying(true);
//   };

//   const onPrev = () => {
//     if (!playlist || !playlist.songs.length) return;
//     const prevIndex =
//       (currentIndex - 1 + playlist.songs.length) % playlist.songs.length;
//     setCurrentIndex(prevIndex);
//     setCurrentTrack(playlist.songs[prevIndex]);
//     setIsPlaying(true);
//   };

//   if (!playlist) return <p className="playlist-empty">Select a playlist to see details.</p>;

//   return (
//     <div className="playlist-detail">
//       <h2>{playlist.name}</h2>

//       {playlist.songs.length === 0 ? (
//         <p>No songs in this playlist.</p>
//       ) : (
//         <ul className="playlist-song-list">
//           {playlist.songs.map((song, index) => (
//             <li
//               key={song._id || song.id}
//               className={`playlist-song-item ${
//                 currentTrack && song.id === currentTrack.id ? "active" : ""
//               }`}
//               style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
//             >
//               <span
//                 onClick={() => onPlaySong(song, index)}
//                 style={{ flexGrow: 1 }}
//               >
//                 {song.title} - {song.artist}
//               </span>
              
//               {/* Show Remove button only in edit mode */}
//               {isEditing && onRemoveSong && (
//                 <Button
//                   className="remove-button"
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent triggering onPlaySong when clicking remove
//                     onRemoveSong(song.id);
//                   }}
//                 >
//                   Remove
//                 </Button>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}

//       <Player
//         currentTrack={currentTrack}
//         isPlaying={isPlaying}
//         onPlayPause={onPlayPause}
//         onNext={onNext}
//         onPrev={onPrev}
//       />
//     </div>
//   );
// };

// export default PlaylistDetail;

import React, { useState } from "react";
import Button from "../Common/Button";
import Player from "../Player";

const PlaylistDetail = ({ playlist, onRemoveSong }) => {
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  const [currentTrack, setCurrentTrack] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const onPlaySong = (song, index) => {
    setCurrentIndex(index);
    setCurrentTrack(song);
    setIsPlaying(true);
  };

  const onPlayPause = () => setIsPlaying((prev) => !prev);

  const onNext = () => {
    if (!playlist || !playlist.songs.length) return;
    const nextIndex = (currentIndex + 1) % playlist.songs.length;
    setCurrentIndex(nextIndex);
    setCurrentTrack(playlist.songs[nextIndex]);
    setIsPlaying(true);
  };

  const onPrev = () => {
    if (!playlist || !playlist.songs.length) return;
    const prevIndex = (currentIndex - 1 + playlist.songs.length) % playlist.songs.length;
    setCurrentIndex(prevIndex);
    setCurrentTrack(playlist.songs[prevIndex]);
    setIsPlaying(true);
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
          {playlist.songs.map((song, index) => (
            <li
              key={song._id || song.id}
              className={`playlist-song-item ${
                currentTrack && song.id === currentTrack.id ? "active" : ""
              }`}
              onClick={() => onPlaySong(song, index)}
              style={{ cursor: "pointer" }}
            >
              {song.title} - {song.artist}
              {onRemoveSong && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering onPlaySong
                    onRemoveSong(song.id);
                  }}
                  className="remove-song-button"
                  style={{ marginLeft: "10px" }}
                >
                  Remove
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}

      <Player
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={onPlayPause}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  );
};

export default PlaylistDetail;
