import { test, expect } from '@playwright/test';

test.describe('Modulo Login', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://homebanking-demo-tests.netlify.app/');

    await expect(page.locator('#username')).toBeVisible();

  });

  // =========================================================
  // CP-AUTH-01: Login Exitoso
  // =========================================================
  test('CP-AUTH-01: Login Exitoso', async ({ page }) => {

    await page.locator('#username').fill('demo');
    await page.locator('#password').fill('demo123');
    await page.locator('#login-btn').click();

    const notificacion = page.locator('#toast-container');

    await expect(notificacion).toBeVisible();

    await expect(notificacion)
      .toContainText('¡Bienvenido! Inicio de sesión exitoso');

  });

  // =========================================================
  // CP-AUTH-02: Credenciales Inválidas
  // =========================================================
  test('CP-AUTH-02: Credenciales Inválidas', async ({ page }) => {

    await page.locator('#username').fill('wrong');
    await page.locator('#password').fill('wrong');
    await page.locator('#login-btn').click();

    await expect(page.locator('#login-error'))
      .toBeVisible();

  });

  // =========================================================
  // CP-AUTH-03: Cuenta Bloqueada
  // =========================================================
  test('CP-AUTH-03: Cuenta Bloqueada', async ({ page }) => {

    await page.locator('#username').fill('locked');
    await page.locator('#password').fill('locked');
    await page.locator('#login-btn').click();

    await expect(page.locator('#login-error'))
      .toContainText('bloqueada');

  });

  // =========================================================
  // CP-AUTH-04: Logout Exitoso
  // =========================================================
  test('CP-AUTH-04: Logout Exitoso', async ({ page }) => {

    await page.locator('#username').fill('demo');
    await page.locator('#password').fill('demo123');
    await page.locator('#login-btn').click();

    await expect(page.locator('#logout-btn')).toBeVisible();

    await page.locator('#logout-btn').click();

    await page.locator('#modal-confirm').click();

    await expect(page.locator('#toast-container'))
      .toContainText('Sesión cerrada correctamente');

  });

  // =========================================================
  // CP-AUTH-05: Documentación
  // =========================================================
  test('CP-AUTH-05: Documentación', async ({ page }) => {

    await page.locator('#username').fill('demo');
    await page.locator('#password').fill('demo123');
    await page.locator('#login-btn').click();

    await expect(page.locator('.docs-floating-panel'))
      .toBeVisible();

  });

  // =========================================================
  // CP-AUTH-06: Plan de Pruebas
  // =========================================================
  test('CP-AUTH-06: Plan de Pruebas', async ({ page }) => {

    await page.locator('#username').fill('demo');
    await page.locator('#password').fill('demo123');
    await page.locator('#login-btn').click();

    const boton = page.locator('.btn.btn-doc').first();

    await expect(boton).toBeVisible();

    const href = await boton.getAttribute('href');

    expect(href).toContain('docs.google.com');

  });

  // =========================================================
  // CP-AUTH-07: Documento Funcional
  // =========================================================
  test('CP-AUTH-07: Documento Funcional', async ({ page }) => {

    await page.locator('#username').fill('demo');
    await page.locator('#password').fill('demo123');
    await page.locator('#login-btn').click();

    const botones = page.locator('.btn.btn-doc');

    let botonDoc;

    const cantidad = await botones.count();

    for (let i = 0; i < cantidad; i++) {

      const texto = await botones.nth(i).textContent();

      if (texto?.toLowerCase().includes('funcional')) {
        botonDoc = botones.nth(i);
        break;
      }

    }

    expect(botonDoc).toBeTruthy();

  });

});