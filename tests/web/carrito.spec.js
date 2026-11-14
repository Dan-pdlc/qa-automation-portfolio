const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventarioPage } = require('../../pages/InventarioPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');

test.describe('Inventario y carrito', () => {
  let inventario;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    inventario = new InventarioPage(page);
    await login.abrir();
    await login.iniciarSesion('standard_user', 'secret_sauce');
    await inventario.esperarCarga();
  });

  test('TC-WEB-07 muestra el catálogo completo', async () => {
    await expect(inventario.productos).toHaveCount(6);
  });

  test('TC-WEB-08 agregar un producto actualiza el contador del carrito', async () => {
    await inventario.agregarAlCarrito('sauce-labs-backpack');
    await expect(inventario.contadorCarrito).toHaveText('1');
    await inventario.agregarAlCarrito('sauce-labs-bike-light');
    await expect(inventario.contadorCarrito).toHaveText('2');
  });

  test('TC-WEB-09 quitar un producto reduce el contador', async () => {
    await inventario.agregarAlCarrito('sauce-labs-backpack');
    await inventario.quitarDelCarrito('sauce-labs-backpack');
    await expect(inventario.contadorCarrito).toHaveCount(0);
  });

  test('TC-WEB-10 ordena los productos de menor a mayor precio', async () => {
    await inventario.ordenarPor('lohi');
    const precios = await inventario.preciosComoNumeros();
    expect(precios).toEqual([...precios].sort((a, b) => a - b));
  });

  test('TC-WEB-11 el carrito conserva los productos agregados', async ({ page }) => {
    await inventario.agregarAlCarrito('sauce-labs-backpack');
    await inventario.irAlCarrito();
    const carrito = new CheckoutPage(page);
    await expect(carrito.itemsCarrito).toHaveCount(1);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  });
});
