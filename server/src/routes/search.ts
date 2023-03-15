import express from 'express';
import {
  autoComplete,
  searchEvent,
  getLocation,
} from '../controllers/searchController';
const router = express.Router();

router.route('/').get(searchEvent);
router.route('/autocomplete').get(autoComplete);
router.get('/getlocation', getLocation);

export default router;
