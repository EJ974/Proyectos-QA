import { test, expect } from '@playwright/test';

test.describe('Modulo Prestamos', () => {

  test.beforeEach(async ({ page }) => {

    // Abrir aplicación
    await page.goto('https://homebanking-demo-tests.netlify.app/');

    // Login
    await page.locator('#username').fill('demo');

    await page.locator('#password').fill('demo123');

    await page.locator('#login-btn').click();

  });

  // =========================================================
  // CP-LOAN-01 - Solicitud Prestamo
  // =========================================================

  test('CP-LOAN-01 - Solicitud Prestamo', async ({ page }) => {

    // Validar saldo inicial
    await expect(
      page.locator("//div[@data-balance='checking']//span[@class='balance-value']")
    ).toContainText('125.450,75');

    // Ir a prestamos
    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    // Completar monto
    await page.locator('#loan-amount').fill('100000');

    // Seleccionar cuotas
    await page.locator('#loan-installments')
      .selectOption({ index: 1 });

    // Solicitar préstamo
    await page.locator('#loan-form button').click();

    // Confirmar modal
   await page.getByRole('button',{name:'Confirmar'}).click();

    // Obtener información préstamo
    const infoPrestamo = await page
      .locator('#active-loans-list')
      .textContent();

    console.log(infoPrestamo);

        // Validaciones
    await expect(
    page.locator('#active-loans-list')
    ).toContainText('$ 100.000,00');

    // Validar botón Desistir
    await expect(
    page.getByRole('button', { name: 'Desistir' })
    ).toBeVisible();

    // Validar botón Pagar Total
    await expect(
    page.getByRole('button', { name: 'Pagar Total' }).nth(1)
    ).toBeVisible();

    // Validar cuotas
    await expect(
    page.locator('#active-loans-list')
    ).toContainText('Cuotas: 12');

    // Validar total a pagar
    await expect(
    page.locator('#active-loans-list')
    ).toContainText('Total a Pagar: $ 165.000,00');

    // Volver inicio
    await page.locator('li').filter({ hasText: 'Inicio' }).click();

    // Validar saldo actualizado
    await expect(
      page.locator("//div[@data-balance='checking']//span[@class='balance-value']")
    ).toContainText('225.450,75');

  });

  // =========================================================
  // CP-LOAN-02 - Validacion monto maximo
  // =========================================================

  test('CP-LOAN-02 - Validacion monto maximo', async ({ page }) => {

    // Ir a prestamos
    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    // Completar monto inválido
    await page.locator('#loan-amount').fill('500001');

    // Seleccionar cuotas
    await page.locator('#loan-installments')
      .selectOption({ index: 1 });

    // Click solicitar
    await page.locator('#loan-form button').click();

    // Obtener mensaje HTML5
    const validationMessage = await page
      .locator('#loan-amount')
      .evaluate(el => el.validationMessage);

    console.log(validationMessage);

    // Validar mensaje
    expect(validationMessage)
      .toContain('menor de o igual a 500000');

    // Validar que NO aparezca modal
    await expect(
    page.locator('#modal > div')
    ).not.toBeVisible();

  });

  // =========================================================
  // CP-LOAN-03 - Cancelacion Total
  // =========================================================

  test('CP-LOAN-03 - Cancelacion Total', async ({ page }) => {

    // Reset demo
    await page.locator('#reset-demo-btn').click();
    await page.getByRole('button',{name:'Confirmar'}).click();
    // Validar saldo reseteado
    await expect(
      page.locator("//div[@data-balance='checking']//span[@class='balance-value']")
    ).toContainText('500.000,00');

    // Ir a prestamos
    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    // Completar monto
    await page.locator('#loan-amount').fill('100000');

    // Seleccionar cuotas
    await page.locator('#loan-installments')
      .selectOption({ index: 1 });

    // Solicitar
    await page.locator('#loan-form button').click();

    // Confirmar modal
   await page.getByRole('button',{name:'Confirmar'}).click();


    // Validar información préstamo
    await expect(
      page.locator('#active-loans-list')
    ).toContainText('$ 100.000,00');



    // Ir inicio
    await page.locator('li').filter({ hasText: 'Inicio' }).click();

    // Validar saldo actualizado
    await expect(
      page.locator("//div[@data-balance='checking']//span[@class='balance-value']")
    ).toContainText('600.000,00');

    // Volver a préstamos
    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    // Click pagar total
    await page.getByRole('button',{name:'Pagar Total'}).nth(1).click();

    // Confirmar modal
    await page.getByRole('button',{name:'Confirmar'}).click();

    // Validar que NO exista préstamo
    await expect(
      page.locator('#active-loans-list')
    ).not.toContainText('$ 100.000,00');

  });


  test('CP-LOAN-04 - Desistimiento', async ({ page }) => {

  // Ir a prestamos
  await page.locator('li')
    .filter({ hasText: 'Préstamos' })
    .click();

  // Completar monto
  await page.locator('#loan-amount')
    .fill('100000');

  // Seleccionar cuotas
  await page.locator('#loan-installments')
    .selectOption({ index: 1 });

  // Solicitar
  await page.locator('#loan-form button')
    .click();

  // Confirmar modal
  await page.getByRole('button', { name: 'Confirmar' })
    .click();


  // =====================================================
  // CASO 1
  // Dias <= 10 → Debe aparecer Desistir
  // =====================================================

  const prestamoNuevo = page
    .locator('#active-loans-list > div')
    .filter({ hasText: '(1 días)' });

  // Validar préstamo nuevo
  await expect(prestamoNuevo)
    .toContainText('(1 días)');

  // Validar botón visible
  await expect(
    prestamoNuevo.getByRole('button', { name: 'Desistir' })
  ).toBeVisible();


  // =====================================================
  // CASO 2
  // Dias > 10 → NO debe aparecer Desistir
  // =====================================================

  const prestamoViejo = page
    .locator('#active-loans-list > div')
    .filter({ hasText: '(31 días)' });

  // Validar préstamo viejo
  await expect(prestamoViejo)
    .toContainText('(31 días)');

  // Validar que NO exista botón
  await expect(
    prestamoViejo.getByRole('button', { name: 'Desistir' })
  ).toHaveCount(0);

});

test('CP-LOAN-05 - Desistimiento Exitoso', async ({ page }) => {

  // Reset demo
    await page.locator('#reset-demo-btn').click();
    await page.getByRole('button',{name:'Confirmar'}).click();
    // Validar saldo reseteado
    await expect(
      page.locator("//div[@data-balance='checking']//span[@class='balance-value']")
    ).toContainText('500.000,00');

    // Ir a prestamos
    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    // Completar monto
    await page.locator('#loan-amount').fill('100000');

    // Seleccionar cuotas
    await page.locator('#loan-installments')
      .selectOption({ index: 0 });

    // Solicitar
    await page.locator('#loan-form button').click();

    // Confirmar modal
   await page.getByRole('button',{name:'Confirmar'}).click();

    // Ir inicio
    await page.locator('li').filter({ hasText: 'Inicio' }).click();

    // Validar saldo actualizado
    await expect(
      page.locator("//div[@data-balance='checking']//span[@class='balance-value']")
    ).toContainText('600.000,00');

    // Volver a préstamos
    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    // Desistir
    await page.getByRole('button',{name:'Desistir'}).click();

    // Confirmar modal
   await page.getByRole('button',{name:'Confirmar'}).click();

   // Ir inicio
    await page.locator('li').filter({ hasText: 'Inicio' }).click();

    // Validar saldo original
    await expect(
      page.locator("//div[@data-balance='checking']//span[@class='balance-value']")
    ).toContainText('500.000,00');

    // Volver a préstamos
    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    // Validar que NO exista préstamo
    await expect(
      page.locator('#active-loans-list')
    ).not.toContainText('$ 100.000,00');

  });


  test('CP-LOAN-06 - Desistimiento - Saldo Insuficiente', async ({ page }) => {

  // Reset demo
    await page.locator('#reset-demo-btn').click();
    await page.getByRole('button',{name:'Confirmar'}).click();
    // Validar saldo reseteado
    await expect(
      page.locator("//div[@data-balance='checking']//span[@class='balance-value']")
    ).toContainText('500.000,00');

    // Ir a Pago de Servicios
    await page.locator('li').filter({ hasText: 'Pago de Servicios' }).click();

    //Seleccionar servicio a pagar
    await page.locator('#service-select')
      .selectOption({ index: 1 });

    //ingresar monto
    await page.locator('#service-amount').fill('499000');
    
    //realizar pago
    await page.getByRole('button',{name:'Pagar Servicio'}).click();

    // Ir inicio
    await page.locator('li').filter({ hasText: 'Inicio' }).click();

    await expect(
      page.locator("//div[@data-balance='checking']//span[@class='balance-value']")
    ).toContainText('1.000,00');

    // Ir a prestamos
    await page.locator('li').filter({ hasText: 'Préstamos' }).click();

    // Completar monto
    await page.locator('#loan-amount').fill('50000');

    // Seleccionar cuotas
    await page.locator('#loan-installments')
      .selectOption({ index: 0 });

    // Solicitar
    await page.locator('#loan-form button').click();

    // Confirmar modal
   await page.getByRole('button',{name:'Confirmar'}).click();

   //esperar si aparece el prestamo
   await expect(
      page.locator('#active-loans-list')
    ).toContainText('$ 50.000,00');

   // Validar que NO exista préstamo
    await expect(
      page.locator('#active-loans-list')
    ).not.toContainText('$ 50.000,00');

  });


});