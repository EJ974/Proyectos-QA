import { test, expect } from '@playwright/test';
import { loginAndReset } from '../utils/auth';

test.describe('Modulo Prestamos', () => {

  test.beforeEach(async ({ page }) => {
    await loginAndReset(page);

    // 🔥 aseguramos dashboard listo
    await expect(page.locator('#dashboard-section')).toBeVisible();
  });

  // =========================================================
  // CP-LOAN-01 - Solicitud Prestamo
  // =========================================================
  test('CP-LOAN-01 - Solicitud Prestamo', async ({ page }) => {

    const balance = page.locator("//div[@data-balance='checking']//span[@class='balance-value']");
    await expect(balance).toContainText('500.000,00');

    await page.locator('li').filter({ hasText: 'Préstamos' }).click();
    await expect(page.locator('#loan-form')).toBeVisible();

    await page.locator('#loan-amount').fill('100000');
    await page.locator('#loan-installments').selectOption({ index: 1 });

    await page.locator('#loan-form button').click();
    await page.getByRole('button', { name: 'Confirmar' }).click();

    const loans = page.locator('#active-loans-list');

    await expect(loans).toBeVisible();
    await expect(loans).toContainText('$ 100.000,00');
    await expect(loans).toContainText('Cuotas: 12');
    await expect(loans).toContainText('Total a Pagar: $ 165.000,00');
  });

  // =========================================================
  // CP-LOAN-02 - Validacion monto maximo
  // =========================================================
  test('CP-LOAN-02 - Validacion monto maximo', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    await expect(page.locator('#loan-form')).toBeVisible();

    await page.locator('#loan-amount').fill('500001');
    await page.locator('#loan-installments').selectOption({ index: 1 });

    await page.locator('#loan-form button').click();

    const validationMessage = await page
      .locator('#loan-amount')
      .evaluate(el => el.validationMessage);

    expect(validationMessage).toContain('menor de o igual a 500000');

    await expect(page.locator('#modal')).not.toBeVisible();
  });

  // =========================================================
  // CP-LOAN-03 - Cancelacion Total
  // =========================================================
  test('CP-LOAN-03 - Cancelacion Total', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    await page.locator('#loan-amount').fill('100000');
    await page.locator('#loan-installments').selectOption({ index: 1 });

    await page.locator('#loan-form button').click();
    await page.getByRole('button', { name: 'Confirmar' }).click();

    const loans = page.locator('#active-loans-list');
    await expect(loans).toContainText('$ 100.000,00');

    await page.getByRole('button', { name: 'Pagar Total' }).nth(1).click();
    await page.getByRole('button', { name: 'Confirmar' }).click();

    await expect(loans).not.toContainText('$ 100.000,00');
  });

  // =========================================================
  // CP-LOAN-04 - Desistimiento
  // =========================================================
  test('CP-LOAN-04 - Desistimiento', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    await page.locator('#loan-amount').fill('100000');
    await page.locator('#loan-installments').selectOption({ index: 1 });

    await page.locator('#loan-form button').click();
    await page.getByRole('button', { name: 'Confirmar' }).click();

    const loanItem = page.locator('#active-loans-list > div')
      .filter({ hasText: '(1 días)' });

    await expect(loanItem).toBeVisible();

    await expect(
      loanItem.getByRole('button', { name: 'Desistir' })
    ).toBeVisible();
  });

  // =========================================================
  // CP-LOAN-05 - Desistimiento Exitoso
  // =========================================================
  test('CP-LOAN-05 - Desistimiento Exitoso', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    await page.locator('#loan-amount').fill('100000');
    await page.locator('#loan-installments').selectOption({ index: 0 });

    await page.locator('#loan-form button').click();
    await page.getByRole('button', { name: 'Confirmar' }).click();

    await page.getByRole('button', { name: 'Desistir' }).click();
    await page.getByRole('button', { name: 'Confirmar' }).click();

    await expect(page.locator('#active-loans-list'))
      .not.toContainText('$ 100.000,00');
  });

  // =========================================================
  // CP-LOAN-06 - Saldo Insuficiente
  // =========================================================
  test('CP-LOAN-06 - Saldo Insuficiente', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Pago de Servicios' }).click();

    await page.locator('#service-select').selectOption({ index: 1 });
    await page.locator('#service-amount').fill('499000');
    await page.getByRole('button', { name: 'Pagar Servicio' }).click();

    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    await page.locator('#loan-amount').fill('50000');
    await page.locator('#loan-installments').selectOption({ index: 0 });

    await page.locator('#loan-form button').click();
    await page.getByRole('button', { name: 'Confirmar' }).click();

    const loans = page.locator('#active-loans-list');
    await expect(loans).toContainText('$ 50.000,00');
  });

});