// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {

    // En GitHub headless, en local visible
    headless: !!process.env.CI,

    viewport: null,

    trace: 'on',

    screenshot: 'on',

    video: {
      mode: 'on',
      size: {
        width: 1920,
        height: 1080,
      }
    },

    launchOptions: {

      slowMo: process.env.CI ? 0 : 1000,

      args: ['--start-maximized'],
    },
  },

  projects: [
    {
      name: 'chromium',

      use: {
        browserName: 'chromium',
      },
    },
  ],
});