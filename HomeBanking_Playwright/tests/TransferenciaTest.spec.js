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
  // CP-TRF-01 - Transferencia Propia Exitosa
  // =========================================================
  test('CP-TRF-01 - Transferencia Propia Exitosa', async ({ page }) => {

    // Reset demo
    await page.locator('#reset-demo-btn').click();
    await page.getByRole('button',{name:'Confirmar'}).click();
    
    // Validar saldo reseteado
    await expect(
      page.locator("//div[@data-balance='checking']//span[@class='balance-value']")
    ).toContainText('500.000,00');

    // Ir a Transferencias
    await page.locator('li').filter({ hasText: 'Transferencias' }).click();

    // Seleccionar cuenta a transferir
    await page.locator('#destination-own-account')
      .selectOption({ index: 1 });
    
    // Completar monto
    await page.locator('#transfer-amount').fill('10000');

    // Solicitar Transferencia
    await page.getByRole('button',{name:'Transferir'}).click();

    // Confirmar modal
    await page.getByRole('button',{name:'Confirmar'}).click();

    // Volver inicio
    await page.locator('li').filter({ hasText: 'Inicio' }).click();
    
    // Validar saldo cargado de Caja de Ahorro
    await expect(
      page.locator("//div[@data-balance='savings']//span[@class='balance-value']")
    ).toContainText('260.000,00');

    // Validaciones
    const transaccion = page.locator(
    '#recent-transactions > div:nth-child(1)'
    );

    await expect(transaccion)
      .toContainText('Transferencia entre cuentas propias');

    await expect(transaccion)
      .toContainText('Hoy');

    await expect(transaccion)
      .toContainText('+$ 10.000,00');


  });



  // =========================================================
  // CP-LOAN-02 - Validación Límite por Operación
  // =========================================================
  test('CP-TRF-02 - Validación Límite por Operación', async ({ page }) => {

    // Reset demo
    await page.locator('#reset-demo-btn').click();
    await page.getByRole('button',{name:'Confirmar'}).click();
    
    // Validar saldo reseteado
    await expect(
      page.locator("//div[@data-balance='checking']//span[@class='balance-value']")
    ).toContainText('500.000,00');

    // Ir a Transferencias
    await page.locator('li').filter({ hasText: 'Transferencias' }).click();

    // Seleccionar cuenta a transferir
    await page.locator('#destination-own-account')
      .selectOption({ index: 1 });
    
    // Completar monto
    await page.locator('#transfer-amount').fill('50001');

    // Solicitar Transferencia
    await page.getByRole('button',{name:'Transferir'}).click();

    // Confirmar modal
    await page.getByRole('button',{name:'Confirmar'}).click();

    
    // Validaciones
    await expect(
    page.locator('#transfer-error')
  ).toContainText(
    'El monto máximo por transferencia es $50.000'
  );

  });

  // =========================================================
  // CP-LOAN-03 - Validación Límite Diario
  // =========================================================

  test('CP-TRF-03 - Validación Límite Diario', async ({ page }) => {

    // Reset demo
    await page.locator('#reset-demo-btn').click();
    await page.getByRole('button',{name:'Confirmar'}).click();
    
    // Validar saldo reseteado
    await expect(
      page.locator("//div[@data-balance='checking']//span[@class='balance-value']")
    ).toContainText('500.000,00');

    // Ir a Transferencias
    await page.locator('li').filter({ hasText: 'Transferencias' }).click();
    
    for (let i = 0; i < 3; i++) {

  // Seleccionar cuenta
  await page.locator('#destination-own-account')
    .selectOption({ index: 1 });

  // Completar monto
  await page.locator('#transfer-amount')
    .fill('40000');

  // Transferir
  await page.getByRole('button', {
    name: 'Transferir'
  }).click();

  // Botón confirmar
  const confirmar = page.getByRole('button', {
    name: 'Confirmar'
  });

  // Si aparece modal → confirmar
  if (await confirmar.isVisible()) {

    await confirmar.click();

    console.log(`Transferencia ${i + 1} realizada`);

    // Esperar que procese
    await page.waitForTimeout(2000);

  } else {

    console.log('No apareció modal');

  }
}


// =======================================
// VALIDAR MENSAJE
// =======================================

await expect(
  page.locator('#transfer-error')
).toContainText(
  'Has excedido el límite diario de transferencias ($100.000)'
);

  });


  // =========================================================
  // CP-LOAN-04 - Validación CBU Inválido
  // =========================================================

  test.only('CP-TRF-04 - Validación CBU Inválido', async ({ page }) => {

      // Ir a Transferencias
      await page.locator('li').filter({ hasText: 'Transferencias' }).click(); 

      // Seleccionar cuenta
      await page.locator('#transfer-type')
        .selectOption({ index: 1 });

      // Completar monto
      await page.locator('#destination-account-number')
        .fill('1234');

      // Completar monto
      await page.locator('#transfer-amount')
      .fill('20000');

      // Transferir
      await page.getByRole('button', {
        name: 'Transferir'
      }).click();

      // Botón confirmar
      await page.locator('#modal-confirm').click();

      // Validaciones
    await expect(
    page.locator('#transfer-error')
  ).toContainText(
    'CBU o Alias de destino no válido'
  );
    

  });
  

});