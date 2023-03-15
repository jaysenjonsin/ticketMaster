import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
type Props = {
  eventInfo: any;
};

const EventsTable = ({ eventInfo }: Props) => {
  const arrOfSearchResults = eventInfo._embedded.events;
  const [showDetailCard, setShowDetailCard] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  console.log('ARRAY: ', arrOfSearchResults);
  return (
    <Table striped bordered hover variant='dark'>
      <thead /*groups the header content in a table */>
        <tr>
          <th>Date</th>
          <th>Icon</th>
          <th>Event</th>
          <th>Genre</th>
          <th>Venue</th>
        </tr>
      </thead>
      <tbody>
        {arrOfSearchResults.map((event: any, index: number) => (
          <tr key={index} style={{ cursor: 'pointer' }}>
            <td>{event?.dates.start.localDate}</td>
            <td align='center'>
              <img
                src={event?.images[0].url}
                alt='event image'
                style={{ objectFit: 'cover', width: '10rem' }}
              />
            </td>
            <td>{event?.name}</td>
            <td>{event?.classifications[0].segment.name}</td>
            <td>{event?._embedded.venues[0].name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EventsTable;
