// import React, { useState, useEffect, useRef } from "react";
// import Button from "./Common/Button";
// import Loader from "./Common/Loader";

// const Player = ({ currentTrack, onNext, onPrev, isPlaying, onPlayPause }) => {
//   const audioRef = useRef(null);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.play().catch(() => setLoading(false));
//       } else {
//         audioRef.current.pause();
//       }
//     }
//   }, [isPlaying, currentTrack]);

//   const onTimeUpdate = () => {
//     if (audioRef.current) {
//       setProgress(audioRef.current.currentTime);
//     }
//   };

//   const onLoadedMetadata = () => {
//     if (audioRef.current) {
//       setDuration(audioRef.current.duration);
//       setLoading(false);
//     }
//   };

//   const onSeek = (e) => {
//     const time = e.target.value;
//     if (audioRef.current) {
//       audioRef.current.currentTime = time;
//       setProgress(time);
//     }
//   };

//   if (!currentTrack) {
//     return <div className="player-no-track">No track selected</div>;
//   }

//   return (
//     <div className="player-container">
//       <h3>{currentTrack.title}</h3>
//       <p>{currentTrack.artist}</p>

//       {loading && <Loader />}

//       <audio
//         ref={audioRef}
//         src={currentTrack.audioUrl}
//         onTimeUpdate={onTimeUpdate}
//         onLoadedMetadata={onLoadedMetadata}
//         onWaiting={() => setLoading(true)}
//         onPlaying={() => setLoading(false)}
//       />

//       <input
//         type="range"
//         min="0"
//         max={duration}
//         value={progress}
//         onChange={onSeek}
//         className="player-progress"
//       />

//       <div className="player-controls">
//         <Button onClick={onPrev} className="player-button">
//           Prev
//         </Button>
//         <Button onClick={onPlayPause} className="player-button">
//           {isPlaying ? "Pause" : "Play"}
//         </Button>
//         <Button onClick={onNext} className="player-button">
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Player;


import React, { useState, useEffect, useRef } from "react";
import Button from "./Common/Button";
import Loader from "./Common/Loader";

const Player = ({ currentTrack, onNext, onPrev, isPlaying, onPlayPause }) => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setLoading(false);
              setError(null);
              console.log("Playback started");
            })
            .catch((err) => {
              setLoading(false);
              setError("Playback failed: " + err.message);
              console.error("Playback error:", err);
            });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setLoading(false);
    }
  };

  const onSeek = (e) => {
    const time = e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  if (!currentTrack) {
    return <div className="player-no-track">No track selected</div>;
  }

  return (
    <div className="player-container">
      <h3>{currentTrack.title}</h3>
      <p>{currentTrack.artist}</p>

      {loading && <Loader />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <audio
        ref={audioRef}
        src={currentTrack.preview}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onWaiting={() => setLoading(true)}
        onPlaying={() => setLoading(false)}
      />

      <input
        type="range"
        min="0"
        max={duration}
        value={progress}
        onChange={onSeek}
        className="player-progress"
      />

      <div className="player-controls">
        <Button onClick={onPrev} className="player-button">
          Prev
        </Button>
        <Button onClick={onPlayPause} className="player-button">
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button onClick={onNext} className="player-button">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Player;
