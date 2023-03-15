import React, { useState } from 'react';
import { Card, Button, Tabs, Tab } from 'react-bootstrap';
import ArtistsTab from './ArtistsTab';
import EventsTab from './EventsTab';
import VenueTab from './VenueTab';

type Props = {
  event: any;
};

const DetailsCard = ({ event }: Props) => {
  const [currentTab, setCurrentTab] = useState('events');
  console.log('PROP EVENTTT', event);

  // const back = () => {
  //   set
  // }
  return (
    // <>
    //   (<p style={{ color: 'white' }}>{event?.name}</p>){' '}
    // </>
    <Card>
      <Card.Header>
        <Button variant='primary'>Back</Button>
        <h2>Event name</h2>
        <Button variant='outline-danger'>Favorite</Button>
      </Card.Header>
      <Card.Body>
        <Tabs
          activeKey={currentTab}
          onSelect={(key: any) => setCurrentTab(key)}
        >
          <Tab eventKey='events' title='Events'>
            <EventsTab />
          </Tab>
          <Tab eventKey='artists' title='Artists/Teams'>
            <ArtistsTab />
          </Tab>
          <Tab eventKey='venue' title='Venue'>
            <VenueTab />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default DetailsCard;
