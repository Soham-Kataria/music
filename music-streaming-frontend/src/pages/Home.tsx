import React from "react";
import Search from "../components/Search/Search";
import { usePlayer } from "../context/PlayerContext";

const Home: React.FC = () => {
  const { playTrack } = usePlayer();

  return (
    <div className="page-container">
      <h1>Home</h1>
      <Search onTrackSelect={playTrack} />
    </div>
  );
};

export default Home;
