import React from 'react';
import Table from 'react-bootstrap/Table';
type Props = {
  eventInfo: any;
};

const EventsTable = ({ eventInfo }: Props) => {
  const arrOfSearchResults = eventInfo._embedded.events;
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
          <tr key={index}>
            <td>{event?.dates.start.localDate}</td>
            <td>
              <img
                src={event?.images[0].url}
                alt='event image'
                style={{ objectFit: 'cover', width: '50%' }}
              />
            </td>
            <td>{event.event}</td>
            <td>{event.genre}</td>
            <td>{event.venue}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EventsTable;
