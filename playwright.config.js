import { defineConfig } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  testDir: './',
  timeout: 60_000,
  expect: {
    timeout: 10_000
  },
  reporter: [['html']],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions: {
      headless: false,
      slowMo: 700
    }
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium'
      }
    }
  ]
});