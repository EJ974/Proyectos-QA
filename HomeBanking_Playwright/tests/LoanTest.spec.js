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

  const ultimoPrestamo = page
    .locator('#active-loans-list > div')
    .last();

  await expect(ultimoPrestamo).toBeVisible();

  // Logs para CI
  console.log(
    'Cantidad de prestamos:',
    await page.locator('#active-loans-list > div').count()
  );

  console.log(
    'Contenido ultimo prestamo:'
  );

  console.log(
    await ultimoPrestamo.textContent()
  );

  // Validaciones
  await expect(ultimoPrestamo)
    .toContainText('100.000');

  await expect(ultimoPrestamo)
    .toContainText('Cuotas');

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

  // Esperar que aparezca la lista actualizada
  await expect(
    page.locator('#active-loans-list')
  ).toBeVisible();

  // Log para GitHub Actions
  console.log(
    'Lista de préstamos:'
  );

  console.log(
    await page.locator('#active-loans-list')
      .textContent()
  );

  // Buscar específicamente el préstamo creado
  const prestamoCreado = page
    .locator('#active-loans-list > div')
    .filter({
      hasText: '$ 100.000,00'
    });

  await expect(prestamoCreado)
    .toHaveCount(1);

  await expect(prestamoCreado)
    .toBeVisible();

  console.log(
    'Préstamo encontrado:'
  );

  console.log(
    await prestamoCreado.textContent()
  );

  // Cancelar préstamo
  await prestamoCreado
    .getByRole('button', {
      name: 'Pagar Total'
    })
    .click();

  if (await confirmar.isVisible().catch(() => false)) {
    await confirmar.click();
  }

  // Validar toast
  await expect(
    page.locator('#toast-container')
  ).toContainText(
    'Préstamo cancelado exitosamente'
  );

  // Validar que ya no existe el préstamo creado
  await expect(
    page.locator('#active-loans-list > div')
      .filter({
        hasText: '$ 100.000,00'
      })
  ).toHaveCount(0);

  console.log(
    '✅ Préstamo cancelado correctamente'
  );
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
    page.locator('#toast-container')
    ).toContainText(
      'Has desistido del préstamo exitosamente'
    );
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

    const ultimoPrestamo = page
    .locator('#active-loans-list > div')
    .last();

  await expect(ultimoPrestamo)
    .toBeVisible();

  await expect(ultimoPrestamo)
    .toContainText('50.000');
  });

});