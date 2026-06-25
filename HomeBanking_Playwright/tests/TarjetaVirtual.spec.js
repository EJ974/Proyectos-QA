import { test, expect } from '@playwright/test';
import { loginAndReset } from '../utils/auth';

test.describe('Modulo TarjetaVirtual', () => {

  test.beforeEach(async ({ page }) => {
    await loginAndReset(page);
  });

  // =========================================================
  // CP-CARD-01: Generación y Límite Exitoso
  // =========================================================
  test('CP-CARD-01: Generación y Límite Exitoso', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Tarjeta Virtual' }).click();

    await page.locator('#card-account-select')
      .selectOption({ index: 1 });

    await page.getByRole('button', { name: '+ Generar Nueva Tarjeta' }).click();

    const tarjeta = page.locator('#virtual-cards-list > div');

    await expect(tarjeta).toBeVisible();

    await expect(tarjeta).toContainText('TITULAR');
    await expect(tarjeta).toContainText('JUAN PÉREZ');
    await expect(tarjeta).toContainText('ACTIVA - VINCULADA A **** **** **** 5678');
  });

  // =========================================================
  // CP-CARD-01.1: Generación y Límite Fallido
  // =========================================================
  test('CP-CARD-01: Generación y Límite Fallido', async ({ page }) => {

  await page.locator('li')
    .filter({ hasText: 'Tarjeta Virtual' })
    .click();

  for (let i = 0; i < 2; i++) {

    await page.locator('#card-account-select')
      .selectOption({ index: 1 });

    await page.getByRole('button', {
      name: '+ Generar Nueva Tarjeta'
    }).click();

    await page.waitForTimeout(1000);
  }

  await expect(
    page.locator('#toast-container')
  ).toContainText(
    '❌ Esta cuenta ya posee una tarjeta virtual activa.'
  );
});

  // =========================================================
  // CP-CARD-02: Eliminación y Re-generación
  // =========================================================
  test('CP-CARD-02: Eliminación y Re-generación', async ({ page }) => {

  await page.locator('li')
    .filter({ hasText: 'Tarjeta Virtual' })
    .click();

  // Crear tarjeta
  await page.locator('#card-account-select')
    .selectOption({ index: 1 });

  await page.getByRole('button', {
    name: '+ Generar Nueva Tarjeta'
  }).click();

  const tarjetaInicial = page
    .locator('#virtual-cards-list > div')
    .last();

  await expect(tarjetaInicial)
    .toBeVisible();

  // Eliminar tarjeta
  await tarjetaInicial.click();

  await page.getByRole('button', {
    name: 'Eliminar'
  }).click();

  await page.getByRole('button', {
    name: 'Confirmar'
  }).click();

  // Volver a generar
  await page.locator('#card-account-select')
    .selectOption({ index: 1 });

  await page.getByRole('button', {
    name: '+ Generar Nueva Tarjeta'
  }).click();

  // Obtener nueva tarjeta
  const tarjeta = page
    .locator('#virtual-cards-list > div')
    .last();

  await expect(tarjeta)
    .toBeVisible();

  // Validaciones visuales
  await expect(tarjeta)
    .toContainText('TITULAR');

  await expect(tarjeta)
    .toContainText('JUAN PÉREZ');

  await expect(tarjeta)
    .toContainText('VISA');

  // Validar que está vinculada a una cuenta
  await expect(tarjeta)
    .toContainText(
      /ACTIVA - VINCULADA A \*\*\*\* \*\*\*\* \*\*\*\* \d{4}/
    );

  console.log(
    '✅ Tarjeta eliminada y generada nuevamente correctamente'
  );
});

  // =========================================================
  // CP-CARD-03: Validación Visual
  // =========================================================
  test('CP-CARD-03: Validación Visual', async ({ page }) => {

    await page.locator('li')
      .filter({ hasText: 'Tarjeta Virtual' })
      .click();

    const botonGenerar = page.locator('#generate-card-btn');

    await botonGenerar.click();

    const spinner = botonGenerar.locator('.btn-loader');

    await expect(spinner).toBeVisible({ timeout: 3000 });

    const botonBox = await botonGenerar.boundingBox();
    const spinnerBox = await spinner.boundingBox();

    expect(botonBox).not.toBeNull();
    expect(spinnerBox).not.toBeNull();

    const diferenciaX = Math.abs(
      (botonBox.x + botonBox.width / 2) -
      (spinnerBox.x + spinnerBox.width / 2)
    );

    const diferenciaY = Math.abs(
      (botonBox.y + botonBox.height / 2) -
      (spinnerBox.y + spinnerBox.height / 2)
    );

    expect(diferenciaX).toBeLessThanOrEqual(5);
    expect(diferenciaY).toBeLessThanOrEqual(5);

    await page.waitForTimeout(3000);

    const tarjeta = page.locator('#virtual-cards-list > div').last();

    await expect(tarjeta).toBeVisible();

    const textoTarjeta = await tarjeta.textContent();

    expect(textoTarjeta).toMatch(/\d{4}\s\d{4}\s\d{4}\s\d{4}/);
  });

});