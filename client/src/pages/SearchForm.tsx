import Layout from './Layout';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';

const SearchForm = () => {
  const [keyword, setKeyword] = useState('');
  const [distance, setDistance] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [autoDetect, setAutoDetect] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClear = () => {
    setKeyword('');
    setDistance('');
    setCategory('');
    setLocation('');
    setAutoDetect(false);
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
          }}
        >
          <Container
            style={{
              backgroundColor: 'black',
              opacity: '70%',
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
            <Form onSubmit={handleSubmit} style={{ color: '#63b5cf' }}>
              <Row>
                <Form.Group
                  as={Col}
                  controlId='formKeyword'
                  style={{ marginBottom: '1rem' }}
                >
                  <Form.Label>Keyword</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter keyword'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
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
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as='select'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value=''>Select category</option>
                    <option value='food'>Food</option>
                    <option value='shopping'>Shopping</option>
                    <option value='entertainment'>Entertainment</option>
                  </Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  controlId='formLocation'
                  style={{ marginBottom: '1rem' }}
                >
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} style={{ marginBottom: '1rem' }}>
                  <Form.Check
                    type='checkbox'
                    label='Auto-detect your location'
                    checked={autoDetect}
                    onChange={(e) => setAutoDetect(e.target.checked)}
                  />
                </Form.Group>
              </Row>
            </Form>
          </Container>
        </div>
      </Layout>
    </>
  );
};

export default SearchForm;
