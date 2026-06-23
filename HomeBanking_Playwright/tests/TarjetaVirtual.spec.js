import { test, expect } from '@playwright/test';

test.describe('Modulo TarjetaVirtual', () => {

  // 🔥 FIX: estado limpio en cada test
  test.beforeEach(async ({ page }) => {

    await page.goto('https://homebanking-demo-tests.netlify.app/');

    // Reset del sistema (evita tarjetas duplicadas)
    const resetBtn = page.locator('#reset-demo-btn');

    if (await resetBtn.isVisible().catch(() => false)) {
      await resetBtn.click();
      await page.getByRole('button', { name: 'Confirmar' }).click();
    }

    // Login limpio
    await page.locator('#username').fill('demo');
    await page.locator('#password').fill('demo123');
    await page.locator('#login-btn').click();
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
  test('CP-CARD-01.1: Generación y Límite Fallido', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Tarjeta Virtual' }).click();

    let mensajeEncontrado = false;

    for (let i = 0; i < 2; i++) {

      await page.locator('#card-account-select')
        .selectOption({ index: 1 });

      await page.getByRole('button', { name: '+ Generar Nueva Tarjeta' }).click();

      await page.waitForTimeout(1500);

      const error = page.getByText(
        '❌ Esta cuenta ya posee una tarjeta virtual activa.'
      );

      if (await error.count() > 0) {
        mensajeEncontrado = true;
        break;
      }
    }

    // 🔥 FIX: ahora sí validamos resultado
    expect(mensajeEncontrado).toBeTruthy();
  });

  // =========================================================
  // CP-CARD-02: Eliminación y Re-generación
  // =========================================================
  test('CP-CARD-02: Eliminación y Re-generación', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Tarjeta Virtual' }).click();

    await page.locator('#card-account-select')
      .selectOption({ index: 1 });

    await page.getByRole('button', { name: '+ Generar Nueva Tarjeta' }).click();

    await page.locator('#virtual-cards-list > div').click();

    await page.getByRole('button', { name: 'Eliminar' }).click();

    await page.getByRole('button', { name: 'Confirmar' }).click();

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