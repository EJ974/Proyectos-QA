const { test, expect } = require('@playwright/test');

test.only('agregar tarea', async ({ page }) => {

  await page.goto('https://demo.playwright.dev/todomvc');

  await page.locator('.new-todo').fill('Aprender Playwright');

  await page.keyboard.press('Enter');

  await expect(page.locator('.todo-list'))
    .toContainText('Aprender Playwright');

  // Pausa el navegador
  await page.pause();

});