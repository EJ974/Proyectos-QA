import { test, expect } from '@playwright/test';
import fs from 'fs';
import pdf from 'pdf-parse';

test.describe('Modulo PagoServicio', () => {

  test.beforeEach(async ({ page }) => {

    // Abrir aplicación
    await page.goto('https://homebanking-demo-tests.netlify.app/');

    // Login
    await page.locator('#username').fill('demo');

    await page.locator('#password').fill('demo123');

    await page.locator('#login-btn').click();

  });

  // =========================================================
  // CP-SERV-01: Pago Exitoso y PDF
  // =========================================================
  test('CP-SERV-01: Pago Exitoso y PDF', async ({ page }) => {

    // Ir a Plazos Fijos
    await page.locator('li').filter({ hasText: 'Pago de Servicios' }).click();

    // Seleccionar cuenta a transferir
    await page.locator('#service-select')
      .selectOption({ index: 4 });

    // Completar monto
    await expect(
    page.locator('#service-amount')
    ).toHaveValue('12000');

    // Solicitar Plazo Fijo
    await page.getByRole('button',{name:'Pagar Servicio'}).click();

    //Verificar mensaje de exito
    const mensajeExito = page.locator(
    '#service-payment-form > div.payment-success-msg > div > p'
    );

    await expect(mensajeExito).toBeVisible();

    await expect(mensajeExito).toContainText(
    '¡Pago Finalizado con éxito'
    );

    //Verificar boton de PDF
    const botonpdf = page.locator(
    '#download-receipt-pdf'
    );

    await expect(botonpdf).toBeVisible();

    await expect(botonpdf).toContainText(
    '📥 Descargar Comprobante PDF'
    );

    // Descargar PDF
    const downloadPromise = page.waitForEvent('download');

    await page.locator('#download-receipt-pdf').click();

    const download = await downloadPromise;

    const filePath = await download.path();

    console.log('PDF descargado en:', filePath);

    // Leer el PDF
    const buffer = fs.readFileSync(filePath);

    const pdfData = await pdf(buffer);

    const texto = pdfData.text;

    console.log(texto);

    //Validar la informacion del PDF
    expect(texto).toContain('COMPROBANTE DE PAGO');

    expect(texto).toContain('Proveedor: Fibertel');

    expect(texto).toContain('CUIT: 30-44332211-8');

    expect(texto).toContain('Cliente: Juan Pérez');

    expect(texto).toContain('DNI / CUIT: 12.345.678');

    expect(texto).toMatch(
    /N° Comprobante:\s*\d+/
    );

    // Fecha actual
    const fechaActual = new Date();

    const fechaFormateada =
      `${fechaActual.getDate()}/` +
      `${fechaActual.getMonth() + 1}/` +
      `${fechaActual.getFullYear()}`;

    console.log('Fecha esperada:', fechaFormateada);

    expect(texto).toContain(
      `Fecha: ${fechaFormateada}`
    );

    expect(texto).toContain(
    'Servicio: Pago por servicio de Internet'
    );

    expect(texto).toContain(
    'Período: junio de 2026'
    );

    expect(texto).toMatch(
    /Importe Total:\s*\$\s*12\.000,00/
    );

    expect(texto).toContain(
    'Forma de pago: Cuenta Corriente (**** **** **** 1234)'
    );

    expect(texto).toContain(
    'Pago acreditado'
    );

    expect(texto).toContain(
    '¡Gracias por elegir Home Banking!'
    );
  });

  // =========================================================
  // CP-SERV-02: Saldo Insuficiente
  // =========================================================
  test('CP-SERV-02: Saldo Insuficiente', async ({ page }) => {

    // Ir a Plazos Fijos
    await page.locator('li').filter({ hasText: 'Pago de Servicios' }).click();

    let mensajeEncontrado = false;

    for (let i = 0; i < 2; i++) {

    console.log(`Intento ${i + 1}`);

    // Ir a Pago de Servicios
    await page.locator('li')
        .filter({ hasText: 'Pago de Servicios' })
        .click();

    // Seleccionar servicio
    await page.locator('#service-select')
        .selectOption({ index: 4 });

    // Completar monto
    await page.locator('#service-amount')
        .fill('125450');

    // Pagar
    await page.getByRole('button', {
        name: 'Pagar Servicio'
    }).click();

    // Esperar procesamiento
    await page.waitForTimeout(1500);

    // Verificar si apareció el mensaje
    const error = page.getByText('Saldo insuficiente');

    if (await error.count() > 0) {
        mensajeEncontrado = true;
        break;
    }

    // Volver a Inicio
    await page.locator('li')
        .filter({ hasText: 'Inicio' })
        .click();

    await page.waitForTimeout(1000);
    }

    expect(mensajeEncontrado).toBeTruthy();

    
  });


  


  

});