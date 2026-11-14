const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usuario = page.locator('[data-test="username"]');
    this.clave = page.locator('[data-test="password"]');
    this.botonIngresar = page.locator('[data-test="login-button"]');
    this.mensajeError = page.locator('[data-test="error"]');
  }

  async abrir() {
    await this.page.goto('/');
  }

  async iniciarSesion(usuario, clave) {
    await this.usuario.fill(usuario);
    await this.clave.fill(clave);
    await this.botonIngresar.click();
  }

  async esperarError(texto) {
    await expect(this.mensajeError).toContainText(texto);
  }
}

module.exports = { LoginPage };
