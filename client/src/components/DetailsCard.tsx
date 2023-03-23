import React, { useCallback, useEffect, useState } from 'react';
import { Card, Button, Tabs, Tab, Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import ArtistsTab from './ArtistsTab';
import EventsTab from './EventsTab';
import VenueTab from './VenueTab';
import { getExtraEventDetails } from '../services/getExtraEventDetails';
import { getExtraVenueDetails } from '../services/getExtraVenueDetails';
import { getRelevantArtists } from '../utils/getRelevantArtists';
import { getArtistAlbums } from '../utils/getArtistAlbums';

type Props = {
  event: any;
  setShowDetailCard: React.Dispatch<React.SetStateAction<boolean>>;
};

const DetailsCard = ({ event, setShowDetailCard }: Props) => {
  //@ts-ignore
  const [currentTab, setCurrentTab] = useState('events');
  const [extraEventDetails, setExtraEventDetails] = useState(null);
  const [extraVenueDetails, setExtraVenueDetails] = useState(null);
  const [extraArtistDetails, setExtraArtistDetails] = useState(null);
  const [artistAlbums, setArtistAlbums] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    JSON.parse(localStorage.getItem(event.id) as string) //use this state to either render favorite or not favorited button
  );

  useEffect(() => {
    const fetchExtraDetails = async (event: any) => {
      try {
        console.log('HELLA EVENT: ', event);
        const eventDetails = await getExtraEventDetails(event?.id);
        const venueDetails = await getExtraVenueDetails(
          event?._embedded?.venues?.[0]?.id
        );
        const arrOfEventArtists: any = await getRelevantArtists(
          eventDetails._embedded.attractions,
          eventDetails
        );
        console.log('OOOGA BOOGA', arrOfEventArtists);
        // dont just do conditional: if arrOfEvents = [], this will always return false due to how arrays stored in memory
        if (arrOfEventArtists.length === 0) {
        } else {
          const albums = await getArtistAlbums(arrOfEventArtists);
          //@ts-ignore
          setArtistAlbums(albums);
          setExtraArtistDetails(arrOfEventArtists);
        }
        setExtraEventDetails(eventDetails);
        setExtraVenueDetails(venueDetails);
      } catch (err: any) {
        const response = err.response?.data.message ?? err.toString();
        window.alert(response);
      }
    };

    fetchExtraDetails(event);
  }, []);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      localStorage.removeItem(event.id);
      setIsFavorite(null);
      window.alert('Removed from Favorites!');
    } else {
      const eventObject = {
        date: event.dates.start.localDate,
        event: event.name,
        category: `${event?.classifications?.[0]?.segment?.name} | ${event?.classifications?.[0]?.genre?.name} | ${event?.classifications?.[0]?.subGenre?.name}`,
        venue: event._embedded.venues[0].name,
      };
      localStorage.setItem(event.id, JSON.stringify(eventObject));
      setIsFavorite(true);
      window.alert('Added Event to Favorites!');
    }
  };

  //scroll to bottom when switching tabs
  // useEffect(() => {
  //   window.scrollTo(0, document.body.scrollHeight);
  // }, [currentTab]);

  const back = () => {
    //scroll to top
    window.scrollTo(0, 0);
    setShowDetailCard(false);
  };
  return (
    <>
      <Card
        style={{
          backgroundColor: 'rgba(120, 120, 120, 0.5)',
          backdropFilter: 'blur(6px)',
          color: 'white',
          width: '85%',
          maxWidth: '900px',
          minHeight: '35rem',
        }}
      >
        <Card.Header>
          <a
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={back}
          >
            <span className='material-icons' style={{ fontSize: '1.2rem' }}>
              arrow_back_ios_new
            </span>
            <span style={{ textDecoration: 'underline' }}> Back</span>
          </a>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              padding: '2.5rem',
            }}
          >
            <h2>{event?.name}</h2>
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
              onClick={handleFavoriteClick}
            >
              {isFavorite ? (
                <span className='material-icons'>favorite</span>
              ) : (
                <span className='material-icons'>favorite_border</span>
              )}
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
              <ArtistsTab
                extraArtistDetails={extraArtistDetails}
                albums={artistAlbums}
              />
            </Tab>
            <Tab eventKey='venue' title='Venue' style={{ color: 'white' }}>
              <VenueTab extraVenueDetails={extraVenueDetails} />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </>
  );
};

export default DetailsCard;
