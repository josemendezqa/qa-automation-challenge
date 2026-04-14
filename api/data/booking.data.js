const bookingPayload = {
  firstname: 'Jose',
  lastname: 'M',
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-04-15',
    checkout: '2026-04-20'
  },
  additionalneeds: 'Breakfast'
};

const updatedBookingPayload = {
  ...bookingPayload,
  bookingdates: {
    ...bookingPayload.bookingdates,
    checkout: '2026-04-25'
  }
};

module.exports = {
  bookingPayload,
  updatedBookingPayload
};