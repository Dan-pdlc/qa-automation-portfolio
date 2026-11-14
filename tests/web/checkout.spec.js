const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventarioPage } = require('../../pages/InventarioPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');

test.describe('Checkout', () => {
  let checkout;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    const inventario = new InventarioPage(page);
    checkout = new CheckoutPage(page);

    await login.abrir();
    await login.iniciarSesion('standard_user', 'secret_sauce');
    await inventario.esperarCarga();
    await inventario.agregarAlCarrito('sauce-labs-backpack');
    await inventario.irAlCarrito();
    await checkout.iniciarCheckout();
  });

  test('TC-WEB-12 completa una compra con datos válidos', async ({ page }) => {
    await checkout.completarDatos({ nombre: 'Daniel', apellido: 'Plasencia', cp: '13001' });
    await expect(page).toHaveURL(/checkout-step-two/);
    await checkout.finalizarCompra();
    await expect(checkout.mensajeFinal).toHaveText('Thank you for your order!');
  });

  test('TC-WEB-13 valida el nombre obligatorio', async () => {
    await checkout.completarDatos({ apellido: 'Plasencia', cp: '13001' });
    await checkout.esperarError('First Name is required');
  });

  test('TC-WEB-14 valida el apellido obligatorio', async () => {
    await checkout.completarDatos({ nombre: 'Daniel', cp: '13001' });
    await checkout.esperarError('Last Name is required');
  });

  test('TC-WEB-15 valida el código postal obligatorio', async () => {
    await checkout.completarDatos({ nombre: 'Daniel', apellido: 'Plasencia' });
    await checkout.esperarError('Postal Code is required');
  });

  test('TC-WEB-16 el resumen calcula el total con impuesto', async () => {
    await checkout.completarDatos({ nombre: 'Daniel', apellido: 'Plasencia', cp: '13001' });
    // Mochila: $29.99 + impuesto $2.40 = $32.39
    await expect(checkout.total).toHaveText('Total: $32.39');
  });
});
