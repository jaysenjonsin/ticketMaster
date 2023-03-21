import SpotifyWebApi from 'spotify-web-api-node';
//dotenv not working with this API
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from './secrets';

export const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
});

// Retrieve an access token. if access token runs out, paste this into the controller and make get request on postman
spotifyApi.clientCredentialsGrant().then(
  (data) => {
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  (err) => {
    console.log('Something went wrong when retrieving an access token', err);
  }
);
