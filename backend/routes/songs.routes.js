import express from 'express';
import { searchSongs, getSongDetails } from '../controllers/songs.controller.js';

const router = express.Router();

// public search
router.get('/search', searchSongs);
// track details
router.get('/:id', getSongDetails);

export default router;