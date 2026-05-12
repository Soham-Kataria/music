# Music Streaming Application

A full-stack music streaming platform that allows users to search for songs, manage personal playlists, and play music. The application consists of a React frontend and a Node.js/Express backend, integrating with a Deezer proxy for music data.

## 🗂 Project Structure

The repository is organized into two main directories:

- **[`/backend`](./backend)**: Express.js REST API with MongoDB.
- **[`/music-streaming-frontend`](./music-streaming-frontend)**: React frontend built using Vite.

## ✨ Features

- **User Authentication:** Secure user registration and login using JWT and bcrypt.
- **Music Search:** Search for songs/tracks via a Deezer API proxy.
- **Playlist Management:** Create, update, view, and organize custom playlists.
- **Audio Player:** Built-in audio player controls for continuous music playback.
- **Modern UI:** Modular component architecture with reusable UI elements.

## 🛠 Tech Stack

**Frontend:**

- React 19
- Vite
- Axios (API client)
- Context API (State management)

**Backend:**

- Node.js & Express.js
- MongoDB & Mongoose (Database)
- JSON Web Tokens (JWT)
- bcryptjs (Password hashing)
- Morgan & CORS

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)

### 1. Backend Setup

1. Open a terminal and navigate to the backend folder:
    ```bash
    cd backend
    ```
2. Install the required dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
   Create a `.env` file in the `backend/` directory and configure the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    NODE_ENV=development
    ```
4. Start the backend development server:
    ```bash
    npm run dev
    ```
    _The API will be running at `http://localhost:5000`._

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
    ```bash
    cd music-streaming-frontend
    ```
2. Install the required dependencies:
    ```bash
    npm install
    ```
3. Start the Vite development server:
    ```bash
    npm run dev
    ```
    _The frontend application will be available at `http://localhost:5173` (default)._

## 📄 License

This project is licensed under the MIT License.
