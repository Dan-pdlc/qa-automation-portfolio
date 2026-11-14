const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventarioPage } = require('../../pages/InventarioPage');

const CLAVE = 'secret_sauce';

test.describe('Login', () => {
  let login;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.abrir();
  });

  test('TC-WEB-01 ingresa con credenciales válidas', async ({ page }) => {
    await login.iniciarSesion('standard_user', CLAVE);
    await expect(page).toHaveURL(/inventory\.html/);
    await new InventarioPage(page).esperarCarga();
  });

  test('TC-WEB-02 rechaza una clave incorrecta', async ({ page }) => {
    await login.iniciarSesion('standard_user', 'clave_erronea');
    await login.esperarError('Username and password do not match');
    await expect(page).toHaveURL('/');
  });

  test('TC-WEB-03 bloquea al usuario con acceso denegado', async () => {
    await login.iniciarSesion('locked_out_user', CLAVE);
    await login.esperarError('this user has been locked out');
  });

  test('TC-WEB-04 exige el usuario cuando el campo está vacío', async () => {
    await login.iniciarSesion('', CLAVE);
    await login.esperarError('Username is required');
  });

  test('TC-WEB-05 exige la clave cuando el campo está vacío', async () => {
    await login.iniciarSesion('standard_user', '');
    await login.esperarError('Password is required');
  });

  test('TC-WEB-06 no permite entrar a inventario sin sesión', async ({ page }) => {
    await page.goto('/inventory.html');
    await login.esperarError("You can only access '/inventory.html' when you are logged in");
  });
});
