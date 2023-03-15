import Layout from '../components/Layout';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import party from '../assets/ticketMasterParty.jpeg';
import { autoComplete } from '../services/autoComplete';
import { flattenSuggestions } from '../utils/flattenSuggestions';
import { getLatAndLong } from '../services/getLatAndLong';
import { searchEvent } from '../services/searchEvent';
import { debounce } from '../utils/debounce';

const SearchForm = () => {
  const [keyword, setKeyword] = useState('');
  const [distance, setDistance] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [autoDetect, setAutoDetect] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (userInput: string) => {
    try {
      const suggestions = await autoComplete(userInput);
      const suggestionsFlattened = flattenSuggestions(suggestions);
      //@ts-ignore
      setSuggestions(suggestionsFlattened);
    } catch (err: any) {
      const message = err.response?.data.message ?? err.toString();
      window.alert(message);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 1000);

  useEffect(() => {
    if (keyword.length > 0) {
      debouncedFetchSuggestions(keyword);
    } else setShowSuggestions(false);
  }, [keyword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('FORM SUBMITTED');
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

      const events = await searchEvent(userInput);
      //if events._embedded, means theres events
      console.log('EVENTS: ', events);
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
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${party})`,
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
                      type='text'
                      placeholder='Enter keyword'
                      value={keyword}
                      onChange={async (e) => {
                        setShowSuggestions(true);
                        setKeyword(e.target.value);
                      }}
                    />
                    {keyword.length > 0 && showSuggestions && (
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
                            value={suggestion.name}
                            onClick={() => setShowSuggestions(false)}
                          >
                            {suggestion.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  controlId='formDistance'
                  style={{ marginBottom: '1rem' }}
                >
                  <Form.Label>Distance</Form.Label>
                  <Form.Control
                    type='text'
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
                    as='select'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value=''>Select category</option>
                    <option value='KZFzniwnSyZfZ7v7nJ'>Music</option>
                    <option value='KZFzniwnSyZfZ7v7nE'>Sports</option>
                    <option value='KZFzniwnSyZfZ7v7na'>Arts & Theatre</option>
                    <option value='KZFzniwnSyZfZ7v7nJQ'>Film</option>
                    <option value='KZFzniwnSyZfZ7v7nJQ'>Miscellaneous</option>
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
        </div>
      </Layout>
    </>
  );
};

export default SearchForm;
