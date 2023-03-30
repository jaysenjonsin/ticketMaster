import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
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
    window.alert('Event Removed From Favorites!');
    localStorage.removeItem(id);
    const filtered = favorites!.filter((item) => item.id !== id);
    setFavorites(filtered);
  };
  return (
    <>
      {favorites ? (
        <Table striped variant='light'>
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th>#</th>
              <th>Date</th>
              <th>Event</th>
              <th>Category</th>
              <th>Venue</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {favorites?.map((favorite, idx) => {
              return (
                <tr key={favorite.id} style={{ textAlign: 'center' }}>
                  <td>{idx + 1}</td>
                  <td>{favorite.date}</td>
                  <td>{favorite.event}</td>
                  <td>{favorite.category}</td>
                  <td>{favorite.venue}</td>
                  <td
                    style={{ cursor: 'pointer', margin: '0 auto' }}
                    onClick={() => removeItem(favorite.id)}
                  >
                    <span className='material-icons'>delete_outline</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div style={{ color: 'white' }}>no favorites</div>
      )}
    </>
  );
};

export default FavoritesTable;
