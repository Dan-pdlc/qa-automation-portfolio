const { expect } = require('@playwright/test');

class InventarioPage {
  constructor(page) {
    this.page = page;
    this.titulo = page.locator('[data-test="title"]');
    this.productos = page.locator('[data-test="inventory-item"]');
    this.precios = page.locator('[data-test="inventory-item-price"]');
    this.nombres = page.locator('[data-test="inventory-item-name"]');
    this.ordenar = page.locator('[data-test="product-sort-container"]');
    this.iconoCarrito = page.locator('[data-test="shopping-cart-link"]');
    this.contadorCarrito = page.locator('[data-test="shopping-cart-badge"]');
  }

  async esperarCarga() {
    await expect(this.titulo).toHaveText('Products');
  }

  /** @param {string} id identificador del producto, ej. "sauce-labs-backpack" */
  async agregarAlCarrito(id) {
    await this.page.locator(`[data-test="add-to-cart-${id}"]`).click();
  }

  async quitarDelCarrito(id) {
    await this.page.locator(`[data-test="remove-${id}"]`).click();
  }

  async ordenarPor(valor) {
    await this.ordenar.selectOption(valor);
  }

  async preciosComoNumeros() {
    const textos = await this.precios.allTextContents();
    return textos.map((t) => Number(t.replace('$', '')));
  }

  async irAlCarrito() {
    await this.iconoCarrito.click();
  }
}

module.exports = { InventarioPage };
