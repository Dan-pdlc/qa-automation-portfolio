# QA Automation Portfolio

Automatización de pruebas web y de API con **Playwright (JavaScript)**, usando sitios públicos creados para practicar testing.

| Capa | Sitio bajo prueba | Pruebas |
| --- | --- | --- |
| Web (E2E) | [saucedemo.com](https://www.saucedemo.com) | 16 |
| API REST | [restful-booker](https://restful-booker.herokuapp.com) ([documentación](https://restful-booker.herokuapp.com/apidoc/index.html)) | 10 |

## Qué cubre

- **Login:** credenciales válidas, clave incorrecta, usuario bloqueado, campos vacíos y acceso sin sesión.
- **Inventario y carrito:** catálogo, contador del carrito, quitar productos, ordenamiento por precio.
- **Checkout:** compra completa, validación de campos obligatorios y cálculo del total con impuesto.
- **API de reservas:** autenticación, CRUD completo, casos negativos (sin token, id inexistente), listado y filtros.

Los casos están documentados con precondición, pasos y resultado esperado en [`docs/casos-de-prueba.md`](docs/casos-de-prueba.md).

## Estructura

```
pages/            Page Objects (LoginPage, InventarioPage, CheckoutPage)
tests/web/        Pruebas E2E de la interfaz
tests/api/        Pruebas de la API REST
docs/             Casos de prueba
.github/workflows Ejecución automática en GitHub Actions
```

## Cómo ejecutarlo

Requisitos: Node.js 18 o superior.

```bash
npm install
npx playwright install chromium
npm test              # web + API
npm run test:ui       # solo web
npm run test:api      # solo API
npm run test:headed   # web viendo el navegador
npm run report        # abre el reporte HTML
```

Las URLs se pueden cambiar con las variables `WEB_URL` y `API_URL`.

## Decisiones de diseño

- **Page Object Model** para que un cambio en la interfaz se corrija en un solo lugar.
- **Selectores `data-test`** en vez de clases CSS, que son más estables.
- **Pruebas de API independientes de la interfaz**: cada flujo crea sus propios datos y los elimina.
- **Reintentos y trazas** solo en CI, para distinguir fallos reales de intermitencias de red.

## Notas

Los sitios de prueba son públicos y compartidos; si restful-booker está lento o caído, las pruebas de API pueden fallar por disponibilidad y no por un defecto.
