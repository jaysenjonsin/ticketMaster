import { useState } from 'react';
import moment from 'moment';
import { Container, Row, Col, Button } from 'react-bootstrap';
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

  //whenever theres lots of repetitive state change, just use this pattern(like in form data using [e.target.name]: e.target.value)
  const toggleShowMore = (name: string) => {
    setShowMore((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const shouldShowOpenHoursAnchor =
    venue?.boxOfficeInfo?.openHoursDetail.length > 90;

  const shouldShowGeneralRuleAnchor =
    venue?.generalInfo?.generalRule.length > 90;

  const shouldShowChildRuleAnchor = venue?.generalInfo?.childRule.length > 90;

  // make sure not to slice a word off mid word, find the next space available to slice at instead. Ideally abstract this into a func and set these on page load
  const slicedOpenHoursDetail = venue?.boxOfficeInfo?.openHoursDetail?.slice(
    0,
    venue?.boxOfficeInfo?.openHoursDetail?.indexOf(' ', 90) || 90 //make sure to include || in case indexOf value doesnt exist
  );

  const slicedGeneralRule = venue?.generalInfo?.generalRule?.slice(
    0,
    venue?.generalInfo?.generalRule?.indexOf(' ', 90) || 90
  );
  const slicedChildRule = venue?.generalInfo?.childRule?.slice(
    0,
    venue?.generalInfo?.childRule?.indexOf(' ', 90) || 90
  );

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
            {showMore.openHours || !shouldShowOpenHoursAnchor
              ? venue?.boxOfficeInfo?.openHoursDetail
              : slicedOpenHoursDetail}
          </p>
          {shouldShowOpenHoursAnchor && (
            <a
              style={{ color: '#00CED1', cursor: 'pointer' }}
              onClick={() => toggleShowMore('openHours')}
            >
              {showMore.openHours ? 'show less' : 'show more'}
            </a>
          )}
          {venue?.generalInfo?.generalRule && <h3>General Rule</h3>}
          <p style={{ textAlign: 'center' }}>
            {showMore.generalInfo || !shouldShowGeneralRuleAnchor
              ? venue?.generalInfo?.generalRule
              : slicedGeneralRule}
          </p>
          {shouldShowGeneralRuleAnchor && (
            <a
              style={{ color: '#00CED1', cursor: 'pointer' }}
              onClick={() => toggleShowMore('generalInfo')}
            >
              {showMore.generalInfo ? 'show less' : 'show more'}
            </a>
          )}
          {/* another way to conditionally render instead of doing the header and p separately */}
          {venue?.generalInfo?.childRule && (
            <>
              <h3>Child Rule</h3>
              <p style={{ textAlign: 'center' }}>
                {showMore.childRule || !shouldShowChildRuleAnchor
                  ? venue?.generalInfo?.childRule
                  : slicedChildRule}
              </p>
              {shouldShowChildRuleAnchor && (
                <a
                  style={{ color: '#00CED1', cursor: 'pointer' }}
                  onClick={() => toggleShowMore('childRule')}
                >
                  {showMore.childRule ? 'show less' : 'show more'}
                </a>
              )}
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem',
          }}
        >
          <Button>Show Venue on Google map</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default VenueTab;
