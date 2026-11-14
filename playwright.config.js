// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const WEB_URL = process.env.WEB_URL || 'https://www.saucedemo.com';
const API_URL = process.env.API_URL || 'https://restful-booker.herokuapp.com';

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'web',
      testDir: './tests/web',
      use: { ...devices['Desktop Chrome'], baseURL: WEB_URL },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: API_URL },
    },
  ],
});
