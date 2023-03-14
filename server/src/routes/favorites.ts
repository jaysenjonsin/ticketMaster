import express from 'express';
import { getFavorites } from '../controllers/favoritesController';
const router = express.Router();

router.route('/').get(getFavorites);

export default router;
