# Application Data & User Flow

This document outlines the step-by-step flow of data and user interactions across the Music Streaming Application.

## 1. Authentication Flow

1. **User Action**: The user fills out the login/register form on the Frontend and clicks "Submit".
2. **Client Request**: The Frontend Axios client sends a `POST` request with credentials to `/api/auth/login` or `/register`.
3. **Server Validation**: The Backend Express server receives the request, queries MongoDB (via Mongoose) to find the user, and verifies the password hash using `bcryptjs`.
4. **Token Generation**: Upon success, the Backend signs a JWT (JSON Web Token) with a secret key and returns it in the HTTP response.
5. **Client State Update**: The Frontend receives the JWT, stores it (e.g., in `localStorage`), and updates the global `AuthContext`. The user is immediately redirected to the Home/Dashboard view.

## 2. Music Search Flow

1. **User Action**: The user types a query (e.g., "Coldplay") into the Search Bar.
2. **Client Request**: The Frontend triggers a `GET` request to the Backend at `/api/search?q=Coldplay`, attaching the JWT in the `Authorization: Bearer <token>` header.
3. **Backend Proxy**: The Backend `protect` middleware verifies the token. The Search Controller then makes a server-side HTTP request (using Axios) to the external Deezer API.
4. **Data Retrieval**: The external API returns the track results to the Backend. The Backend formats the JSON and sends it back to the Frontend.
5. **UI Rendering**: The Frontend React components map over the returned JSON array and render the `SearchResults` grid.

## 3. Audio Playback Flow

1. **User Action**: The user clicks on a track card from the Search Results or a Playlist.
2. **State Dispatch**: The local component triggers a function that updates the global Player state (or context) with the selected track's audio stream URL and metadata (title, artist, cover image).
3. **Player Mount**: The persistent `<Player />` component detects the new track data.
4. **Audio Execution**: The HTML5 Audio API (wrapped by React) begins buffering and playing the audio stream. The user can interact with play/pause/scrub controls, which locally update the audio element's state.

## 4. Playlist Management Flow

**Creating a Playlist:**
1. **User Action**: The user clicks "New Playlist", enters a name, and saves.
2. **Client Request**: A `POST` request is sent to `/api/playlists` with the playlist name and the user's JWT.
3. **Database Update**: The Backend verifies the user, creates a new Mongoose `Playlist` document linked to the user's ID, and saves it to MongoDB.
4. **UI Refresh**: The Backend responds with the new playlist data. The Frontend adds it to the local state and updates the UI instantly.

**Adding a Song to a Playlist:**
1. **User Action**: The user opens a context menu on a song and selects "Add to Playlist" -> "My Workout Mix".
2. **Client Request**: The Frontend sends a `POST` request to `/api/playlists/<playlist_id>/songs` with the song's metadata/ID.
3. **Database Update**: The Backend retrieves the playlist from MongoDB, pushes the new song into the `songs` array, and saves the document.
4. **Confirmation**: The Frontend receives a success response and displays a toast notification (e.g., "Song added successfully!").
