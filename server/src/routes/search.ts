import express from 'express';
import { autoComplete, searchEvent } from '../controllers/searchController';
const router = express.Router();

router.route('/').get(searchEvent);
router.route('/autocomplete').get(autoComplete);

export default router;
