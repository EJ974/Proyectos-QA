import { test, expect } from '@playwright/test';

test.describe('Modulo Transferencia', () => {

  // 🔥 FIX: estado limpio en cada test
  test.beforeEach(async ({ page }) => {

    await page.goto('https://homebanking-demo-tests.netlify.app/');

    // Reset del sistema (clave para evitar saldo sucio)
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
  // CP-TRF-01 - Transferencia Propia Exitosa
  // =========================================================
  test('CP-TRF-01 - Transferencia Propia Exitosa', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Transferencias' }).click();

    await page.locator('#destination-own-account')
      .selectOption({ index: 1 });

    await page.locator('#transfer-amount').fill('10000');

    await page.getByRole('button', { name: 'Transferir' }).click();

    await page.getByRole('button', { name: 'Confirmar' }).click();

    await page.locator('li').filter({ hasText: 'Inicio' }).click();

    await expect(
      page.locator("//div[@data-balance='savings']//span[@class='balance-value']")
    ).toContainText('260.000,00');

    const transaccion = page.locator('#recent-transactions > div').first();

    await expect(transaccion)
      .toContainText('Transferencia entre cuentas propias');

    await expect(transaccion)
      .toContainText('Hoy');

    await expect(transaccion)
      .toContainText('+$ 10.000,00');
  });

  // =========================================================
  // CP-TRF-02 - Validación Límite por Operación
  // =========================================================
  test('CP-TRF-02 - Validación Límite por Operación', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Transferencias' }).click();

    await page.locator('#destination-own-account')
      .selectOption({ index: 1 });

    await page.locator('#transfer-amount').fill('50001');

    await page.getByRole('button', { name: 'Transferir' }).click();

    await page.getByRole('button', { name: 'Confirmar' }).click();

    await expect(page.locator('#transfer-error'))
      .toContainText('El monto máximo por transferencia es $50.000');
  });

  // =========================================================
  // CP-TRF-03 - Validación Límite Diario
  // =========================================================
  test('CP-TRF-03 - Validación Límite Diario', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Transferencias' }).click();

    for (let i = 0; i < 3; i++) {

      await page.locator('#destination-own-account')
        .selectOption({ index: 1 });

      await page.locator('#transfer-amount')
        .fill('40000');

      await page.getByRole('button', { name: 'Transferir' }).click();

      const confirmar = page.getByRole('button', { name: 'Confirmar' });

      if (await confirmar.isVisible().catch(() => false)) {
        await confirmar.click();
      }

      await page.waitForTimeout(1500);
    }

    await expect(page.locator('#transfer-error'))
      .toContainText(
        'Has excedido el límite diario de transferencias ($100.000)'
      );
  });

  // =========================================================
  // CP-TRF-04 - Validación CBU Inválido
  // =========================================================
  test('CP-TRF-04 - Validación CBU Inválido', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Transferencias' }).click();

    await page.locator('#transfer-type')
      .selectOption({ index: 1 });

    await page.locator('#destination-account-number')
      .fill('1234');

    await page.locator('#transfer-amount')
      .fill('20000');

    await page.getByRole('button', { name: 'Transferir' }).click();

    await page.locator('#modal-confirm').click();

    await expect(page.locator('#transfer-error'))
      .toContainText('CBU o Alias de destino no válido');
  });

});