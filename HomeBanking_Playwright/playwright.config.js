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

    // Mostrar navegador
    headless: false,

    // Usa tamaño REAL de la ventana
    viewport: null,

    // Grabar trace
    trace: 'on',

    // Screenshots automáticos
    screenshot: 'on',

    // Video FULL HD
    video: {
      mode: 'on',
      size: {
        width: 1920,
        height: 1080,
      }
    },

    // Hace más lenta la ejecución para verla
    launchOptions: {

      slowMo: 1000,

      // Abrir maximizado
      args: ['--start-maximized'],

    },
  },

  // Navegador
  projects: [
    {
      name: 'chromium',

      use: {
        browserName: 'chromium',
      },
    },

    /*
    {
      name: 'firefox',

      use: {
        browserName: 'firefox',
      },
    },

    {
      name: 'webkit',

      use: {
        browserName: 'webkit',
      },
    },
    */
  ],

});