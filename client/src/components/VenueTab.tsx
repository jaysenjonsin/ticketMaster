import moment from 'moment';
import { Container, Row, Col } from 'react-bootstrap';
import { checkTicketStatus } from '../utils/checkTicketStatus';

type Props = {
  extraVenueDetails: any;
};
const VenueTab = ({ extraVenueDetails: venue }: Props) => {
  // console.log('EXTRA VEN DETAIL ON G ', extraVenueDetails);
  // const venue = extraVenueDetails?._embedded.venues[0];
  // console.log('VENUE EXTRAA AYO' + venue.name);

  // THIS ACTUALLY EXISTS FOR SOME SO CONDITIONALLY RENDER IT
  console.log('extra venue stuff ', venue?.boxOfficeInfo);
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
            flexDirection: 'column',
            padding: '2rem 0',
          }}
        >
          <h3>Name</h3>
          <p>{venue?.name}</p>
          <h3>Address</h3>
          <p>
            {/* {venue?.address?.line1} {venue?.city?.name}, {venue?.state?.name} */}
          </p>
          {/* ONLY RENDER IF AVAIL */}
          <h3>Phone number</h3>
          <p>phone number stuff here</p>
        </Col>
        <Col
          xs={12} //on small screens, take up full column
          md={6} //on med screens, take  up half column (the col after this takes up other half)
          // className='mx-auto my-auto'
          style={{
            display: 'flex',
            alignItems: 'center',
            // justifyContent: 'center',
            flexDirection: 'column',
            padding: '2rem 0',
          }}
        >
          <h3>Open Hours</h3>
          <p style={{ textAlign: 'center' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quae
            velit asperiores voluptatem quia ex totam non accusamus quidem
            veritatis quos, est aliquid maxime, minus eius repellendus voluptas
            culpa mollitia maiores vero! Nam natus quos doloribus consequuntur
            molestias veniam eos, quaerat aperiam laboriosam voluptate unde
            culpa itaque! Laborum eum aperiam architecto distinctio modi velit
            sed? Tempora animi explicabo eos blanditiis!
          </p>
          <h3>General Rule</h3>
          <p style={{ textAlign: 'center' }}>general rul stuff ehre</p>
          <h3>Child Rule</h3>
          <p style={{ textAlign: 'center' }}>child rule stuff</p>
        </Col>
      </Row>
    </Container>
  );
};

export default VenueTab;
