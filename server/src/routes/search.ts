import express from 'express';
import {
  autoComplete,
  searchEvent,
  getLocation,
  getExtraEventDetails,
  getExtraVenueDetails,
  getSpotifyData,
} from '../controllers/searchController';
const router = express.Router();

router.route('/').get(searchEvent);
router.route('/autocomplete').get(autoComplete);
router.get('/getlocation', getLocation);
router.get('/extraEventDetails', getExtraEventDetails);
router.get('/extraVenueDetails', getExtraVenueDetails);
router.get('/spotify', getSpotifyData)

export default router;
