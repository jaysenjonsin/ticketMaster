import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Icon } from '@iconify/react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type Props = {
  extraArtistDetails: any;
};

const ArtistsTab = ({ extraArtistDetails: artists }: Props) => {
  console.log('ARTISTS ARTIST TAB: ', artists);
  return (
    <>
      {artists && artists.length > 0 ? (
        <Container style={{ width: '90%', padding: '1rem' }}>
          {/* indicators: gets rid of bottom indicators. interval: turns off auto switching items */}
          <Carousel indicators={false} interval={null}>
            {artists.map((artist: any) => (
              <Carousel.Item key={artist.id}>
                <Row className='align-items-center justify-content-center justify-content-md-start'>
                  {/* md = 3 because there are 4 items, so each should take 3/12 space */}
                  <Col xs={12} md={3}>
                    {/* for each item, align el's along cross axis */}
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
                    <div className='d-flex flex-column align-items-center '>
                      <h3 style={{ color: '#32c9a6' }}>Popularity</h3>
                      <div style={{ width: '4.5rem' }}>
                        <CircularProgressbar
                          value={artist.popularity}
                          text={`${artist.popularity}`}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={3}>
                    <div className='d-flex flex-column align-items-center'>
                      <h3 style={{ color: '#32c9a6' }}>Followers</h3>
                      {/* toLocaleString: adds the commas to the number */}
                      <p>{artist.followers.total.toLocaleString()}</p>
                    </div>
                  </Col>
                  <Col xs={12} md={3}>
                    <div className='d-flex flex-column align-items-center'>
                      <h4 style={{ color: '#32c9a6' }}>Spotify Link</h4>
                      <a
                        href={artist.external_urls.spotify}
                        target='_blank' //open link in new tab
                        rel='noreferrer' //prevents newly opened page from accessing opener window  by removing Referer HTTP header from the request
                      >
                        <Icon icon='mdi:spotify' color='#1db954' width='50' />
                      </a>
                    </div>
                  </Col>
                </Row>

                <Row className='justify-content-center mt-4 mt-md-5'>
                  <Col xs={12} md={4} className='text-center'>
                    <h4 style={{ color: '#32c9a6' }}>
                      Albums featuring {artist.name}
                    </h4>
                  </Col>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
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
