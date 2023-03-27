import { useState } from 'react';
import moment from 'moment';
import { Container, Row, Col } from 'react-bootstrap';
import { checkTicketStatus } from '../utils/checkTicketStatus';

type Props = {
  extraVenueDetails: any;
};

//tells typescript that the showMore object can have keys of any string value with boolean values. allows use of dynamic keys with the showMore object without any type errors
type ShowMore = {
  [key: string]: boolean;
};

const VenueTab = ({ extraVenueDetails: venue }: Props) => {
  console.log('venue data: ', venue);
  console.log('rules:  ', venue?.generalInfo?.generalRule);
  const [showMore, setShowMore] = useState<ShowMore>({
    openHours: false,
    generalRule: false,
    childRule: false,
  });

  const shouldShowMoreOpenHours = venue?.boxOfficeInfo?.openHoursDetail.length;

  //whenever theres lots of repetitive state change, just use this pattern(like in form data)
  const toggleShowMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement;
    setShowMore((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <Container
      style={{
        width: '80%',
      }}
    >
      <Row>
        <Col
          xs={12} //on small screens, take up full column
          md={venue?.generalInfo || venue?.boxOfficeInfo ? 6 : 12} //if there is info on right side, make this col take up half screen. if no info on right side, it will just be in the middle (takes up full column)
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '2rem 0',
          }}
        >
          <h3>Name</h3>
          <p>{venue?.name}</p>
          {venue?.address && <h3>Address</h3>}
          <p style={{ textAlign: 'center' }}>
            {venue?.address?.line1} {venue?.city?.name}, {venue?.state?.name}
          </p>
          {venue?.boxOfficeInfo?.phoneNumberDetail && <h3>Phone number</h3>}
          <p>{venue?.boxOfficeInfo?.phoneNumberDetail}</p>
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
          {venue?.boxOfficeInfo?.openHoursDetail && <h3>Open Hours</h3>}
          <p style={{ textAlign: 'center' }}>
            {venue?.boxOfficeInfo?.openHoursDetail}
          </p>
          {venue?.generalInfo?.generalRule && <h3>General Rule</h3>}
          <p style={{ textAlign: 'center' }}>
            {venue?.generalInfo?.generalRule}
          </p>
          {/* another way to conditionally render instead of doing the header and p separately */}
          {venue?.generalInfo?.childRule && (
            <>
              <h3>Child Rule</h3>
              <p style={{ textAlign: 'center' }}>
                {venue?.generalInfo?.childRule}
              </p>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default VenueTab;
