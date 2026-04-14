const { expect } = require("@playwright/test");

const DEFAULT_API_USERNAME = process.env.API_USERNAME || "admin";
const DEFAULT_API_PASSWORD = process.env.API_PASSWORD || "password123";
const DEFAULT_API_BASE_URL = process.env.API_BASE_URL || "https://restful-booker.herokuapp.com";

class BookingClient {
  constructor(request, baseUrl = DEFAULT_API_BASE_URL) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async createToken(
    username = DEFAULT_API_USERNAME,
    password = DEFAULT_API_PASSWORD,
  ) {
    const response = await this.request.post(`${this.baseUrl}/auth`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username,
        password,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.token).toBeTruthy();

    return body.token;
  }

  async createBooking(payload) {
    const response = await this.request.post(`${this.baseUrl}/booking`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: payload,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.bookingid).toBeTruthy();

    return body;
  }

  async getBooking(bookingId) {
    return this.request.get(`${this.baseUrl}/booking/${bookingId}`, {
      headers: {
        Accept: "application/json",
      },
    });
  }

  async updateBooking(bookingId, payload, token) {
    return this.request.put(`${this.baseUrl}/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
      data: payload,
    });
  }

  async deleteBooking(bookingId, token) {
    return this.request.delete(`${this.baseUrl}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }
}

module.exports = { BookingClient };
