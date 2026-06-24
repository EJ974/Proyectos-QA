// utils/auth.js

export async function loginAndReset(page) {

  await page.goto('https://homebanking-demo-tests.netlify.app/');

  // Esperar que cargue el botón de reset o login
  await page.waitForSelector('#username', { timeout: 15000 });

  // Login primero (la app lo requiere antes del reset)
  await page.locator('#username').fill('demo');
  await page.locator('#password').fill('demo123');
  await page.locator('#login-btn').click();

  // Esperar dashboard
  await page.waitForSelector('#reset-demo-btn', { timeout: 15000 });

  // Reset seguro
  const resetBtn = page.locator('#reset-demo-btn');

  if (await resetBtn.isVisible().catch(() => false)) {
    await resetBtn.click();
    await page.getByRole('button', { name: 'Confirmar' }).click();
  }

  // Confirmar dashboard listo
  await page.waitForSelector('#dashboard-section', { timeout: 15000 });
}