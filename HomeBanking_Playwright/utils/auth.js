// utils/auth.js

import { expect } from '@playwright/test';

export async function loginAndReset(page) {

  await page.goto('https://homebanking-demo-tests.netlify.app/');

  await expect(page.locator('#username')).toBeVisible();

  await page.locator('#username').fill('demo');
  await page.locator('#password').fill('demo123');
  await page.locator('#login-btn').click();

  await expect(page.locator('#dashboard-section'))
    .toBeVisible({ timeout: 15000 });

  const resetBtn = page.locator('#reset-demo-btn');

  if (await resetBtn.isVisible().catch(() => false)) {

    await resetBtn.click();

    const confirmar = page.getByRole('button', {
      name: 'Confirmar'
    });

    await expect(confirmar).toBeEnabled({
      timeout: 10000
    });

    await confirmar.click();

    // esperar que termine el reset
    await page.waitForTimeout(2000);
  }

  await expect(
    page.locator('.account-card').first()
  ).toBeVisible({ timeout: 15000 });
}