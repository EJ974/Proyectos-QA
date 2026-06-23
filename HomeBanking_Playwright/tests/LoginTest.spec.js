import { test, expect } from '@playwright/test';

test.describe('Modulo Login', () => {

  // 🔥 Solo abrir app antes de cada test
  test.beforeEach(async ({ page }) => {

    await page.goto('https://homebanking-demo-tests.netlify.app/');

    // opcional: reset si existe (seguro para CI)
    const resetBtn = page.locator('#reset-demo-btn');

    if (await resetBtn.isVisible().catch(() => false)) {
      await resetBtn.click();
      await page.getByRole('button', { name: 'Confirmar' }).click();
    }
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

    const error = page.locator('#login-error');

    await expect(error).toBeVisible();

    await expect(error)
      .toContainText('Usuario o contraseña incorrectos');
  });

  // =========================================================
  // CP-AUTH-03: Cuenta Bloqueada
  // =========================================================
  test('CP-AUTH-03: Cuenta Bloqueada', async ({ page }) => {

    await page.locator('#username').fill('locked');
    await page.locator('#password').fill('locked');
    await page.locator('#login-btn').click();

    const error = page.locator('#login-error');

    await expect(error).toBeVisible();

    await expect(error)
      .toContainText('Tu cuenta ha sido bloqueada temporalmente. Contacta con soporte.');
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

    const toast = page.locator('#toast-container');

    await expect(toast)
      .toContainText('Sesión cerrada correctamente');
  });

  // =========================================================
  // CP-AUTH-05: Documentación
  // =========================================================
  test('CP-AUTH-05: Visualización de Documentación', async ({ page }) => {

    const panel = page.locator('.docs-floating-panel');

    await expect(panel).toBeVisible();
  });

  // =========================================================
  // CP-AUTH-06: Plan de Pruebas
  // =========================================================
  test('CP-AUTH-06: Link Plan de Pruebas', async ({ page }) => {

    const boton = page.locator('.btn.btn-doc').first();

    await expect(boton).toContainText('Plan de Pruebas');

    const href = await boton.getAttribute('href');

    expect(href).toContain('docs.google.com');

    expect(href).toContain('1mw2tHUOUtaQeuTKEvuixQkx5sPYfQTgVr5d5Hxb17q8');

    const [nuevaPagina] = await Promise.all([
      page.context().waitForEvent('page'),
      boton.click()
    ]);

    await nuevaPagina.waitForLoadState();

    expect(nuevaPagina.url()).toContain('docs.google.com/document');

    await nuevaPagina.close();
  });

  // =========================================================
  // CP-AUTH-07: Documento Funcional
  // =========================================================
  test('CP-AUTH-07: Link Documento Funcional', async ({ page }) => {

    const botones = page.locator('.btn.btn-doc');

    const cantidad = await botones.count();

    let botonDoc;

    for (let i = 0; i < cantidad; i++) {

      const texto = await botones.nth(i).textContent();

      if (texto?.toLowerCase().includes('funcional')) {
        botonDoc = botones.nth(i);
        break;
      }
    }

    expect(botonDoc).toBeTruthy();

    const href = await botonDoc.getAttribute('href');

    expect(href).toContain('docs.google.com');
    expect(href).toContain('1KcJmUn0KpLSNQxVGpXlYsOVFYvabJrrsrYG_KFsHDq4');

    const [nuevaPagina] = await Promise.all([
      page.context().waitForEvent('page'),
      botonDoc.click()
    ]);

    await nuevaPagina.waitForLoadState();

    expect(nuevaPagina.url()).toContain('docs.google.com/document');

    await nuevaPagina.close();
  });

});