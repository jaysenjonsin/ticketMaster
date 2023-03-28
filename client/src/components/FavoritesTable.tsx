import React, { useEffect, useState } from 'react';
import { sortLocalStorage } from '../utils/sortLocalStorage';

type Props = {};

const FavoritesTable = (props: Props) => {
  const [favorites, setFavorites] = useState<any[] | null>(null);

  useEffect(() => {
    const sortedFavorites = sortLocalStorage();
    if (sortedFavorites) setFavorites(sortedFavorites);
    console.log('FAVS ', favorites);
  }, []);
  return (
    <>
      {favorites ? (
        <>
          <div style={{ color: 'white' }}>hello</div>
          {/* <div style={{ color: 'white' }}>FavoritesTable</div>
          {favorites.map((favorite, index) => {
            return (
              <div key={index} style={{ color: 'white' }}>
                {favorite}
              </div>
            );
          })} */}
        </>
      ) : (
        <div style={{ color: 'white' }}>No favorites to show</div>
      )}
    </>
  );
};

export default FavoritesTable;
