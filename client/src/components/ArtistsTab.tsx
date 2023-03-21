import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Icon } from '@iconify/react';

type Props = {
  extraArtistDetails: any;
};

const ArtistsTab = ({ extraArtistDetails: artist }: Props) => {
  console.log('ARTIST: ', artist);
  return (
    <>
      {artist ? (
        <Container style={{ width: '90%', padding: '1rem' }}>
          <Row className='align-items-center justify-content-center justify-content-md-start'>
            <Col xs={12} md={3}>
              <div className='d-flex flex-column align-items-center'>
                <img
                  src={artist.images[0].url}
                  alt='artist image'
                  style={{
                    objectFit: 'cover',
                    borderRadius: '400px',
                    height: '10rem',
                    width: '10rem',
                  }}
                />
                <h2 style={{ color: '#32c9a6' }}>{artist.name}</h2>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <div className='d-flex flex-column align-items-center'>
                <h3 style={{ color: '#32c9a6' }}>Popularity</h3>
                <p>{artist.popularity}</p>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <div className='d-flex flex-column align-items-center'>
                <h3 style={{ color: '#32c9a6' }}>Followers</h3>
                <p>{artist.followers.total}</p>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <div className='d-flex flex-column align-items-center'>
                <h4 style={{ color: '#32c9a6' }}>Spotify Link</h4>
                <a
                  href={artist.external_urls.spotify}
                  target='_blank'
                  rel='noreferrer'
                >
                  <Icon icon='mdi:spotify' color='#1db954' width='50' />
                </a>
              </div>
            </Col>
          </Row>
          <Row className='justify-content-center mt-4 mt-md-5'>
            <Col xs={12} md={8} className='text-center'>
              <h1>row 2</h1>
            </Col>
          </Row>
        </Container>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '6rem 0px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              color: 'red',
              borderRadius: '1rem',
              width: '70%',
              maxWidth: '800px',
            }}
          >
            No music related artists details to show
          </div>
        </div>
      )}
    </>
  );
};

export default ArtistsTab;
