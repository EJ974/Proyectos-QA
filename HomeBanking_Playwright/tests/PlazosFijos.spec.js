import { test, expect } from '@playwright/test';
import { loginAndReset } from '../utils/auth';

test.describe('Modulo PlazoFijo', () => {

  test.beforeEach(async ({ page }) => {
    await loginAndReset(page);
  });

  // =========================================================
  // CP-PF-01: Constitución de Plazo Fijo
  // =========================================================
    test('CP-PF-01 - Constitución de Plazo Fijo', async ({ page }) => {

    await page.locator('li')
      .filter({ hasText: 'Plazos Fijos' })
      .click();

    // Esperar que cargue completamente la pantalla
    await expect(
      page.locator('#deposit-form')
    ).toBeVisible();

    await page.locator('#deposit-amount')
      .fill('10000');

    await page.locator('#deposit-term')
      .selectOption({ index: 2 });

    await page.getByRole('button', {
      name: 'Crear Plazo Fijo'
    }).click();

    const confirmar = page.getByRole('button', {
      name: 'Confirmar'
    });

    if (await confirmar.isVisible().catch(() => false)) {
      await confirmar.click();
    }

    const plazoCreado = page
    .locator('#active-deposits-list .deposit-item')
    .filter({
      hasText: '$ 10.000,00'
    });

  await expect(plazoCreado)
    .toHaveCount(1);

  await expect(plazoCreado)
    .toBeVisible();

  console.log(
    await plazoCreado.textContent()
  );

  await expect(plazoCreado)
    .toContainText('$ 10.000,00');

  await expect(plazoCreado)
    .toContainText('90 días');

  await expect(plazoCreado)
    .toContainText('TNA: 42%');

  await expect(plazoCreado)
    .toContainText('Interés estimado');
  });

  // =========================================================
  // CP-PF-02: Validación Monto Mínimo
  // =========================================================
  test('CP-PF-02: Validación Monto Mínimo', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Plazos Fijos' }).click();

    // Esperar que cargue completamente la pantalla
    await expect(
      page.locator('#deposit-form')
    ).toBeVisible();

    await page.locator('#deposit-amount').fill('999');
    await page.locator('#deposit-term').selectOption({ index: 2 });

    await page.getByRole('button', { name: 'Crear Plazo Fijo' }).click();

    const esValido = await page
      .locator('#deposit-amount')
      .evaluate(el => el.checkValidity());

    expect(esValido).toBe(false);

    const mensaje = await page
      .locator('#deposit-amount')
      .evaluate(el => el.validationMessage);

    expect(mensaje).toContain('mayor de o igual a 1000');
  });

  // =========================================================
  // CP-PF-03: Límite Plazos Fijos Simultáneos
  // =========================================================
  test('CP-PF-03: Límite Plazos Fijos Simultáneos', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Plazos Fijos' }).click();

    // Esperar que cargue completamente la pantalla
    await expect(
    page.locator('#deposit-form')
    ).toBeVisible();

    for (let i = 0; i < 4; i++) {

      await page.locator('#deposit-amount').fill('10000');
      await page.locator('#deposit-term').selectOption({ index: 2 });

      await page.getByRole('button', { name: 'Crear Plazo Fijo' }).click();

      const confirmar = page.getByRole('button', { name: 'Confirmar' });

      if (await confirmar.isVisible().catch(() => false)) {
        await confirmar.click();
      }

      await expect(
        page.locator('#toast-container')
      ).toContainText(
        'Plazo fijo creado',
        {
          timeout: 10000
        }
      );
    }

    await expect(
      page.locator('#deposit-error')
    ).toContainText(
      'No puedes tener más de 5 plazos fijos activos',
      {
        timeout: 10000
      }
    );
  });

});