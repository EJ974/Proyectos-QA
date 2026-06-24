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

    const tarjeta = page.locator('.account-card').filter({
      hasText: 'Cuenta Corriente'
    });

    await expect(tarjeta).toBeVisible();
    await expect(tarjeta).toContainText('Cuenta Corriente');

  });

  // =========================================================
  // CP-DASH-02: Caja de Ahorro
  // =========================================================
  test('CP-DASH-02: Visualización Caja de Ahorro', async ({ page }) => {

    const tarjeta = page.locator('.account-card').filter({
      hasText: 'Caja de Ahorro'
    });

    await expect(tarjeta).toBeVisible();
    await expect(tarjeta).toContainText('Caja de Ahorro');

  });

  // =========================================================
  // CP-DASH-03: Tarjeta de Crédito
  // =========================================================
  test('CP-DASH-03: Visualización Tarjeta Crédito', async ({ page }) => {

    const tarjeta = page.locator('.account-card').filter({
      hasText: 'Tarjeta de Crédito'
    });

    await expect(tarjeta).toBeVisible();
    await expect(tarjeta).toContainText('Tarjeta de Crédito');

  });

  // =========================================================
  // CP-DASH-04: Últimos Movimientos
  // =========================================================
  test('CP-DASH-04: Visualización Últimos Movimientos', async ({ page }) => {

    const movimientos = page.locator('#recent-transactions');

    await expect(movimientos).toBeVisible({ timeout: 10000 });

    await expect(
      page.getByText('Últimos Movimientos')
    ).toBeVisible();

  });

});