// ── Domain Types ──────────────────────────────────────────────

export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  dateOfBirth?: string;
  createdAt?: string;
}

export interface Track {
  id: string;
  _id?: string;
  title: string;
  artist?: string;
  preview?: string;    // audio preview URL (from Deezer/external API)
  audioUrl?: string;   // alternative audio URL field
  album?: string;
  duration?: number;
}

export interface Song {
  _id?: string;
  id: string;
  title: string;
  artist?: string;
  preview?: string;
  audioUrl?: string;
}

export interface Playlist {
  _id: string;
  name: string;
  description?: string;
  cover?: string;
  songs: Song[];
}

// ── Auth Types ────────────────────────────────────────────────

export interface AuthContextValue {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// ── API Types ─────────────────────────────────────────────────

export interface ApiErrorResponse {
  message?: string;
  error?: string;
}
