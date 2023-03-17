import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { checkTicketStatus } from '../utils/checkTicketStatus';
import facebook from '../assets/transparentFacebook.png';
import twitter from '../assets/twitter.png';
type Props = {
  event: any;
};

const EventsTab = ({ event }: Props) => {
  const attractionNames = event?._embedded?.attractions;

  //window.open(url, <where to open link>) : _blank = new tab _self = same tab
  const handleTweet = () => {
    const tweetText = `Check out ${event.name} on TicketMaster!`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}&url=${encodeURIComponent(event.url)}`;
    window.open(tweetUrl, '_blank');
  };

  const handleFacebookPost = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      event.url
    )}`;
    window.open(facebookUrl, '_blank');
  };

  return (
    <Container
      style={{
        width: '80%',
      }}
    >
      <Row>
        <Col
          xs={12} //on small screens, take up full column
          md={6} //on med screens, take  up half column (the col after this takes up other half)
          // className='mx-auto my-auto'
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
          {/* all artists/team in one paragraph, then map actual items as spans. dont create p for each one as they will stack on top of eachother instead of inline */}
          <p>
            {attractionNames.map((attraction: any, idx: number) => (
              //just use span so everything can have key
              <span key={idx}>
                {attraction.name}
                {/* add spaces and | if not last element */}
                {idx !== attractionNames.length - 1 && ' | '}
              </span>
            ))}
          </p>
          <h3>Venue</h3>
          <p>{event?._embedded?.venues?.[0]?.name ?? 'Unknown Venue'}</p>
          <h3>Genre</h3>
          {/* "segment", "genre", "subGenre", "type",
"subType" */}
          <p>
            {event?.classifications?.[0]?.segment?.name} |{' '}
            {event?.classifications?.[0]?.genre?.name} |{' '}
            {event?.classifications?.[0]?.subGenre?.name}
          </p>
          <h3>Price Ranges</h3>
          <p>
            {/* NOTE: If using option chaining with bracket notation, do it like array?.[index]?., not like array[index]?. example below*/}
            {event?.priceRanges ? (
              <>
                ${event?.priceRanges?.[0]?.min} - $
                {event?.priceRanges?.[0]?.max}
              </>
            ) : (
              'No prices available'
            )}
          </p>
          <h3>Ticket Status</h3>
          {/* ticket status content here */}
          <p
            style={{
              backgroundColor: `${
                checkTicketStatus(event.dates.status.code).backgroundColor
              }`,
              padding: '.25rem',
              borderRadius: '5px',
            }}
          >
            {checkTicketStatus(event.dates.status.code).text}
          </p>
          <h3>Buy Tickets at</h3>
          <a href={event.url}>Ticketmaster</a> {/* buy tickets content here */}
        </Col>
        <Col
          xs={12}
          md={6}
          // className='mx-auto my-auto'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={event.seatmap?.staticUrl}
            alt='event venue'
            style={{
              objectFit: 'cover',
              borderRadius: '400px',
              height: '15rem',
              width: '15rem',
            }}
          />
        </Col>
      </Row>
      <Row
        s={12}
        m={12}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '1rem',
        }}
      >
        Share on:
        <img
          src={twitter}
          style={{
            objectFit: 'cover',
            width: '3rem',
            height: '2rem',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
          alt='twitter'
          onClick={handleTweet}
        />
        <img
          src={facebook}
          style={{
            objectFit: 'cover',
            width: '3rem',
            height: '2rem',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
          alt='facebook'
          onClick={handleFacebookPost}
        />
      </Row>
    </Container>
  );
};

export default EventsTab;
