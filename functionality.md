# Application Functionality Breakdown

This document outlines the core functionalities of the Music Streaming Application, separated into Frontend and Backend components.

## 🖥 Frontend Functionality (React + Vite)

### 1. User Authentication Interface
- **Registration & Login**: Forms for users to create an account and log in. Captures user input and handles validation before sending requests to the backend API.
- **Session Management**: Securely stores the JSON Web Token (JWT) on the client side (typically in local storage or cookies) and maintains the user session via React Context API (`AuthContext`).

### 2. Music Search & Discovery
- **Search Bar**: A dynamic input field allowing users to search for tracks, albums, or artists.
- **Search Results Display**: Renders grid/list layouts of retrieved songs with cover art, titles, and artist information.

### 3. Audio Playback
- **Persistent Player**: A global audio player component (often pinned to the bottom of the screen) that continues playing music as the user navigates across different pages.
- **Playback Controls**: Standard controls including Play, Pause, Next, Previous, Volume adjustment, and progress scrubbing.

### 4. Playlist Management UI
- **View Playlists**: A dedicated section to view all custom user playlists.
- **Create & Edit**: Modals or pages providing forms to create new playlists or edit existing ones.
- **Song Operations**: UI actions (e.g., context menus or buttons) to add a searched song into a selected playlist or remove a song from an existing playlist.

---

## ⚙️ Backend Functionality (Node.js + Express)

### 1. Authentication & Authorization API
- **`/api/auth/register`**: Hashes user passwords using `bcryptjs` and creates a new user document in MongoDB.
- **`/api/auth/login`**: Verifies user credentials and issues a JWT for authorized access.
- **Auth Middleware**: A `protect` middleware that intercepts protected route requests, verifies the incoming JWT, and attaches the user payload to the request object.

### 2. Song Search & Deezer Proxy API
- **`/api/search`**: Acts as a proxy to external music data providers (like the Deezer API). It receives search queries from the frontend, securely fetches data from the external API, formats it, and returns it to the client. This hides third-party API keys and circumvents CORS restrictions.

### 3. Playlist Management API
- **CRUD Operations (`/api/playlists`)**:
  - `GET /`: Retrieves all playlists belonging to the authenticated user.
  - `POST /`: Creates a new playlist document in MongoDB.
  - `PUT /:id` / `DELETE /:id`: Updates or deletes a specific playlist.
- **Playlist Song Management**:
  - `POST /:id/songs`: Appends a new song (by ID/metadata) to the playlist's song array.
  - `DELETE /:id/songs/:songId`: Removes a specific song from a playlist.

### 4. Database Interactions (MongoDB / Mongoose)
- **User Schema**: Stores user credentials, email, and preferences.
- **Playlist Schema**: Stores playlist metadata (name, description) and an array of associated song objects or IDs. Relates playlists back to the User who created them using an Object Reference.
