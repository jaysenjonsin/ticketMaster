import { getArtistData } from '../services/getArtistData';

export const getRelevantArtists = async (
  arrOfArtists: Array<any>,
  event: any
) => {
  const validResults = [];
  for (let i = 0; i < arrOfArtists.length; i++) {
    //check if curr attraction is music related
    if (arrOfArtists[i].classifications[0].segment.name !== 'Music') {
      continue;
    }
    const listOfArtists = await getArtistData(arrOfArtists[i].name);
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
