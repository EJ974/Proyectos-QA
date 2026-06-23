import { test, expect } from '@playwright/test';
import fs from 'fs';
import pdf from 'pdf-parse';

test.describe('Modulo TarjetaVirtual', () => {

  test.beforeEach(async ({ page }) => {

    // Abrir aplicación
    await page.goto('https://homebanking-demo-tests.netlify.app/');

    // Login
    await page.locator('#username').fill('demo');

    await page.locator('#password').fill('demo123');

    await page.locator('#login-btn').click();

  });

  // =========================================================
  // CP-CARD-01: Generación y Límite Exitoso
  // =========================================================
  test('CP-CARD-01: Generación y Límite Exitoso', async ({ page }) => {

    // Ir a Tarjeta Virtual
    await page.locator('li').filter({ hasText: 'Tarjeta Virtual' }).click();

    // Seleccionar Tarejta Caja de Ahorro
    await page.locator('#card-account-select')
      .selectOption({ index: 1 });

    //Generar Tarjeta Virtual
    await page.getByRole('button',{name:'+ Generar Nueva Tarjeta'}).click();

    //Verificar creacion de tarjeta
    const tarjeta = page.locator(
    '#virtual-cards-list > div'
    );

    await expect(tarjeta).toBeVisible();

    // Validar información de la tarjeta
    await expect(tarjeta)
    .toContainText('TITULAR');

    await expect(tarjeta)
    .toContainText('JUAN PÉREZ');

    await expect(tarjeta)
    .toContainText('ACTIVA - VINCULADA A **** **** **** 5678');
    
  });

  // =========================================================
  // CP-CARD-01.1: Generación y Límite Fallido
  // =========================================================
  test('CP-CARD-01.1: Generación y Límite Fallido', async ({ page }) => {

    // Ir a Tarjeta Virtual
    await page.locator('li').filter({ hasText: 'Tarjeta Virtual' }).click();

    let mensajeEncontrado = false;

    for (let i = 0; i < 2; i++) {

    console.log(`Intento ${i + 1}`);

    // Seleccionar Tarejta Caja de Ahorro
    await page.locator('#card-account-select')
      .selectOption({ index: 1 });

    //Generar Tarjeta Virtual
    await page.getByRole('button',{name:'+ Generar Nueva Tarjeta'}).click();

    // Esperar procesamiento
    await page.waitForTimeout(1500);

    // Verificar si apareció el mensaje
    const error = page.getByText('❌ Esta cuenta ya posee una tarjeta virtual activa.');

    if (await error.count() > 0) {
        mensajeEncontrado = true;
        break;
    }

   
    }
    
  });

  // =========================================================
  // CP-CARD-02: Eliminación y Re-generación
  // =========================================================
  test('CP-CARD-02: Eliminación y Re-generación', async ({ page }) => {

    // Ir a Tarjeta Virtual
    await page.locator('li').filter({ hasText: 'Tarjeta Virtual' }).click();

    // Seleccionar Tarejta Caja de Ahorro
    await page.locator('#card-account-select')
      .selectOption({ index: 1 });

    //Generar Tarjeta Virtual
    await page.getByRole('button',{name:'+ Generar Nueva Tarjeta'}).click();

    //Interactuar con la tarjeta
    const tarjeta_1 = page.locator(
    '#virtual-cards-list > div'
    ).click();


    //Eliminar tarjeta
    await page.getByRole('button',{name:'Eliminar'}).click();

    //Confirmar Modal
    await page.getByRole('button',{name:'Confirmar'}).click();


    // Seleccionar Tarejta Caja de Ahorro
    await page.locator('#card-account-select')
      .selectOption({ index: 1 });

    //Generar Tarjeta Virtual
    await page.getByRole('button',{name:'+ Generar Nueva Tarjeta'}).click();

    //Interactuar con la tarjeta
    const tarjeta_2 = page.locator(
    '#virtual-cards-list > div'
    );

    await expect(tarjeta_2).toBeVisible()

    // Validar información de la tarjeta
    await expect(tarjeta_2)
    .toContainText('TITULAR');

    await expect(tarjeta_2)
    .toContainText('JUAN PÉREZ');

    await expect(tarjeta_2)
    .toContainText('ACTIVA - VINCULADA A **** **** **** 5678');
    
  });


// =========================================================
// CP-CARD-03: Validación Visual
// =========================================================
test('CP-CARD-03: Validación Visual', async ({ page }) => {

  // Ir a Tarjetas Virtuales
  await page.locator('li')
    .filter({ hasText: 'Tarjeta Virtual' })
    .click();

  // Botón Generar
  const botonGenerar = page.locator('#generate-card-btn');

  // Click Generar
  await botonGenerar.click();

  // Validar el spinner centrado

  const spinner = botonGenerar.locator('.btn-loader');

  await expect(spinner).toBeVisible({
    timeout: 3000
  });

  console.log('✅ Spinner encontrado y visible');

  const botonBox = await botonGenerar.boundingBox();
  const spinnerBox = await spinner.boundingBox();

  expect(botonBox).not.toBeNull();
  expect(spinnerBox).not.toBeNull();

  console.log('Botón:', botonBox);
  console.log('Spinner:', spinnerBox);

  const centroBotonX =
    botonBox.x + botonBox.width / 2;

  const centroSpinnerX =
    spinnerBox.x + spinnerBox.width / 2;

  const centroBotonY =
    botonBox.y + botonBox.height / 2;

  const centroSpinnerY =
    spinnerBox.y + spinnerBox.height / 2;

  console.log('Centro botón X:', centroBotonX);
  console.log('Centro spinner X:', centroSpinnerX);

  console.log('Centro botón Y:', centroBotonY);
  console.log('Centro spinner Y:', centroSpinnerY);

  const diferenciaX =
    Math.abs(centroBotonX - centroSpinnerX);

  const diferenciaY =
    Math.abs(centroBotonY - centroSpinnerY);

  console.log('Diferencia X:', diferenciaX);
  console.log('Diferencia Y:', diferenciaY);

  console.log(
    'Spinner centrado horizontalmente:',
    diferenciaX <= 5
  );

  console.log(
    'Spinner centrado verticalmente:',
    diferenciaY <= 5
  );

  // Tolerancia de 5 píxeles
  expect(diferenciaX)
    .toBeLessThanOrEqual(5);

  expect(diferenciaY)
    .toBeLessThanOrEqual(5);

  console.log('✅ Spinner centrado correctamente');

  // Esperar que termine la generación
  await page.waitForTimeout(3000);

  //Validar tarjeta generada

  const tarjeta = page.locator(
    '#virtual-cards-list > div'
  ).last();

  await expect(tarjeta).toBeVisible();

  console.log('✅ Tarjeta generada visible');

  // Verificar tamaño (~500px)
  const tarjetaBox = await tarjeta.boundingBox();

  console.log('Ancho tarjeta:', tarjetaBox?.width);
  console.log('Alto tarjeta:', tarjetaBox?.height);

  expect(tarjetaBox?.width)
    .toBeGreaterThanOrEqual(490);

  expect(tarjetaBox?.width)
    .toBeLessThanOrEqual(510);

  console.log('✅ Tamaño de tarjeta válido');

  // Validar los numeros de la tarjeta

  const textoTarjeta = await tarjeta.textContent();

  console.log('Contenido tarjeta:');
  console.log(textoTarjeta);

  expect(textoTarjeta).toMatch(
    /\d{4}\s\d{4}\s\d{4}\s\d{4}/
  );

  console.log('✅ Número de tarjeta válido (16 dígitos)');

});


  


  

});