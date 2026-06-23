import { test, expect } from '@playwright/test';

test.describe('Modulo PlazoFijo', () => {

  // 🔥 FIX: estado limpio en cada test
  test.beforeEach(async ({ page }) => {

    await page.goto('https://homebanking-demo-tests.netlify.app/');

    // Reset del sistema (clave para CI estable)
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
  // CP-PF-01: Constitución de Plazo Fijo
  // =========================================================
  test('CP-PF-01 - Constitución de Plazo Fijo', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Plazos Fijos' }).click();

    const cantidadAntes = await page
      .locator('#active-deposits-list .deposit-item')
      .count();

    await page.locator('#deposit-amount').fill('10000');

    await page.locator('#deposit-term').selectOption({ index: 2 });

    await page.getByRole('button', { name: 'Crear Plazo Fijo' }).click();

    await page.getByRole('button', { name: 'Confirmar' }).click();

    await expect(
      page.locator('#active-deposits-list .deposit-item')
    ).toHaveCount(cantidadAntes + 1);

    const ultimoPlazo = page
      .locator('#active-deposits-list .deposit-item')
      .last();

    await expect(ultimoPlazo).toContainText('$ 10.000,00');
    await expect(ultimoPlazo).toContainText('90 días');
    await expect(ultimoPlazo).toContainText('TNA: 42%');
    await expect(ultimoPlazo).toContainText('Interés estimado: $ 1.035,62');
  });

  // =========================================================
  // CP-PF-02: Validación Monto Mínimo
  // =========================================================
  test('CP-PF-02: Validación Monto Mínimo', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Plazos Fijos' }).click();

    await page.locator('#deposit-amount').fill('999');

    await page.locator('#deposit-term').selectOption({ index: 2 });

    await page.getByRole('button', { name: 'Crear Plazo Fijo' }).click();

    const esValido = await page.locator('#deposit-amount')
      .evaluate(el => el.checkValidity());

    expect(esValido).toBe(false);

    const mensaje = await page.locator('#deposit-amount')
      .evaluate(el => el.validationMessage);

    expect(mensaje).toContain('mayor de o igual a 1000');
  });

  // =========================================================
  // CP-PF-03: Límite Plazos Fijos Simultáneos
  // =========================================================
  test('CP-PF-03: Límite Plazos Fijos Simultáneos', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Plazos Fijos' }).click();

    for (let i = 0; i < 4; i++) {

      await page.locator('#deposit-amount').fill('10000');

      await page.locator('#deposit-term').selectOption({ index: 2 });

      await page.getByRole('button', { name: 'Crear Plazo Fijo' }).click();

      const confirmar = page.getByRole('button', { name: 'Confirmar' });

      if (await confirmar.isVisible().catch(() => false)) {
        await confirmar.click();
      }

      await page.waitForTimeout(1000);
    }

    await expect(
      page.locator('#deposit-error')
    ).toContainText(
      'No puedes tener más de 5 plazos fijos activos'
    );
  });

});