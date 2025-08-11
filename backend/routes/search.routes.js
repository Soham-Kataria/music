import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { searchSongs } from '../controllers/playlists.controller.js'; // or separate controller

const router = express.Router();

router.get('/', protect, searchSongs);

export default router;
