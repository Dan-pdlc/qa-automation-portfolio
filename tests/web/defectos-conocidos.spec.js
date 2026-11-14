const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventarioPage } = require('../../pages/InventarioPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');

/**
 * Defectos conocidos de saucedemo.com (ver docs/defectos.md).
 * Cada prueba describe el comportamiento CORRECTO y está marcada con test.fail():
 * mientras el defecto exista la prueba "falla como se espera" y la suite sigue en verde;
 * si el sitio lo corrige, la prueba pasa y Playwright lo reporta para revisarla.
 */

async function ingresarComo(page, usuario) {
  const login = new LoginPage(page);
  const inventario = new InventarioPage(page);
  await login.abrir();
  await login.iniciarSesion(usuario, 'secret_sauce');
  await inventario.esperarCarga();
  return inventario;
}

test.describe('Defectos conocidos - problem_user', () => {
  test('DEF-01 cada producto debe mostrar su propia imagen', async ({ page }) => {
    test.fail();
    await ingresarComo(page, 'problem_user');
    const imagenes = await page
      .locator('[data-test="inventory-item"] img')
      .evaluateAll((els) => els.map((e) => e.getAttribute('src')));
    expect(new Set(imagenes).size).toBe(imagenes.length);
  });

  test('DEF-02 ordenar por precio debe reordenar el catálogo', async ({ page }) => {
    test.fail();
    const inventario = await ingresarComo(page, 'problem_user');
    await inventario.ordenarPor('lohi');
    const precios = await inventario.preciosComoNumeros();
    expect(precios).toEqual([...precios].sort((a, b) => a - b));
  });

  test('DEF-03 el checkout debe conservar el apellido ingresado', async ({ page }) => {
    test.fail();
    const inventario = await ingresarComo(page, 'problem_user');
    await inventario.agregarAlCarrito('sauce-labs-backpack');
    await inventario.irAlCarrito();
    const checkout = new CheckoutPage(page);
    await checkout.iniciarCheckout();
    await checkout.completarDatos({ nombre: 'Daniel', apellido: 'Plasencia', cp: '13001' });
    await expect(page).toHaveURL(/checkout-step-two/);
  });
});

test.describe('Defectos conocidos - error_user', () => {
  test('DEF-04 todos los productos deben poder agregarse al carrito', async ({ page }) => {
    test.fail();
    const inventario = await ingresarComo(page, 'error_user');
    const ids = [
      'sauce-labs-backpack',
      'sauce-labs-bike-light',
      'sauce-labs-bolt-t-shirt',
      'sauce-labs-fleece-jacket',
      'sauce-labs-onesie',
      'test.allthethings()-t-shirt-(red)',
    ];
    for (const id of ids) {
      await inventario.agregarAlCarrito(id);
    }
    await expect(inventario.contadorCarrito).toHaveText(String(ids.length));
  });

  test('DEF-05 quitar un producto debe sacarlo del carrito', async ({ page }) => {
    test.fail();
    const inventario = await ingresarComo(page, 'error_user');
    await inventario.agregarAlCarrito('sauce-labs-backpack');
    await inventario.quitarDelCarrito('sauce-labs-backpack');
    await expect(inventario.contadorCarrito).toHaveCount(0);
  });
});
