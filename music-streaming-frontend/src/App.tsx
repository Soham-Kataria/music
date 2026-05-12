import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PlaylistPage from "./pages/PlaylistPage";
import ProfilePage from "./pages/ProfilePage";
import "./index.css";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="content-area">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/playlists"
                  element={
                    <ProtectedRoute>
                      <PlaylistPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Player />
          </div>
        </Router>
      </PlayerProvider>
    </AuthProvider>
  );
};

export default App;
