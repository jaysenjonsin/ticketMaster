import express from 'express';
import {
  autoComplete,
  searchEvent,
  getLocation,
  getExtraEventDetails,
  getExtraVenueDetails,
  getArtistData,
  refreshSpotifyCredentials,
  getTopThreeAlbums,
} from '../controllers/searchController';
const router = express.Router();

router.route('/').get(searchEvent);
router.route('/autocomplete').get(autoComplete);
router.get('/getlocation', getLocation);
router.get('/extraEventDetails', getExtraEventDetails);
router.get('/extraVenueDetails', getExtraVenueDetails);
router.get('/spotify', getArtistData);
router.get('/spotify/refresh', refreshSpotifyCredentials);
router.get('/albums', getTopThreeAlbums)

export default router;
