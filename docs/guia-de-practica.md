# Guía de práctica

Ejercicios para aprender con este mismo repositorio. La idea es que cada técnica nueva termine como una prueba o un documento propio, que luego puedas explicar.

## Comandos útiles

```bash
npm test                                   # todo
npm run test:ui                            # solo web
npm run test:api                           # solo API
npx playwright test --ui                   # modo visual: ejecuta, pausa y revisa paso a paso
npx playwright test --headed --project=web # ver el navegador
npx playwright test --debug                # depurar con el inspector
npx playwright test -g "TC-WEB-12"         # una prueba por nombre
npx playwright test --trace on             # guarda la traza de cada prueba
npx playwright show-trace test-results/<carpeta>/trace.zip
npx playwright codegen https://www.saucedemo.com   # genera código mientras navegas
npm run report                             # reporte HTML
```

## Nivel 1: entender lo que hay

1. Ejecuta todo con `--ui` y recorre cada prueba paso a paso.
2. Rompe una prueba a propósito (cambia un texto esperado) y lee el mensaje de error y la traza. Aprender a leer fallos es la mitad del trabajo.
3. Abre `pages/` y explica con tus palabras por qué existen los Page Objects.
4. Corre la colección de Postman con el Runner y compara cada petición con su prueba en `tests/api/`.

## Nivel 2: agregar pruebas propias

Escríbelas tú, sin copiar, y sigue el formato `TC-WEB-17`, `TC-API-11`, y añade cada una a `docs/casos-de-prueba.md`.

- Ordenar de la Z a la A, de mayor a menor precio.
- Cerrar sesión desde el menú y comprobar que vuelve al login.
- Quitar un producto desde la página del carrito, no desde el catálogo.
- Cancelar el checkout y comprobar que se conserva el carrito.
- API: actualizar solo un campo con `PATCH /booking/{id}`.
- API: crear una reserva con datos inválidos (sin `firstname`, fechas invertidas) y anotar qué responde el servicio.

## Nivel 3: técnicas nuevas

| Técnica | Qué hacer |
| --- | --- |
| Reutilizar la sesión (`storageState`) | Iniciar sesión una sola vez y reutilizarla en las pruebas del catálogo |
| Datos de prueba | Convertir los casos de checkout en una sola prueba que recorra una lista de datos |
| Etiquetas | Marcar las pruebas críticas con `@smoke` y ejecutarlas con `--grep @smoke` |
| Otros navegadores | Agregar Firefox y WebKit en `playwright.config.js` |
| Fixtures | Crear una fixture que entregue la página ya autenticada |
| UI + API | Crear una reserva por API y comprobar un dato en pantalla (en otro sitio de práctica) |
| CI | Programar una ejecución nocturna en GitHub Actions |

## Nivel 4: pensar como QA

1. Explora saucedemo con `visual_user` y `performance_glitch_user`. Anota defectos reales en `docs/defectos.md`.
2. Escribe una prueba `test.fail()` por cada defecto nuevo.
3. Redacta en Gherkin cada prueba nueva antes de automatizarla.
4. Haz una lista de riesgos: qué fallaría primero si este sitio fuera tuyo y por qué.

## Karate y Appium

**Karate** ya está en [`karate/`](../karate). Para dominarlo:

1. Instala JDK 17 y Maven, y corre `mvn test` dentro de `karate/`.
2. Lee `reservas-crud.feature` y compárala con `tests/api/booking.spec.js`: es la misma prueba en dos herramientas.
3. Agrega un escenario propio (por ejemplo, `PATCH` de un solo campo) y un `Scenario Outline` con una tabla de ejemplos.
4. Prueba `karate.merge`, `match each` y llamar a otra feature con `call read(...)`.

**Appium** (pruebas mobile) todavía no está en el repo y no debes decir que lo has usado hasta tener una prueba corriendo. Ruta sugerida:

1. Instala Android Studio y crea un emulador (Pixel con Android 13).
2. Instala Node.js y Appium 2 con el driver `uiautomator2`.
3. Usa una app de práctica de código abierto, como la de demostración de WebdriverIO, y automatiza un login y una lista.
4. Cuando corra, súbela a una carpeta `appium/` con su README y recién ahí agrégala a tu CV.

## Preguntas que te pueden hacer sobre este repo

Prepara una respuesta corta para cada una:

- ¿Por qué Playwright y no Selenium o Cypress?
- ¿Qué es un Page Object y qué problema resuelve?
- ¿Por qué usas selectores `data-test` y no clases CSS?
- ¿Por qué las pruebas de API van en orden (`serial`) y las web en paralelo?
- ¿Qué es una prueba intermitente (flaky) y cómo la reduces?
- ¿Para qué sirve `test.fail()` y cuándo no deberías usarlo?
- ¿Cómo decides qué automatizar y qué dejar manual?
- ¿Qué haces cuando una prueba falla solo en CI?

## Rutina sugerida

Una hora al día: 15 minutos leyendo un fallo o una técnica, 30 escribiendo una prueba nueva y 15 documentándola. Cada semana, sube los cambios con un commit claro, por ejemplo `agrega pruebas de cierre de sesión`.
