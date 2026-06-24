import { test, expect } from '@playwright/test';
import { loginAndReset } from '../utils/auth';

test.describe('Modulo Login', () => {

  test.beforeEach(async ({ page }) => {
    await loginAndReset(page);
  });

  test('CP-AUTH-01: Login Exitoso', async ({ page }) => {

    await page.locator('#username').fill('demo');
    await page.locator('#password').fill('demo123');
    await page.locator('#login-btn').click();

    const notificacion = page.locator('#toast-container');

    await expect(notificacion).toBeVisible();
    await expect(notificacion)
      .toContainText('¡Bienvenido! Inicio de sesión exitoso');
  });

  test('CP-AUTH-02: Credenciales Inválidas', async ({ page }) => {

    await page.locator('#username').fill('wrong');
    await page.locator('#password').fill('wrong');
    await page.locator('#login-btn').click();

    await expect(page.locator('#login-error')).toBeVisible();
  });

  test('CP-AUTH-03: Cuenta Bloqueada', async ({ page }) => {

    await page.locator('#username').fill('locked');
    await page.locator('#password').fill('locked');
    await page.locator('#login-btn').click();

    await expect(page.locator('#login-error'))
      .toContainText('bloqueada');
  });

  test('CP-AUTH-04: Logout Exitoso', async ({ page }) => {

    await page.locator('#logout-btn').click();
    await page.locator('#modal-confirm').click();

    await expect(page.locator('#toast-container'))
      .toContainText('Sesión cerrada correctamente');
  });

  test('CP-AUTH-05: Documentación', async ({ page }) => {

    await expect(page.locator('.docs-floating-panel')).toBeVisible();
  });

  test('CP-AUTH-06: Plan de Pruebas', async ({ page }) => {

    const boton = page.locator('.btn.btn-doc').first();

    const href = await boton.getAttribute('href');

    expect(href).toContain('docs.google.com');
  });

  test('CP-AUTH-07: Documento Funcional', async ({ page }) => {

    const botones = page.locator('.btn.btn-doc');

    let botonDoc;

    for (let i = 0; i < await botones.count(); i++) {
      const texto = await botones.nth(i).textContent();

      if (texto?.toLowerCase().includes('funcional')) {
        botonDoc = botones.nth(i);
        break;
      }
    }

    expect(botonDoc).toBeTruthy();
  });

});