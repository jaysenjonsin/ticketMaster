import debounce from 'debounce';
import { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import party from '../assets/ticketMasterParty.jpeg';
import Layout from '../components/Layout';
import { autoComplete } from '../services/autoComplete';
import { getLatAndLong } from '../services/getLatAndLong';
import { searchEvent } from '../services/searchEvent';
import { flattenSuggestions } from '../utils/flattenSuggestions';
import EventsTable from '../components/EventsTable';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [distance, setDistance] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [autoDetect, setAutoDetect] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [validResults, setValidResults] = useState(null);
  const [showDetailCard, setShowDetailCard] = useState(false);

  const fetchSuggestions = useCallback(async (userInput: string) => {
    try {
      let suggestions = await autoComplete(userInput);
      if (!suggestions) suggestions = [{ name: 'No results found' }];
      const suggestionsFlattened = flattenSuggestions(suggestions);

      //@ts-ignore
      setSuggestions(suggestionsFlattened);
    } catch (err: any) {
      const message = err.response?.data.message ?? err.toString();
      window.alert(message);
    }
  }, []);

  //need to use useCallback -> if not, you create new debounced func every time component renders (since it is defined in this component), meaning previous debounced func is lost. Now debouncedFetchSuggestions is only created on initial component load
  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 600),
    []
  );

  useEffect(() => {
    if (keyword.length > 0) {
      setShowSuggestions(true);
      debouncedFetchSuggestions(keyword);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [keyword, debouncedFetchSuggestions]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //later, do if (!autoDetect) functionality - if autoDetect, use current location
      const { latitude, longitude } = await getLatAndLong(location);
      const userInput = {
        keyword: keyword.split(' ').join('+'),
        distance,
        category,
        latitude,
        longitude,
      };

      const searchResults = await searchEvent(userInput);
      console.log('SEARCH RESULTS: ', searchResults);
      //if events._embedded, means theres events
      if (searchResults._embedded) {
        //cannot set results directly to searchResults._embedded.events here, possibly due to async nature of setState
        setValidResults(searchResults);
        setShowDetailCard(false);
      }
    } catch (err: any) {
      const message = err?.response.data.message ?? err.toString();
      window.alert(message);
    }
  };

  const handleClear = () => {
    setKeyword('');
    setDistance('');
    setCategory('');
    setLocation('');
    setAutoDetect(false);
    setShowSuggestions(false);
  };

  return (
    <>
      <Layout>
        <div
          className='mainContainer'
          style={{
            display: 'flex',
            flexDirection: 'column',
            //for when results table shows
            gap: '3rem',
            alignItems: 'center',
            justifyContent: 'center',
            // add some extra space to bottom of the page
            paddingBottom: '10rem',
          }}
        >
          <Container
            style={{
              backgroundColor: 'rgba(120, 120, 120, 0.5)',
              backdropFilter: 'blur(6px)',
              borderRadius: '25px',
              padding: '4rem 1rem',
              margin: '0 auto',
              maxWidth: '40rem',
              marginTop: '4rem',
            }}
          >
            <h1 style={{ color: 'white', textAlign: 'center' }}>
              Events Search
            </h1>
            <hr style={{ color: 'white' }} />
            <Form
              onSubmit={handleSubmit}
              //turn off default autocomplete
              autoComplete='off'
              style={{ color: '#63b5cf' }}
            >
              <Row>
                <Form.Group
                  as={Col}
                  controlId='formKeyword'
                  style={{ marginBottom: '1rem' }}
                >
                  <Form.Label>
                    Keyword<span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <div style={{ position: 'relative' }}>
                    <Form.Control
                      required
                      type='text'
                      placeholder='Enter keyword'
                      value={keyword}
                      onChange={async (e) => {
                        setKeyword(e.target.value);
                      }}
                    />
                    {showSuggestions && (
                      <select
                        style={{
                          position: 'absolute',
                          width: '100%',
                          paddingTop: '0.5rem',
                          paddingBottom: '0.5rem',
                          paddingLeft: '1rem',
                          backgroundColor: 'white',
                          border: '1px solid #ced4da',
                          borderRadius: '0.25rem',
                          zIndex: 10,
                          cursor: 'pointer',
                        }}
                        size={12} //show many suggestions to show in a <select>
                        onChange={(e) => {
                          setKeyword(e.target.value);
                        }}
                      >
                        {suggestions.map((suggestion: any, idx) => (
                          //@ts-ignore
                          <option
                            key={idx}
                            value={suggestion?.name}
                            disabled={suggestion?.name === 'No results found'}
                            onClick={() => setShowSuggestions(false)}
                            style={{ marginBottom: '1rem' }}
                          >
                            {suggestion.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </Form.Group>
              </Row>
              <Row className='flex-wrap'>
                <Form.Group
                  as={Col}
                  controlId='formDistance'
                  style={{ marginBottom: '1rem' }}
                >
                  <Form.Label>Distance</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter distance'
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId='formCategory'
                  style={{ marginBottom: '1rem' }}
                >
                  <Form.Label>
                    Category<span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    as='select'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value=''>Select category</option>
                    <option value='KZFzniwnSyZfZ7v7nJ'>Music</option>
                    <option value='KZFzniwnSyZfZ7v7nE'>Sports</option>
                    <option value='KZFzniwnSyZfZ7v7na'>Arts & Theatre</option>
                    <option value='KZFzniwnSyZfZ7v7nn'>Film</option>
                    <option value='KZFzniwnSyZfZ7v7n1'>Miscellaneous</option>
                  </Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  controlId='formLocation'
                  style={{ marginBottom: '1rem' }}
                >
                  <Form.Label>
                    Location<span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    required
                    placeholder='Enter location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={autoDetect}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} style={{ marginBottom: '1rem' }}>
                  <Form.Check
                    type='checkbox'
                    label='Auto-detect your location'
                    checked={autoDetect}
                    onChange={(e) => {
                      setAutoDetect(e.target.checked);
                      setLocation('');
                    }}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Col style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant='primary'
                    type='submit'
                    style={{ marginRight: '10px' }}
                  >
                    Submit
                  </Button>
                  <Button
                    variant='secondary'
                    type='reset'
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>

          {validResults && (
            <EventsTable
              eventsInfo={validResults}
              showDetailCard={showDetailCard}
              setShowDetailCard={setShowDetailCard}
            />
          )}
        </div>
      </Layout>
    </>
  );
};

export default Search;
