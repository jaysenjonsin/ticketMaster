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
          <p>{event?.dates?.start?.localDate}</p>
          <h3>Artists/Team</h3>
          {/* artist/team content here  ?? where are names --> Map through _embedded.attractions array*/}
          <h3>Venue</h3>
          <p>{event?._embedded.venues[0]?.name ?? 'Unknown Venue'}</p>
          <h3>Genre</h3>
          {/* "segment", "genre", "subGenre", "type",
"subType" */}
          <p>
            {event?.classifications[0]?.segment?.name} |{' '}
            {event?.classifications[0]?.genre?.name} |{' '}
            {event?.classifications[0]?.subGenre?.name} | {event?.type}
          </p>
          <h3>Price Ranges</h3>
          {/* price range content here */}
          <p>
            {/* NOTE: If using option chaining with bracket notation, do it like array?.[index]?., not like array[index]?. example below*/}
            {event?.priceRanges ? (
              <>
                ${event?.priceRanges?.[0]?.min ?? 'no prices available'}- $
                {event?.priceRanges?.[0]?.max ?? 'no prices available'}{' '}
              </>
            ) : (
              'No prices available'
            )}
            {event?.priceRanges?.[0]?.min ?? 'no prices available'}
          </p>
          <h3>Ticket Status</h3>
          {/* ticket status content here */}
          <h3>Buy Tickets at</h3>
          {/* buy tickets content here */}
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
