import React, { useCallback, useEffect, useState } from 'react';
import { Card, Button, Tabs, Tab, Container } from 'react-bootstrap';
import ArtistsTab from './ArtistsTab';
import EventsTab from './EventsTab';
import VenueTab from './VenueTab';
import favoriteBorder from '../assets/favorite_border.png';
import { getExtraEventDetails } from '../services/getExtraEventDetails';
import { getExtraVenueDetails } from '../services/getExtraVenueDetails';

type Props = {
  event: any;
  setShowDetailCard: React.Dispatch<React.SetStateAction<boolean>>;
};

const DetailsCard = ({ event, setShowDetailCard }: Props) => {
  const [currentTab, setCurrentTab] = useState('events');
  const [extraEventDetails, setExtraEventDetails] = useState(null);
  const [extraVenueDetails, setExtraVenueDetails] = useState(null);
  console.log('PROP EVENTTT', event);

  const fetchExtraDetails = useCallback(async (event: any) => {
    try {
      const eventDetails = await getExtraEventDetails(event?.id);
      const venueDetails = await getExtraVenueDetails(event?.id);
      setExtraEventDetails(eventDetails);
      setExtraVenueDetails(venueDetails);
    } catch (err: any) {
      const response = err.response?.data.message ?? err.toString();
      window.alert(response);
    }
  }, []);

  useEffect(() => {
    //scroll to bottom of screen when switching tabs so you can see everything on tab
    window.scrollTo(0, document.body.scrollHeight);
  }, [currentTab]);
  const back = () => {
    window.scrollTo(0, 0);
    setShowDetailCard(false);
  };
  return (
    // <>
    //   (<p style={{ color: 'white' }}>{event?.name}</p>){' '}
    // </>
    <Card
      style={{
        backgroundColor: 'rgba(120, 120, 120, 0.5)',
        backdropFilter: 'blur(6px)',
        borderRadius: '25px',
        color: 'white',
        width: '85%',
      }}
    >
      <Card.Header>
        <Button variant='primary' onClick={back}>
          Back
        </Button>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <h2>Event name</h2>
          <Button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '100%',
              width: '2.5rem',
              height: '2.5rem',
              color: 'red',
              backgroundColor: 'white',
            }}
          >
            <span className='material-icons'>favorite_border</span>
          </Button>
        </div>
      </Card.Header>
      <Card.Body style={{ width: '100%', padding: '0' }}>
        <Tabs
          activeKey={currentTab}
          onSelect={(key: any) => setCurrentTab(key)}
          style={{
            backgroundColor: '#848489',
          }}
        >
          <Tab eventKey='events' title='Events'>
            <EventsTab event={event} />
          </Tab>
          <Tab
            eventKey='artists'
            title='Artists/Teams'
            style={{ color: 'white' }}
          >
            <ArtistsTab />
          </Tab>
          <Tab eventKey='venue' title='Venue' style={{ color: 'white' }}>
            <VenueTab />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default DetailsCard;
