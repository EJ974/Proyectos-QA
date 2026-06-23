import { test, expect } from '@playwright/test';

test.describe('Modulo Dashboard', () => {

  // 🔥 FIX: estado limpio en cada test
  test.beforeEach(async ({ page }) => {

    // Ir a la app siempre
    await page.goto('https://homebanking-demo-tests.netlify.app/');

    // Reset del sistema (estado limpio)
    await page.locator('#reset-demo-btn').click();
    await page.getByRole('button', { name: 'Confirmar' }).click();

    // Login limpio en cada test
    await page.locator('#username').fill('demo');
    await page.locator('#password').fill('demo123');
    await page.locator('#login-btn').click();
  });

  // =========================================================
  // CP-DASH-01: Cuenta Corriente
  // =========================================================
  test('CP-DASH-01: Visualización Cuenta Corriente', async ({ page }) => {

    const tarjeta = page.locator(
      '#dashboard-section > div.accounts-grid > div:nth-child(1)'
    );

    await expect(tarjeta).toBeVisible();

    const texto = await tarjeta.textContent();

    expect(texto?.toLowerCase()).toContain('cuenta corriente');

    console.log('✅ Se encontró la tarjeta Cuenta Corriente');
  });

  // =========================================================
  // CP-DASH-02: Caja de Ahorro
  // =========================================================
  test('CP-DASH-02: Visualización Caja de Ahorro', async ({ page }) => {

    const tarjeta = page.locator(
      '#dashboard-section > div.accounts-grid > div:nth-child(2)'
    );

    await expect(tarjeta).toBeVisible();

    const texto = await tarjeta.textContent();

    expect(texto?.toLowerCase()).toContain('caja de ahorro');

    console.log('✅ Se encontró la tarjeta Caja de Ahorro');
  });

  // =========================================================
  // CP-DASH-03: Tarjeta de Crédito
  // =========================================================
  test('CP-DASH-03: Visualización Tarjeta Crédito', async ({ page }) => {

    const tarjeta = page.locator(
      '#dashboard-section > div.accounts-grid > div:nth-child(3)'
    );

    await expect(tarjeta).toBeVisible();

    const texto = await tarjeta.textContent();

    expect(texto?.toLowerCase()).toContain('tarjeta de crédito');

    console.log('✅ Se encontró la tarjeta de Crédito');
  });

  // =========================================================
  // CP-DASH-04: Últimos Movimientos
  // =========================================================
  test('CP-DASH-04: Visualización Últimos Movimientos', async ({ page }) => {

    const movimientos = page.getByText('Últimos Movimientos');

    await expect(movimientos).toBeVisible({ timeout: 10000 });

    const texto = await movimientos.textContent();

    console.log('Texto encontrado:', texto);

    console.log('✅ Se encontró la sección Últimos Movimientos');
  });

});