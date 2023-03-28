import React from 'react';
import FavoritesTable from '../components/FavoritesTable';
import Layout from '../components/Layout';

type Props = {};

const FavoritePage = (props: Props) => {
  return (
    <Layout>
      <FavoritesTable />
    </Layout>
  );
};

export default FavoritePage;
