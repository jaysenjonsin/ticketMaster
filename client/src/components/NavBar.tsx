import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
  return (
    <>
      <Navbar
        bg='dark'
        variant='dark'
        style={{ top: '0px', position: 'sticky' }}
      >
        <Container>
          <Nav style={{ marginLeft: 'auto' }}>
            <Nav.Link
              href=''
              style={{
                border: '1px solid white',
                borderRadius: '1rem',
                color: 'white',
              }}
            >
              Search
            </Nav.Link>
            <Nav.Link href='' style={{ color: 'white' }}>
              Favorites
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
