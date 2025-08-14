import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PlaylistPage from "./pages/PlaylistPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/playlists" element={<PlaylistPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;
