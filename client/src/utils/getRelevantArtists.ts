import { getSpotifyData } from '../services/getSpotifyData';

export const getRelevantArtists = async (
  arrOfArtists: Array<any>,
  event: any
) => {
  const validResults = [];
  for (let i = 0; i < arrOfArtists.length; i++) {
    const listOfArtists = await getSpotifyData(arrOfArtists[i].name);
    console.log('LIST OF ARTISTS: ', listOfArtists);
    if (
      listOfArtists.artists.items[0].name.toLowerCase() ===
      event._embedded.attractions[i].name.toLowerCase()
    )
      validResults.push(listOfArtists.artists.items[0]);
  }
  console.log('VALID RESULTS: ', validResults);
  return validResults;
};
