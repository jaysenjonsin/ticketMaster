export const checkTicketStatus = (ticketStatus: string) => {
  let backgroundColor: string, text: string;
  switch (ticketStatus) {
    case 'onsale':
      text = 'On Sale';
      backgroundColor = 'green';
      break;
    case 'offsale':
      text = 'Off Sale';
      backgroundColor = 'red';
      break;
    case 'canceled':
      text = 'Cancelled';
      backgroundColor = 'black';
      break;
    case 'postponed':
      text = 'Postponed';
      backgroundColor = 'orange';
      break;
    case 'rescheduled':
      text = 'Rescheduled';
      backgroundColor = 'orange';
      break;
    default: //add default in case no cases are met
      text = '';
      backgroundColor = '';
      break;
  }

  return {
    text,
    backgroundColor,
  };
};
