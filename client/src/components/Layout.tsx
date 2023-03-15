import React from 'react';
import NavBar from './NavBar';

type props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};
const Layout = ({ children }: props) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default Layout;
