import axios from 'axios';
import { API_URL } from '../utils/constants';

export const getAlbumCover = async (id: number) => {
  const { data } = await axios.get(API_URL + 'search/albums', {
    params: {
      id,
    },
  });
  console.log('DATA FROM GET ALBUM DATA: ', data);
  return data;
};
