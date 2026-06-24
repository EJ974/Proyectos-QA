import { test, expect } from '@playwright/test';
import { loginAndReset } from '../utils/auth';

test.describe('Modulo Transferencia', () => {

  test.beforeEach(async ({ page }) => {
    await loginAndReset(page);
  });

  // =========================================================
  // CP-TRF-01 - Transferencia Propia Exitosa
  // =========================================================
  test('CP-TRF-01 - Transferencia Propia Exitosa', async ({ page }) => {

    await page.locator('li')
      .filter({ hasText: 'Transferencias' })
      .click();

    await expect(
      page.locator('#transfer-form')
    ).toBeVisible();

    await page.locator('#destination-own-account')
      .selectOption({ index: 1 });

    await page.locator('#transfer-amount')
      .fill('10000');

    await page.getByRole('button', {
      name: 'Transferir'
    }).click();

    const confirmar = page.getByRole('button', {
      name: 'Confirmar'
    });

    if (await confirmar.isVisible().catch(() => false)) {
      await confirmar.click();
    }

    await page.locator('li')
      .filter({ hasText: 'Inicio' })
      .click();

    await expect(
      page.locator('#recent-transactions')
    ).toBeVisible();

    await expect(
      page.locator('#recent-transactions')
    ).toContainText('Transferencia');
  });

  // =========================================================
  // CP-TRF-02 - Validación Límite por Operación
  // =========================================================
  test('CP-TRF-02 - Validación Límite por Operación', async ({ page }) => {

    await page.locator('li')
      .filter({ hasText: 'Transferencias' })
      .click();

    await page.locator('#destination-own-account')
      .selectOption({ index: 1 });

    await page.locator('#transfer-amount')
      .fill('50001');

    await page.getByRole('button', {
      name: 'Transferir'
    }).click();

    const confirmar = page.getByRole('button', {
      name: 'Confirmar'
    });

    if (await confirmar.isVisible().catch(() => false)) {
      await confirmar.click();
    }

    await expect(
      page.locator('#transfer-error')
    ).toBeVisible();
  });

  // =========================================================
  // CP-TRF-03 - Validación Límite Diario
  // =========================================================
  test('CP-TRF-03 - Validación Límite Diario', async ({ page }) => {

    await page.locator('li')
      .filter({ hasText: 'Transferencias' })
      .click();

    for (let i = 0; i < 3; i++) {

      await page.locator('#destination-own-account')
        .selectOption({ index: 1 });

      await page.locator('#transfer-amount')
        .fill('40000');

      await page.getByRole('button', {
        name: 'Transferir'
      }).click();

      const confirmar = page.getByRole('button', {
        name: 'Confirmar'
      });

      if (await confirmar.isVisible().catch(() => false)) {
        await confirmar.click();
      }
    }

    await expect(
      page.locator('#transfer-error')
    ).toBeVisible();
  });

  // =========================================================
  // CP-TRF-04 - Validación CBU Inválido
  // =========================================================
  test('CP-TRF-04 - Validación CBU Inválido', async ({ page }) => {

    await page.locator('li')
      .filter({ hasText: 'Transferencias' })
      .click();

    await page.locator('#transfer-type')
      .selectOption({ index: 1 });

    await page.locator('#destination-account-number')
      .fill('1234');

    await page.locator('#transfer-amount')
      .fill('20000');

    await page.getByRole('button', {
      name: 'Transferir'
    }).click();

    const confirmar = page.getByRole('button', {
      name: 'Confirmar'
    });

    if (await confirmar.isVisible().catch(() => false)) {
      await confirmar.click();
    }

    await expect(
      page.locator('#transfer-error')
    ).toBeVisible();
  });

});