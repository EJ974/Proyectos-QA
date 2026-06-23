import { test, expect } from '@playwright/test';
import fs from 'fs';
import pdf from 'pdf-parse';

test.describe('Modulo PagoServicio', () => {

  // 🔥 FIX: estado limpio en cada test
  test.beforeEach(async ({ page }) => {

    await page.goto('https://homebanking-demo-tests.netlify.app/');

    // Reset del sistema (evita datos sucios)
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
  // CP-SERV-01: Pago Exitoso y PDF
  // =========================================================
  test('CP-SERV-01: Pago Exitoso y PDF', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Pago de Servicios' }).click();

    await page.locator('#service-select').selectOption({ index: 4 });

    await expect(page.locator('#service-amount')).toHaveValue('12000');

    await page.getByRole('button', { name: 'Pagar Servicio' }).click();

    const mensajeExito = page.locator(
      '#service-payment-form > div.payment-success-msg > div > p'
    );

    await expect(mensajeExito).toBeVisible();

    await expect(mensajeExito).toContainText('¡Pago Finalizado con éxito');

    const botonpdf = page.locator('#download-receipt-pdf');

    await expect(botonpdf).toBeVisible();

    await expect(botonpdf).toContainText('📥 Descargar Comprobante PDF');

    // Descargar PDF
    const downloadPromise = page.waitForEvent('download');
    await botonpdf.click();
    const download = await downloadPromise;

    const filePath = await download.path();

    const buffer = fs.readFileSync(filePath);
    const pdfData = await pdf(buffer);
    const texto = pdfData.text;

    expect(texto).toContain('COMPROBANTE DE PAGO');
    expect(texto).toContain('Proveedor: Fibertel');
    expect(texto).toContain('CUIT: 30-44332211-8');
    expect(texto).toContain('Cliente: Juan Pérez');
    expect(texto).toContain('DNI / CUIT: 12.345.678');

    expect(texto).toMatch(/N° Comprobante:\s*\d+/);

    const fechaActual = new Date();

    const fechaFormateada =
      `${fechaActual.getDate()}/` +
      `${fechaActual.getMonth() + 1}/` +
      `${fechaActual.getFullYear()}`;

    expect(texto).toContain(`Fecha: ${fechaFormateada}`);

    expect(texto).toContain('Servicio: Pago por servicio de Internet');
    expect(texto).toContain('Período: junio de 2026');

    expect(texto).toMatch(/Importe Total:\s*\$\s*12\.000,00/);

    expect(texto).toContain('Forma de pago: Cuenta Corriente (**** **** **** 1234)');
    expect(texto).toContain('Pago acreditado');
    expect(texto).toContain('¡Gracias por elegir Home Banking!');
  });

  // =========================================================
  // CP-SERV-02: Saldo Insuficiente
  // =========================================================
  test('CP-SERV-02: Saldo Insuficiente', async ({ page }) => {

    let mensajeEncontrado = false;

    for (let i = 0; i < 2; i++) {

      await page.locator('li')
        .filter({ hasText: 'Pago de Servicios' })
        .click();

      await page.locator('#service-select')
        .selectOption({ index: 4 });

      await page.locator('#service-amount')
        .fill('125450');

      await page.getByRole('button', { name: 'Pagar Servicio' }).click();

      await page.waitForTimeout(1500);

      const error = page.getByText('Saldo insuficiente');

      if (await error.count() > 0) {
        mensajeEncontrado = true;
        break;
      }

      await page.locator('li')
        .filter({ hasText: 'Inicio' })
        .click();

      await page.waitForTimeout(1000);
    }

    expect(mensajeEncontrado).toBeTruthy();
  });

});