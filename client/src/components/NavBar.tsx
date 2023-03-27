import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router';

const NavBar = () => {
  // get current path
  const route = useLocation();
  return (
    <>
      <Navbar
        bg='dark'
        variant='dark'
        style={{
          top: '0px',
          position: 'sticky',
          zIndex: '99',
          backgroundColor: 'red',
        }}
      >
        <Container>
          <Nav style={{ marginLeft: 'auto' }}>
            <Nav.Link
              href='/search'
              style={{
                border:
                  route.pathname === '/search' ? '1px solid white' : 'none',
                borderRadius: '1rem',
                color: 'white',
              }}
            >
              Search
            </Nav.Link>
            <Nav.Link
              href='/favorites'
              style={{
                border:
                  route.pathname === '/favorites' ? '1px solid white' : 'none',
                borderRadius: '1rem',
                color: 'white',
              }}
            >
              Favorites
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;

// 1px solid white',
