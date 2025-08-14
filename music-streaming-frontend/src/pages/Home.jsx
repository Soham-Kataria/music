// import React, { useState } from "react";
// import Search from "../components/Search/Search";
// import Player from "../components/Player";

// const Home = () => {
//   const [playlist, setPlaylist] = useState([]); // all tracks from search or saved list
//   const [currentIndex, setCurrentIndex] = useState(-1); // index of the current track
//   const [currentTrack, setCurrentTrack] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // When user selects a track from search results
//   const handleTrackSelect = (track, tracksArray = []) => {
//     setPlaylist(tracksArray.length ? tracksArray : [track]);
//     const index = tracksArray.length
//       ? tracksArray.findIndex((t) => t.id === track.id)
//       : 0;
//     setCurrentIndex(index);
//     setCurrentTrack(track);
//     setIsPlaying(true);
//   };

//   const handlePlayPause = () => {
//     setIsPlaying((prev) => !prev);
//   };

//   const handleNext = () => {
//     if (playlist.length > 0) {
//       const nextIndex = (currentIndex + 1) % playlist.length;
//       setCurrentIndex(nextIndex);
//       setCurrentTrack(playlist[nextIndex]);
//       setIsPlaying(true);
//     }
//   };

//   const handlePrev = () => {
//     if (playlist.length > 0) {
//       const prevIndex =
//         (currentIndex - 1 + playlist.length) % playlist.length;
//       setCurrentIndex(prevIndex);
//       setCurrentTrack(playlist[prevIndex]);
//       setIsPlaying(true);
//     }
//   };

//   return (
//     <div className="page-container">
//       <Search onTrackSelect={handleTrackSelect} />

//       {/* Search onTrackSelect={(track, allTracks) => handleTrackSelect(track, allTracks)} /> */}
//       <Player
//         currentTrack={currentTrack}
//         isPlaying={isPlaying}
//         onPlayPause={handlePlayPause}
//         onNext={handleNext}
//         onPrev={handlePrev}
//       />
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import Search from "../components/Search/Search";
import Player from "../components/Player";

const Home = () => {
  const [playlist, setPlaylist] = useState([]); // all tracks from search or saved list
  const [currentIndex, setCurrentIndex] = useState(-1); // index of the current track
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // When user selects a track from search results
  const handleTrackSelect = (track, tracksArray = []) => {
    setPlaylist(tracksArray.length ? tracksArray : [track]);
    const index = tracksArray.length
      ? tracksArray.findIndex((t) => t.id === track.id)
      : 0;
    setCurrentIndex(index);
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNext = () => {
    if (playlist.length > 0) {
      const nextIndex = (currentIndex + 1) % playlist.length;
      setCurrentIndex(nextIndex);
      setCurrentTrack(playlist[nextIndex]);
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    if (playlist.length > 0) {
      const prevIndex =
        (currentIndex - 1 + playlist.length) % playlist.length;
      setCurrentIndex(prevIndex);
      setCurrentTrack(playlist[prevIndex]);
      setIsPlaying(true);
    }
  };

  return (
    <div className="page-container">
      <Search onTrackSelect={handleTrackSelect} />

      <Player
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

export default Home;
