# UI and API automated testing for BEON.tech interview

## Overview
This repository contains automated API and UI tests implemented with Playwright and JavaScript.
- API tests validate the full Restful-Booker booking lifecycle: authentication, create, read, update, and delete.
- UI tests validate a SauceDemo checkout flow: login, item selection, cart validation, checkout, and success verification.

## Tech Stack
- JavaScript
- Playwright
- @playwright/test
- dotenv

## Project Structure
- `api/`
  - `clients/` – API client abstractions for reusable request logic.
  - `tests/` – API test cases.
  - `data/` – test data and payload.
- `ui/`
  - `pages/` – Page Object Model classes for UI flows.
  - `tests/` – UI end-to-end test case.
- `playwright.config.js` – Playwright test configuration.
- `.env` – environment-specific settings.

## Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create or update `.env` with the required values (env.example is included).
3. Run tests with Playwright.

## Environment Variables (.env usage)
Use `.env` to keep environment-specific data separate from code.
Required variables include:
- `UI_BASE_URL` – base URL for SauceDemo UI tests.
- `UI_USERNAME` – UI auth username.
- `UI_PASSWORD` – UI auth password.
- `API_BASE_URL` – base URL for Restful-Booker API tests.
- `API_USERNAME` – API auth username.
- `API_PASSWORD` – API auth password.

## Environment Setup
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
 ```
Environment variables are used to configure base URLs and credentials.
Sensible defaults are provided to allow the project to run with minimal setup.

## Running Tests
- Run all tests:
  ```bash
  npm test
  ```
- Run only UI tests:
  ```bash
  npm run test:ui
  ```
- Run only API tests:
  ```bash
  npm run test:api
  ```

## Architecture Decisions

The project is structured to keep UI and API tests fully separated, making it easier to maintain and scale each layer independently.

For the UI, I used the Page Object Model to encapsulate page interactions and keep the tests focused on user behavior rather than implementation details. This helps improve readability and reduces duplication.

For the API layer, I introduced a client abstraction to centralize HTTP request logic. This allows the tests to focus on validating the booking lifecycle instead of dealing with requests construction.

Configuration such as base URLs and credentials is handled through `.env` variables to avoid hardcoding sensitive data and to make the project easier to run across different environments.

## Contact

If you have any questions or would like to discuss the solution in more detail, feel free to reach out:

- Jose Mendez  
- Email: josmenag@gmail.com 
- GitHub: [https://github.com/josemendezqa](https://github.com/josemendezqa)
