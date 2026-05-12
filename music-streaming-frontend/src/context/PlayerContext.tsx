import React, { createContext, useState, useContext, ReactNode } from "react";
import type { Track } from "../types";

interface PlayerContextValue {
  currentTrack: Track | null;
  playlist: Track[];
  isPlaying: boolean;
  currentIndex: number;
  playTrack: (track: Track, tracksArray?: Track[]) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track: Track, tracksArray: Track[] = []) => {
    if (tracksArray.length) {
      setPlaylist(tracksArray);
      const index = tracksArray.findIndex((t) => t.id === track.id);
      setCurrentIndex(index);
    } else {
      setPlaylist([track]);
      setCurrentIndex(0);
    }
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const nextTrack = () => {
    if (playlist.length > 0) {
      const nextIndex = (currentIndex + 1) % playlist.length;
      setCurrentIndex(nextIndex);
      setCurrentTrack(playlist[nextIndex]);
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    if (playlist.length > 0) {
      const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      setCurrentIndex(prevIndex);
      setCurrentTrack(playlist[prevIndex]);
      setIsPlaying(true);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        playlist,
        isPlaying,
        currentIndex,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
