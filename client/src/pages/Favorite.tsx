import React from 'react';
import FavoritesTable from '../components/FavoritesTable';
import Layout from '../components/Layout';

type Props = {};

const Favorite = (props: Props) => {
  return (
    <Layout>
      <FavoritesTable />
    </Layout>
  );
};

export default Favorite;
