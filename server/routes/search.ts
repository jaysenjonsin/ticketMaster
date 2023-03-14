import express from 'express';
import { searchEvent } from '../controllers/searchController';
const router = express.Router();

router.route('/').get(searchEvent);

export default router;
