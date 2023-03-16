import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

type Props = {
  event: any;
};

const EventsTab = ({ event }: Props) => {
  return (
    <Container
      style={{
        width: '80%',
      }}
    >
      <Row>
        <Col
          xs={12}
          md={6}
          className='mx-auto my-auto'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '2rem 0',
          }}
        >
          <h3>Date</h3>
          <p>{event?.dates.start.localDate}</p>
          <h3>Artists/Team</h3>
          {/* Add your artist/team content here */}
          <h3>Venue</h3>
          <p>{event?._embedded.venues[0].name}</p>
          <h3>Genre</h3>
          <p>{event?.classifications[0].segment.name}</p>
          <h3>Price Ranges</h3>
          {/* Add your price range content here */}
          <h3>Ticket Status</h3>
          {/* Add your ticket status content here */}
          <h3>Buy Tickets at</h3>
          {/* Add your buy tickets content here */}
        </Col>
        <Col
          xs={12}
          md={6}
          className='mx-auto my-auto'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={event?.images[0].url}
            alt='event image'
            style={{
              objectFit: 'cover',
              borderRadius: '400px',
              height: '15rem',
              width: '15rem',
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default EventsTab;
