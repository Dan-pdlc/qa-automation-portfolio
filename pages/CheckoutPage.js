const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.itemsCarrito = page.locator('[data-test="inventory-item"]');
    this.botonCheckout = page.locator('[data-test="checkout"]');
    this.nombre = page.locator('[data-test="firstName"]');
    this.apellido = page.locator('[data-test="lastName"]');
    this.codigoPostal = page.locator('[data-test="postalCode"]');
    this.botonContinuar = page.locator('[data-test="continue"]');
    this.botonFinalizar = page.locator('[data-test="finish"]');
    this.mensajeError = page.locator('[data-test="error"]');
    this.mensajeFinal = page.locator('[data-test="complete-header"]');
    this.total = page.locator('[data-test="total-label"]');
  }

  async iniciarCheckout() {
    await this.botonCheckout.click();
  }

  async completarDatos({ nombre = '', apellido = '', cp = '' } = {}) {
    await this.nombre.fill(nombre);
    await this.apellido.fill(apellido);
    await this.codigoPostal.fill(cp);
    await this.botonContinuar.click();
  }

  async finalizarCompra() {
    await this.botonFinalizar.click();
  }

  async esperarError(texto) {
    await expect(this.mensajeError).toContainText(texto);
  }
}

module.exports = { CheckoutPage };
