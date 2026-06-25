import { test, expect } from '@playwright/test';
import { loginAndReset } from '../utils/auth';

test.describe('Modulo Prestamos', () => {

  test.beforeEach(async ({ page }) => {
    await loginAndReset(page);

    await expect(
      page.locator('#dashboard-section')
    ).toBeVisible();
  });

  // =========================================================
  // CP-LOAN-01 - Solicitud Prestamo
  // =========================================================
  test('CP-LOAN-01 - Solicitud Prestamo', async ({ page }) => {

    await page.locator('li')
      .filter({ hasText: 'Préstamos' })
      .click();

    await expect(
      page.locator('#loan-form')
    ).toBeVisible();

    await page.locator('#loan-amount')
      .fill('100000');

    await page.locator('#loan-installments')
      .selectOption({ index: 1 });

    await page.locator('#loan-form button')
      .click();

    const confirmar = page.getByRole('button', {
      name: 'Confirmar'
    });

    if (await confirmar.isVisible().catch(() => false)) {
      await confirmar.click();
    }

    await expect(
      page.locator('#active-loans-list')
    ).toBeVisible();

    await expect(
      page.locator('#active-loans-list')
    ).toContainText('100.000');
  });

  // =========================================================
  // CP-LOAN-02 - Validacion monto maximo
  // =========================================================
  test('CP-LOAN-02 - Validacion monto maximo', async ({ page }) => {

    await page.locator('li')
      .filter({ hasText: 'Préstamos' })
      .click();

    await expect(
      page.locator('#loan-form')
    ).toBeVisible();

    await page.locator('#loan-amount')
      .fill('500001');

    await page.locator('#loan-installments')
      .selectOption({ index: 1 });

    const input = page.locator('#loan-amount');

    const esValido = await input.evaluate(
      el => el.checkValidity()
    );

    expect(esValido).toBeFalsy();
  });

  // =========================================================
  // CP-LOAN-03 - Cancelacion Total
  // =========================================================
  test('CP-LOAN-03 - Cancelacion Total', async ({ page }) => {

  await page.locator('li')
    .filter({ hasText: 'Préstamos' })
    .click();

  await page.locator('#loan-amount')
    .fill('100000');

  await page.locator('#loan-installments')
    .selectOption({ index: 1 });

  await page.locator('#loan-form button')
    .click();

  const confirmar = page.getByRole('button', {
    name: 'Confirmar'
  });

  if (await confirmar.isVisible().catch(() => false)) {
    await confirmar.click();
  }

  const ultimoPrestamo = page
    .locator('#active-loans-list > div')
    .last();

  await expect(ultimoPrestamo)
    .toContainText('100.000');

  await ultimoPrestamo
    .getByRole('button', { name: 'Pagar Total' })
    .click();

  if (await confirmar.isVisible().catch(() => false)) {
    await confirmar.click();
  }

  // Validación del toast
  await expect(
  page.locator('#toast-container')
).toContainText(
  'Préstamo cancelado exitosamente'
);

  // Validar que desapareció de la lista
  await expect(ultimoPrestamo)
    .not.toContainText('100.000');
});

  // =========================================================
  // CP-LOAN-04 - Desistimiento
  // =========================================================
  test('CP-LOAN-04 - Desistimiento', async ({ page }) => {

    await page.locator('li')
      .filter({ hasText: 'Préstamos' })
      .click();

    await page.locator('#loan-amount')
      .fill('100000');

    await page.locator('#loan-installments')
      .selectOption({ index: 0 });

    await page.locator('#loan-form button')
      .click();

    const confirmar = page.getByRole('button', {
      name: 'Confirmar'
    });

    if (await confirmar.isVisible().catch(() => false)) {
      await confirmar.click();
    }

    await expect(
      page.getByRole('button', { name: 'Desistir' })
    ).toBeVisible();
  });

  // =========================================================
  // CP-LOAN-05 - Desistimiento Exitoso
  // =========================================================
  test('CP-LOAN-05 - Desistimiento Exitoso', async ({ page }) => {

    await page.locator('li')
      .filter({ hasText: 'Préstamos' })
      .click();

    await page.locator('#loan-amount')
      .fill('100000');

    await page.locator('#loan-installments')
      .selectOption({ index: 0 });

    await page.locator('#loan-form button')
      .click();

    const confirmar = page.getByRole('button', {
      name: 'Confirmar'
    });

    if (await confirmar.isVisible().catch(() => false)) {
      await confirmar.click();
    }

    await page.getByRole('button', {
      name: 'Desistir'
    }).click();

    if (await confirmar.isVisible().catch(() => false)) {
      await confirmar.click();
    }

    await expect(
      page.locator('#active-loans-list')
    ).not.toContainText('100.000');
  });

  // =========================================================
  // CP-LOAN-06 - Saldo Insuficiente
  // =========================================================
  test('CP-LOAN-06 - Saldo Insuficiente', async ({ page }) => {

    await page.locator('li')
      .filter({ hasText: 'Préstamos' })
      .click();

    await page.locator('#loan-amount')
      .fill('50000');

    await page.locator('#loan-installments')
      .selectOption({ index: 0 });

    await page.locator('#loan-form button')
      .click();

    const confirmar = page.getByRole('button', {
      name: 'Confirmar'
    });

    if (await confirmar.isVisible().catch(() => false)) {
      await confirmar.click();
    }

    await expect(
      page.locator('#active-loans-list')
    ).toContainText('50.000');
  });

});