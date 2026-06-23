// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  // 🔥 IMPORTANTE: evita conflictos entre tests en CI
  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  // 🔥 clave para estabilidad en CI
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {

    // CI = headless / Local = visible
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

      // CI rápido / local con delay para debug
      slowMo: process.env.CI ? 0 : 500,

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