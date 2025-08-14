import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // adjust path if needed

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">MyMusicPlayer</div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/playlists" className="nav-link">Playlists</Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link">Profile</Link>
        </li>
        <li>
          {user ? (
            <Link to="/login" className="nav-link">Logout</Link>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
