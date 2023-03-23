import { getAlbumCover } from '../services/getAlbumCover';

export const getArtistAlbums = async (artists: any[]) => {
  const results: any[] = [];
  for (const artist of artists) {
    const artistId = artist.id;
    const topThreeAlbums = await getAlbumCover(artistId);
    results.push(topThreeAlbums);
  }
  return results;
};
