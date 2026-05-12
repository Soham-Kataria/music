# Music Streaming Frontend

This is the React frontend for the Music Streaming Application, built using Vite. It handles user authentication, playlist management, song searching (via Deezer), and an audio playback interface.

## 🗂 Key Directories

- `/src/components`: UI components organized by feature (Auth, Player, Playlist, Search, Common).
- `/src/pages`: Top-level page views (Home, Login, Register, PlaylistPage).
- `/src/context`: React Context for global state (e.g., `AuthContext`).
- `/src/api`: Axios client configuration and API interceptors.
- `/src/utils`: Helper functions and formatting utilities.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)

### Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment (if needed):
   Create a `.env` file in this directory and define any required variables (e.g., API base URL). By default, the API calls are configured in `/src/api/apiClient.js` (typically pointing to `http://localhost:5000/api`).

3. Run the development server:
   ```bash
   npm run dev
   ```

## 🛠 Available Scripts

- `npm run dev`: Starts the local development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles the application for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint to check for code quality issues.

---
*For the complete project overview and backend setup, please refer to the [Root README](../README.md).*
