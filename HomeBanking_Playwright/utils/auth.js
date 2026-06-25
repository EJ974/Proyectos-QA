// utils/auth.js

import { expect } from '@playwright/test';

export async function loginAndReset(page) {

  // ==========================================
  // LOGIN
  // ==========================================

  await page.goto(
    'https://homebanking-demo-tests.netlify.app/'
  );

  await expect(
    page.locator('#username')
  ).toBeVisible({
    timeout: 15000
  });

  await page.locator('#username')
    .fill('demo');

  await page.locator('#password')
    .fill('demo123');

  await page.locator('#login-btn')
    .click();

  await expect(
    page.locator('#dashboard-section')
  ).toBeVisible({
    timeout: 15000
  });

  console.log('✅ Login realizado');

  // ==========================================
  // RESET DEMO
  // ==========================================

  const resetBtn =
    page.locator('#reset-demo-btn');

  if (
    await resetBtn
      .isVisible()
      .catch(() => false)
  ) {

    console.log('🔄 Ejecutando reset...');

    await resetBtn.click();

    const confirmar = page.getByRole(
      'button',
      { name: 'Confirmar' }
    );

    await expect(confirmar)
      .toBeVisible();

    await confirmar.click();

    // Esperar unos segundos
    await page.waitForTimeout(3000);

    // ==========================================
    // SI VOLVIÓ AL LOGIN -> LOGUEAR OTRA VEZ
    // ==========================================

    const loginVisible =
      await page.locator('#username')
        .isVisible()
        .catch(() => false);

    if (loginVisible) {

      console.log(
        '🔐 El reset devolvió al login. Reautenticando...'
      );

      await page.locator('#username')
        .fill('demo');

      await page.locator('#password')
        .fill('demo123');

      await page.locator('#login-btn')
        .click();
    }

    // Esperar dashboard nuevamente
    await expect(
      page.locator('#dashboard-section')
    ).toBeVisible({
      timeout: 15000
    });

    console.log('✅ Reset completado');
  }

  // ==========================================
  // ESTADO FINAL ESTABLE
  // ==========================================

  await expect(
    page.locator('.account-card').first()
  ).toBeVisible({
    timeout: 15000
  });

  await page.waitForTimeout(1000);
}