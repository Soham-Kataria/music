import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { searchSongs, getSongDetails } from '../controllers/song.controller.js';

const router = express.Router();

router.get('/', protect, searchSongs);
router.get('/:id', getSongDetails);

export default router;
