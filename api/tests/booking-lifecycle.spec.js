const { test, expect } = require('@playwright/test');
const { BookingClient } = require('../clients/booking.client');
const {
  bookingPayload,
  updatedBookingPayload
} = require('../data/booking.data');

test.describe('Restful-Booker booking lifecycle', () => {
  test('should authenticate, create, read, update and delete a booking', async ({ request }) => {
    const bookingClient = new BookingClient(request);

    let token;
    let bookingId;

    await test.step('Generate auth token', async () => {
      token = await bookingClient.createToken();
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
    });

    await test.step('Create booking and extract booking id', async () => {
      const createResponse = await bookingClient.createBooking(bookingPayload);

      bookingId = createResponse.bookingid;

      expect(bookingId).toBeTruthy();
      expect(typeof bookingId).toBe('number');

      expect(createResponse.booking.firstname).toBe(bookingPayload.firstname);
      expect(createResponse.booking.lastname).toBe(bookingPayload.lastname);
      expect(createResponse.booking.totalprice).toBe(bookingPayload.totalprice);
      expect(createResponse.booking.depositpaid).toBe(bookingPayload.depositpaid);
      expect(createResponse.booking.bookingdates.checkin).toBe(
        bookingPayload.bookingdates.checkin
      );
      expect(createResponse.booking.bookingdates.checkout).toBe(
        bookingPayload.bookingdates.checkout
      );
      expect(createResponse.booking.additionalneeds).toBe(
        bookingPayload.additionalneeds
      );
    });

    await test.step('Read booking and validate original data', async () => {
      const getResponse = await bookingClient.getBooking(bookingId);

      expect(getResponse.status()).toBe(200);

      const body = await getResponse.json();

      expect(body.firstname).toBe(bookingPayload.firstname);
      expect(body.lastname).toBe(bookingPayload.lastname);
      expect(body.totalprice).toBe(bookingPayload.totalprice);
      expect(body.depositpaid).toBe(bookingPayload.depositpaid);
      expect(body.bookingdates.checkin).toBe(bookingPayload.bookingdates.checkin);
      expect(body.bookingdates.checkout).toBe(bookingPayload.bookingdates.checkout);
      expect(body.additionalneeds).toBe(bookingPayload.additionalneeds);
    });

    await test.step('Update booking checkout date', async () => {
      const updateResponse = await bookingClient.updateBooking(
        bookingId,
        updatedBookingPayload,
        token
      );

      expect(updateResponse.status()).toBe(200);

      const body = await updateResponse.json();

      expect(body.firstname).toBe(updatedBookingPayload.firstname);
      expect(body.lastname).toBe(updatedBookingPayload.lastname);
      expect(body.totalprice).toBe(updatedBookingPayload.totalprice);
      expect(body.depositpaid).toBe(updatedBookingPayload.depositpaid);
      expect(body.bookingdates.checkin).toBe(
        updatedBookingPayload.bookingdates.checkin
      );
      expect(body.bookingdates.checkout).toBe(
        updatedBookingPayload.bookingdates.checkout
      );
      expect(body.additionalneeds).toBe(updatedBookingPayload.additionalneeds);
    });

    await test.step('Delete booking and verify it no longer exists', async () => {
      const deleteResponse = await bookingClient.deleteBooking(bookingId, token);
      expect(deleteResponse.status()).toBe(201);

      const getDeletedBookingResponse = await bookingClient.getBooking(bookingId);
      expect(getDeletedBookingResponse.status()).toBe(404);
    });
  });
});