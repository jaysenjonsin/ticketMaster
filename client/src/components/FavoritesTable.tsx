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

  const removeItem = (id: string) => {
    localStorage.removeItem(id);
    const filtered = favorites!.filter((item) => item.id !== id);
    setFavorites(filtered);
  };
  return (
    <>
      {favorites ? (
        <>
          <div style={{ color: 'white' }}>FavoritesTable</div>
          {favorites.map((favorite) => {
            return (
              <div
                key={favorite.id}
                onClick={() => removeItem(favorite.id)}
                style={{ color: 'white' }}
              >
                {favorite.id}
              </div>
            );
          })}
        </>
      ) : (
        <div style={{ color: 'white' }}>No favorites to show</div>
      )}
    </>
  );
};

export default FavoritesTable;
