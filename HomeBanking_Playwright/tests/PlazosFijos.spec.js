import { test, expect } from '@playwright/test';

test.describe('Modulo PlazoFijo', () => {

  test.beforeEach(async ({ page }) => {

    // Abrir aplicación
    await page.goto('https://homebanking-demo-tests.netlify.app/');

    // Login
    await page.locator('#username').fill('demo');

    await page.locator('#password').fill('demo123');

    await page.locator('#login-btn').click();

  });

  // =========================================================
  // CP-PF-01: Constitución de Plazo Fijo
  // =========================================================
  test('CP-TRF-01 - Transferencia Propia Exitosa', async ({ page }) => {

    // Ir a Plazos Fijos
    await page.locator('li').filter({ hasText: 'Plazos Fijos' }).click();

    // Cantidad de plazos antes de crear uno nuevo
    const cantidadAntes = await page
        .locator('#active-deposits-list .deposit-item')
        .count();

    console.log('Plazos antes:', cantidadAntes);

    // Completar monto
    await page.locator('#deposit-amount').fill('10000');

    // Seleccionar cuenta a transferir
    await page.locator('#deposit-term')
      .selectOption({ index: 2 });

    // Solicitar Plazo Fijo
    await page.getByRole('button',{name:'Crear Plazo Fijo'}).click();

    // Confirmar modal
    await page.getByRole('button',{name:'Confirmar'}).click();

    // Esperar que se agregue un nuevo plazo
    await expect(
        page.locator('#active-deposits-list .deposit-item')
    ).toHaveCount(cantidadAntes + 1);

    // Tomar el último plazo creado
    const ultimoPlazo = page
        .locator('#active-deposits-list .deposit-item')
        .last();

    // Mostrar contenido para debug
    console.log(
        await ultimoPlazo.textContent()
    );

    // Validaciones
    await expect(ultimoPlazo)
        .toContainText('$ 10.000,00');

    await expect(ultimoPlazo)
        .toContainText('90 días');

    await expect(ultimoPlazo)
        .toContainText('TNA: 42%');

    await expect(ultimoPlazo)
        .toContainText('Interés estimado: $ 1.035,62');

  });


  // =========================================================
  // CP-PF-02: Validación Monto Mínimo
  // =========================================================
  test('CP-PF-02: Validación Monto Mínimo', async ({ page }) => {

    // Ir a Plazos Fijos
    await page.locator('li').filter({ hasText: 'Plazos Fijos' }).click();

    // Completar monto
    await page.locator('#deposit-amount').fill('999');

    // Seleccionar cuenta a transferir
    await page.locator('#deposit-term')
      .selectOption({ index: 2 });

    // Solicitar Plazo Fijo
    await page.getByRole('button',{name:'Crear Plazo Fijo'}).click();

    // Validar contenido
    console.log(
    await page.locator('#deposit-amount')
        .evaluate(el => ({
        min: el.min,
        value: el.value,
        validationMessage: el.validationMessage
        }))
    );

    // Validar info
    const esValido = await page.locator('#deposit-amount')
    .evaluate(el => el.checkValidity());

    expect(esValido).toBe(false);

    // Verificar mensaje
    const mensaje = await page.locator('#deposit-amount')
    .evaluate(el => el.validationMessage);

    expect(mensaje).toContain(
    'El valor debe ser mayor de o igual a 1000'
    );

  });


  // =========================================================
  // CP-PF-03: Límite Plazos Fijos Simultáneos
  // =========================================================
  test('CP-PF-03: Límite Plazos Fijos Simultáneos', async ({ page }) => {

    // Ir a Plazos Fijos
    await page.locator('li').filter({ hasText: 'Plazos Fijos' }).click();

    // Crear 4 plazos fijos
    for (let i = 0; i < 4; i++) {

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

    // Si aparece modal, confirmar
    if (await confirmar.isVisible()) {

        await confirmar.click();

        console.log(`Plazo fijo ${i + 1} creado`);

    } else {

        console.log(`Intento ${i + 1}: no apareció modal`);

    }

    // Pequeña espera para que se actualice la lista
    await page.waitForTimeout(1000);
    }

    // Validar mensaje de límite alcanzado
    await expect(
    page.locator('#deposit-error')
    ).toContainText(
    'No puedes tener más de 5 plazos fijos activos'
    );

  });


  

});