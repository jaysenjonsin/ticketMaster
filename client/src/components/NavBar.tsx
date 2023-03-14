import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Nav style={{ marginLeft: 'auto' }}>
            <Nav.Link
              href='#home'
              style={{
                border: '1px solid white',
                borderRadius: '15px',
                color: 'white',
              }}
            >
              Search
            </Nav.Link>
            <Nav.Link href='#features' style={{ color: 'white' }}>
              Favorites
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
