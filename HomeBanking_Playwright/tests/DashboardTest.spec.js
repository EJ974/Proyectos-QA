import { test, expect } from '@playwright/test';

test.describe('Modulo Dashboard', () => {

  test.beforeEach(async ({ page }) => {

    // Abrir aplicación
    await page.goto('https://homebanking-demo-tests.netlify.app/');

    // Login
    await page.locator('#username').fill('demo');

    await page.locator('#password').fill('demo123');

    await page.locator('#login-btn').click();

  });

  test('CP-DASH-01: Visualización Cuenta Corriente', async ({ page }) => {

  console.log('INICIO DE TEST CP-DASH-01');

  const tarjeta = page.locator(
    '#dashboard-section > div.accounts-grid > div:nth-child(1)'
  );

  await expect(tarjeta).toBeVisible();

  const texto = await tarjeta.textContent();

  console.log(texto);

  expect(
    texto?.toLowerCase()
  ).toContain('cuenta corriente');

  console.log('✅ Se encontró la tarjeta Cuenta Corriente');

});


test('CP-DASH-02: Visualización Caja de Ahorro', async ({ page }) => {

  console.log('INICIO DE TEST CP-DASH-02');

  const tarjeta = page.locator(
    '#dashboard-section > div.accounts-grid > div:nth-child(2)'
  );

  await expect(tarjeta).toBeVisible();

  const texto = await tarjeta.textContent();

  console.log(texto);

  expect(
    texto?.toLowerCase()
  ).toContain('caja de ahorro');

  console.log('✅ Se encontró la tarjeta Caja de Ahorro');

});


test('CP-DASH-03: Visualización Tarjeta Crédito', async ({ page }) => {

  console.log('INICIO DE TEST CP-DASH-03');

  const tarjeta = page.locator(
    '#dashboard-section > div.accounts-grid > div:nth-child(3)'
  );

  await expect(tarjeta).toBeVisible();

  const texto = await tarjeta.textContent();

  console.log(texto);

  expect(
    texto?.toLowerCase()
  ).toContain('tarjeta de crédito');

  console.log('✅ Se encontró la tarjeta de Crédito');

});


test.only('CP-DASH-04: Visualización Últimos Movimientos', async ({ page }) => {

  console.log('INICIO DE TEST CP-DASH-04');

  const movimientos = page.locator(
    '#dashboard-section > div.recent-transactions'
  );

  await expect(movimientos).toBeVisible();

  const texto = await movimientos.textContent();

  console.log(texto);

  expect(
    texto?.toLowerCase()
  ).toContain('Últimos Movimientos');

  console.log('✅ Se encontró la sección Últimos Movimientos');

});
  

});