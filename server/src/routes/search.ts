import express from 'express';
import {
  autoComplete,
  searchEvent,
  getLocation,
  getExtraEventDetails,
} from '../controllers/searchController';
const router = express.Router();

router.route('/').get(searchEvent);
router.route('/autocomplete').get(autoComplete);
router.get('/getlocation', getLocation);
router.get('/extra+event+details', getExtraEventDetails);

export default router;
