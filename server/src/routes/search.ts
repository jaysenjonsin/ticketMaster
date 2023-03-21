import express from 'express';
import {
  autoComplete,
  searchEvent,
  getLocation,
  getExtraEventDetails,
  getExtraVenueDetails,
  getSpotifyData,
  refreshSpotifyCredentials,
} from '../controllers/searchController';
const router = express.Router();

router.route('/').get(searchEvent);
router.route('/autocomplete').get(autoComplete);
router.get('/getlocation', getLocation);
router.get('/extraEventDetails', getExtraEventDetails);
router.get('/extraVenueDetails', getExtraVenueDetails);
router.get('/spotify', getSpotifyData);
router.get('/spotify/refresh', refreshSpotifyCredentials);

export default router;
