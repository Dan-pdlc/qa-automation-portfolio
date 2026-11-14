# QA Automation Portfolio

Automatización de pruebas web y de API con **Playwright (JavaScript)**, más una colección de **Postman**, escenarios **Gherkin** y reportes de defecto, usando sitios públicos creados para practicar testing.

| Capa | Sitio bajo prueba | Pruebas |
| --- | --- | --- |
| Web (E2E) | [saucedemo.com](https://www.saucedemo.com) | 16 + 5 de defectos conocidos |
| API REST | [restful-booker](https://restful-booker.herokuapp.com) ([documentación](https://restful-booker.herokuapp.com/apidoc/index.html)) | 10 (Playwright y Postman) |

## Qué cubre

- **Login:** credenciales válidas, clave incorrecta, usuario bloqueado, campos vacíos y acceso sin sesión.
- **Inventario y carrito:** catálogo, contador del carrito, quitar productos, ordenamiento por precio.
- **Checkout:** compra completa, validación de campos obligatorios y cálculo del total con impuesto.
- **API de reservas:** autenticación, CRUD completo, casos negativos (sin token, id inexistente), listado y filtros.
- **Defectos reales:** 5 fallos encontrados con los usuarios `problem_user` y `error_user`, reportados en [`docs/defectos.md`](docs/defectos.md) y cubiertos con pruebas `test.fail()`.

## Documentación de pruebas

| Documento | Contenido |
| --- | --- |
| [`docs/casos-de-prueba.md`](docs/casos-de-prueba.md) | Casos con precondición, pasos y resultado esperado |
| [`docs/escenarios.feature`](docs/escenarios.feature) | Los mismos casos en Gherkin (Dado-Cuando-Entonces), con etiquetas que enlazan a cada caso |
| [`docs/defectos.md`](docs/defectos.md) | Defectos encontrados, con pasos para reproducir, resultado esperado y obtenido |
| [`docs/plantilla-reporte-defecto.md`](docs/plantilla-reporte-defecto.md) | Plantilla y criterio de severidad |

## Estructura

```
pages/             Page Objects (LoginPage, InventarioPage, CheckoutPage)
tests/web/         Pruebas E2E de la interfaz y defectos conocidos
tests/api/         Pruebas de la API REST con Playwright
postman/           Colección y entorno de Postman con los mismos casos de API
docs/              Casos de prueba, Gherkin y reportes de defecto
.github/workflows  Ejecución automática en GitHub Actions
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

### Colección de Postman

Importa en Postman `postman/restful-booker.postman_collection.json` y `postman/restful-booker.postman_environment.json`, elige el entorno "Restful Booker - Público" y ejecuta la colección completa con el Runner (las peticiones comparten `token` y `bookingId`, por eso van en orden).

Desde la terminal, con Newman:

```bash
npx newman run postman/restful-booker.postman_collection.json -e postman/restful-booker.postman_environment.json
```

## Decisiones de diseño

- **Page Object Model** para que un cambio en la interfaz se corrija en un solo lugar.
- **Selectores `data-test`** en vez de clases CSS, que son más estables.
- **Pruebas de API independientes de la interfaz**: cada flujo crea sus propios datos y los elimina.
- **Defectos conocidos con `test.fail()`**: la suite sigue en verde mientras el error exista y avisa cuando el sitio lo corrija.
- **Reintentos y trazas** solo en CI, para distinguir fallos reales de intermitencias de red.

## Notas

Los sitios de prueba son públicos y compartidos; si restful-booker está lento o caído, las pruebas de API pueden fallar por disponibilidad y no por un defecto.
