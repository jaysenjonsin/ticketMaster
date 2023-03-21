import { getSpotifyData } from '../services/getSpotifyData';

export const getRelevantArtists = async (
  arrOfArtists: Array<any>,
  event: any
) => {
  const validResults = [];
  for (let i = 0; i < arrOfArtists.length; i++) {
    const listOfArtists = await getSpotifyData(arrOfArtists[i].name);
    if (
      listOfArtists.artists.items[0].name.toLowerCase() ===
      event._embedded.attractions[i].name.toLowerCase()
    )
      validResults.push(arrOfArtists[i]);
  }
  return validResults;
};
