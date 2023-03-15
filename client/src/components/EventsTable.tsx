import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import DetailsCard from './DetailsCard';
type Props = {
  eventInfo: any;
  showDetailCard: boolean;
  setShowDetailCard: React.Dispatch<React.SetStateAction<boolean>>;
};

const EventsTable = ({
  eventInfo,
  showDetailCard,
  setShowDetailCard,
}: Props) => {
  const arrOfSearchResults = eventInfo._embedded.events;
  const [selectedEvent, setSelectedEvent] = useState(null);
  console.log('ARRAY: ', arrOfSearchResults);

  const selectEvent = (event: any) => {
    setShowDetailCard(true);
    setSelectedEvent(event);
    console.log('EVENT: ', selectedEvent);
  };
  return (
    <>
      {!showDetailCard ? (
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
              <tr
                key={index}
                style={{ cursor: 'pointer' }}
                onClick={() => selectEvent(event)}
              >
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
      ) : (
        <DetailsCard event={selectedEvent} />
      )}
    </>
  );
};

export default EventsTable;
