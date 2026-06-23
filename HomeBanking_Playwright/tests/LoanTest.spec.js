import { test, expect } from '@playwright/test';

test.describe('Modulo Prestamos', () => {

  // 🔥 FIX PRINCIPAL: estado limpio para cada test
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
  // CP-LOAN-01 - Solicitud Prestamo
  // =========================================================
  test('CP-LOAN-01 - Solicitud Prestamo', async ({ page }) => {

    await expect(
      page.locator("//div[@data-balance='checking']//span[@class='balance-value']")
    ).toContainText('500.000,00');

    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    await page.locator('#loan-amount').fill('100000');

    await page.locator('#loan-installments').selectOption({ index: 1 });

    await page.locator('#loan-form button').click();

    await page.getByRole('button', { name: 'Confirmar' }).click();

    await expect(page.locator('#active-loans-list'))
      .toContainText('$ 100.000,00');

    await expect(page.getByRole('button', { name: 'Desistir' }))
      .toBeVisible();

    await expect(page.getByRole('button', { name: 'Pagar Total' }).nth(1))
      .toBeVisible();

    await expect(page.locator('#active-loans-list'))
      .toContainText('Cuotas: 12');

    await expect(page.locator('#active-loans-list'))
      .toContainText('Total a Pagar: $ 165.000,00');

    await page.locator('li').filter({ hasText: 'Inicio' }).click();

    await expect(
      page.locator("//div[@data-balance='checking']//span[@class='balance-value']")
    ).toContainText('400.000,00');
  });

  // =========================================================
  // CP-LOAN-02 - Validacion monto maximo
  // =========================================================
  test('CP-LOAN-02 - Validacion monto maximo', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    await page.locator('#loan-amount').fill('500001');

    await page.locator('#loan-installments').selectOption({ index: 1 });

    await page.locator('#loan-form button').click();

    const validationMessage = await page
      .locator('#loan-amount')
      .evaluate(el => el.validationMessage);

    expect(validationMessage)
      .toContain('menor de o igual a 500000');

    await expect(page.locator('#modal > div'))
      .not.toBeVisible();
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

    await expect(page.locator('#active-loans-list'))
      .toContainText('$ 100.000,00');

    await page.locator('li').filter({ hasText: 'Inicio' }).click();

    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    await page.getByRole('button', { name: 'Pagar Total' }).nth(1).click();

    await page.getByRole('button', { name: 'Confirmar' }).click();

    await expect(page.locator('#active-loans-list'))
      .not.toContainText('$ 100.000,00');
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

    const prestamoNuevo = page
      .locator('#active-loans-list > div')
      .filter({ hasText: '(1 días)' });

    await expect(prestamoNuevo)
      .toContainText('(1 días)');

    await expect(
      prestamoNuevo.getByRole('button', { name: 'Desistir' })
    ).toBeVisible();

    const prestamoViejo = page
      .locator('#active-loans-list > div')
      .filter({ hasText: '(31 días)' });

    await expect(prestamoViejo)
      .toContainText('(31 días)');

    await expect(
      prestamoViejo.getByRole('button', { name: 'Desistir' })
    ).toHaveCount(0);
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

    await page.locator('li').filter({ hasText: 'Inicio' }).click();

    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    await page.getByRole('button', { name: 'Desistir' }).click();

    await page.getByRole('button', { name: 'Confirmar' }).click();

    await page.locator('li').filter({ hasText: 'Inicio' }).click();

    await expect(
      page.locator("//div[@data-balance='checking']//span[@class='balance-value']")
    ).toContainText('500.000,00');

    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    await expect(page.locator('#active-loans-list'))
      .not.toContainText('$ 100.000,00');
  });

  // =========================================================
  // CP-LOAN-06 - Saldo Insuficiente
  // =========================================================
  test('CP-LOAN-06 - Desistimiento - Saldo Insuficiente', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Pago de Servicios' }).click();

    await page.locator('#service-select').selectOption({ index: 1 });

    await page.locator('#service-amount').fill('499000');

    await page.getByRole('button', { name: 'Pagar Servicio' }).click();

    await page.locator('li').filter({ hasText: 'Inicio' }).click();

    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    await page.locator('#loan-amount').fill('50000');

    await page.locator('#loan-installments').selectOption({ index: 0 });

    await page.locator('#loan-form button').click();

    await page.getByRole('button', { name: 'Confirmar' }).click();

    await expect(page.locator('#active-loans-list'))
      .toContainText('$ 50.000,00');

    await expect(page.locator('#active-loans-list'))
      .not.toContainText('$ 50.000,00');
  });

});