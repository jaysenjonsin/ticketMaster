import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 style={{ color: 'white' }}>Page not found</h1>
      <Link to='/search' style={{ color: 'white' }}>
        Return home
      </Link>
    </div>
  );
};

export default NotFound;
