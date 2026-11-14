# Defectos encontrados en saucedemo.com

Hallazgos reales con los usuarios de prueba que el propio sitio ofrece (`problem_user` y `error_user`, clave `secret_sauce`). Verificados el 2026-11-13 con Chromium.
Cada defecto está cubierto por una prueba en [`tests/web/defectos-conocidos.spec.js`](../tests/web/defectos-conocidos.spec.js), marcada con `test.fail()`: la suite sigue en verde mientras el defecto exista, y avisa cuando el sitio lo corrija.

Formato: ver [`plantilla-reporte-defecto.md`](plantilla-reporte-defecto.md).

---

## DEF-01 Todas las imágenes del catálogo son la misma

| Campo | Contenido |
| --- | --- |
| **Severidad / Prioridad** | Media / Media |
| **Entorno** | saucedemo.com, Chromium, usuario `problem_user` |
| **Precondiciones** | Sesión iniciada |
| **Pasos** | 1. Iniciar sesión con `problem_user`. 2. Observar las imágenes de los 6 productos. |
| **Esperado** | Cada producto muestra su propia imagen. |
| **Obtenido** | Los 6 productos usan la misma imagen (`/assets/sl-404-….jpg`). |
| **Frecuencia** | Siempre |
| **Prueba** | `DEF-01` |

## DEF-02 Ordenar por precio no reordena los productos

| Campo | Contenido |
| --- | --- |
| **Severidad / Prioridad** | Alta / Media |
| **Entorno** | saucedemo.com, Chromium, usuario `problem_user` |
| **Precondiciones** | Sesión iniciada, catálogo visible |
| **Pasos** | 1. Elegir "Price (low to high)" en el selector de orden. 2. Leer los precios. |
| **Esperado** | Precios en orden ascendente (7.99, 9.99, 15.99, 15.99, 29.99, 49.99). |
| **Obtenido** | Los precios quedan en el orden original: 29.99, 9.99, 15.99, 49.99, 7.99, 15.99. |
| **Frecuencia** | Siempre |
| **Prueba** | `DEF-02` |

## DEF-03 El apellido no se guarda en el checkout

| Campo | Contenido |
| --- | --- |
| **Severidad / Prioridad** | Crítica / Alta |
| **Entorno** | saucedemo.com, Chromium, usuario `problem_user` |
| **Precondiciones** | Un producto en el carrito y el formulario de checkout abierto |
| **Pasos** | 1. Escribir nombre "Daniel". 2. Escribir apellido "Plasencia". 3. Escribir código postal "13001". 4. Presionar Continue. |
| **Esperado** | Se avanza al resumen del pedido con los tres datos. |
| **Obtenido** | El campo Nombre queda con "Plasencia", el campo Apellido vacío, y aparece "Error: Last Name is required". No se puede completar la compra. |
| **Frecuencia** | Siempre |
| **Prueba** | `DEF-03` |

## DEF-04 Algunos productos no se agregan al carrito

| Campo | Contenido |
| --- | --- |
| **Severidad / Prioridad** | Alta / Alta |
| **Entorno** | saucedemo.com, Chromium, usuario `error_user` |
| **Precondiciones** | Sesión iniciada, carrito vacío |
| **Pasos** | 1. Presionar "Add to cart" en los 6 productos. 2. Mirar el botón de cada producto y el contador. |
| **Esperado** | Los 6 productos pasan a "Remove" y el contador muestra 6. |
| **Obtenido** | Solo 3 productos cambian a "Remove" (Backpack, Bike Light, Onesie) y el contador muestra 3. Bolt T-Shirt, Fleece Jacket y la camiseta roja no se agregan, sin mensaje de error. |
| **Frecuencia** | Siempre |
| **Prueba** | `DEF-04` |

## DEF-05 No se puede quitar un producto desde el catálogo

| Campo | Contenido |
| --- | --- |
| **Severidad / Prioridad** | Media / Media |
| **Entorno** | saucedemo.com, Chromium, usuario `error_user` |
| **Precondiciones** | "Sauce Labs Backpack" agregado al carrito |
| **Pasos** | 1. Presionar "Remove" en Sauce Labs Backpack. |
| **Esperado** | El botón vuelve a "Add to cart" y el producto sale del carrito. |
| **Obtenido** | El botón sigue como "Remove"; el producto permanece en el carrito. |
| **Frecuencia** | Siempre |
| **Prueba** | `DEF-05` |
