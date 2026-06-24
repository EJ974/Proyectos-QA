import { test, expect } from '@playwright/test';
import { loginAndReset } from '../utils/auth';

test.describe('Modulo Dashboard', () => {

  test.beforeEach(async ({ page }) => {
    await loginAndReset(page);
  });

  // =========================================================
  // CP-DASH-01: Cuenta Corriente
  // =========================================================
  test('CP-DASH-01: Visualización Cuenta Corriente', async ({ page }) => {

    const tarjeta = page.locator(
      '#dashboard-section > div.accounts-grid > div:nth-child(1)'
    );

    await expect(tarjeta).toBeVisible();
    await expect(tarjeta).toContainText('cuenta corriente');

  });

  // =========================================================
  // CP-DASH-02: Caja de Ahorro
  // =========================================================
  test('CP-DASH-02: Visualización Caja de Ahorro', async ({ page }) => {

    const tarjeta = page.locator(
      '#dashboard-section > div.accounts-grid > div:nth-child(2)'
    );

    await expect(tarjeta).toBeVisible();
    await expect(tarjeta).toContainText('caja de ahorro');

  });

  // =========================================================
  // CP-DASH-03: Tarjeta de Crédito
  // =========================================================
  test('CP-DASH-03: Visualización Tarjeta Crédito', async ({ page }) => {

    const tarjeta = page.locator(
      '#dashboard-section > div.accounts-grid > div:nth-child(3)'
    );

    await expect(tarjeta).toBeVisible();
    await expect(tarjeta).toContainText('tarjeta de crédito');

  });

  // =========================================================
  // CP-DASH-04: Últimos Movimientos
  // =========================================================
  test('CP-DASH-04: Visualización Últimos Movimientos', async ({ page }) => {

    const movimientos = page.locator('#recent-transactions');

    await expect(movimientos).toBeVisible({ timeout: 10000 });
    await expect(movimientos).toContainText('Movimientos');

  });

});