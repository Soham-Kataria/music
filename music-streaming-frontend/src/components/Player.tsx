import React, { useEffect, useRef, useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import Button from "./Common/Button";
import Loader from "./Common/Loader";

const Player: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack } = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setLoading(false);
              setError(null);
            })
            .catch((err: Error) => {
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

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  if (!currentTrack) {
    return (
      <div className="player-container no-track">
        <p>No track selected</p>
      </div>
    );
  }

  return (
    <div className="player-container">
      <div className="player-info">
        <h3>{currentTrack.title}</h3>
        <p>{currentTrack.artist}</p>
      </div>

      {loading && <Loader />}
      {error && <p className="player-error">{error}</p>}

      <audio
        ref={audioRef}
        src={currentTrack.preview}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onWaiting={() => setLoading(true)}
        onPlaying={() => setLoading(false)}
        onEnded={nextTrack}
      />

      <div className="player-controls-wrapper">
        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={onSeek}
          className="player-progress"
        />

        <div className="player-controls">
          <Button onClick={prevTrack} className="player-button">
            Prev
          </Button>
          <Button onClick={togglePlay} className="player-button">
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button onClick={nextTrack} className="player-button">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Player;
