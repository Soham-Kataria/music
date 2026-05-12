import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

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
            <button onClick={logout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
