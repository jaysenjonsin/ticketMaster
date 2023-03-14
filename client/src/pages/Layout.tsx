import React from 'react';
import NavBar from '../components/Navbar';

type props = {
  children: React.ReactNode;
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
