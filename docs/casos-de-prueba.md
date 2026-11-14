# Casos de prueba

Prioridad: **A** = crítico, **M** = media. Todos los casos están automatizados.

## Web (saucedemo.com)

| ID | Caso | Precondición | Pasos | Resultado esperado | Prio. |
| --- | --- | --- | --- | --- | --- |
| TC-WEB-01 | Login válido | Usuario `standard_user` | Ingresar usuario y clave, presionar Login | Redirige a `/inventory.html` y muestra "Products" | A |
| TC-WEB-02 | Clave incorrecta | Ninguna | Ingresar usuario válido y clave errónea | Mensaje "Username and password do not match", permanece en login | A |
| TC-WEB-03 | Usuario bloqueado | Usuario `locked_out_user` | Intentar iniciar sesión | Mensaje "this user has been locked out" | A |
| TC-WEB-04 | Usuario vacío | Ninguna | Dejar usuario en blanco y enviar | Mensaje "Username is required" | M |
| TC-WEB-05 | Clave vacía | Ninguna | Dejar clave en blanco y enviar | Mensaje "Password is required" | M |
| TC-WEB-06 | Acceso sin sesión | Sin sesión iniciada | Abrir `/inventory.html` directamente | Mensaje de acceso solo con sesión iniciada | A |
| TC-WEB-07 | Catálogo | Sesión iniciada | Abrir inventario | Se muestran 6 productos | M |
| TC-WEB-08 | Agregar al carrito | Sesión iniciada | Agregar mochila y luego luz de bicicleta | Contador pasa a 1 y luego a 2 | A |
| TC-WEB-09 | Quitar del carrito | Producto en el carrito | Presionar "Remove" | El contador desaparece | M |
| TC-WEB-10 | Ordenar por precio | Sesión iniciada | Seleccionar "Price (low to high)" | Los precios quedan en orden ascendente | M |
| TC-WEB-11 | Persistencia del carrito | Producto agregado | Abrir el carrito | Aparece 1 producto: Sauce Labs Backpack | A |
| TC-WEB-12 | Compra completa | Producto en el carrito | Checkout, datos válidos, Finish | Mensaje "Thank you for your order!" | A |
| TC-WEB-13 | Nombre obligatorio | En checkout | Enviar sin nombre | "First Name is required" | A |
| TC-WEB-14 | Apellido obligatorio | En checkout | Enviar sin apellido | "Last Name is required" | A |
| TC-WEB-15 | Código postal obligatorio | En checkout | Enviar sin código postal | "Postal Code is required" | A |
| TC-WEB-16 | Total con impuesto | Mochila en el carrito | Completar datos y revisar el resumen | Total de $32.39 ($29.99 + $2.40) | M |

## API (restful-booker)

| ID | Caso | Petición | Resultado esperado | Prio. |
| --- | --- | --- | --- | --- |
| TC-API-01 | Token válido | `POST /auth` con `admin` | 200 y `token` en la respuesta | A |
| TC-API-02 | Token inválido | `POST /auth` con clave errónea | Sin `token`, `reason: Bad credentials` | A |
| TC-API-03 | Crear reserva | `POST /booking` | 200, `bookingid` y datos iguales a lo enviado | A |
| TC-API-04 | Consultar reserva | `GET /booking/{id}` | 200 y datos de la reserva creada | A |
| TC-API-05 | Actualizar con token | `PUT /booking/{id}` con cookie `token` | 200 y `totalprice` actualizado | A |
| TC-API-06 | Actualizar sin token | `PUT /booking/{id}` sin cookie | 403 | A |
| TC-API-07 | Eliminar reserva | `DELETE /booking/{id}` y luego `GET` | 201 al borrar y 404 al consultar | A |
| TC-API-08 | Id inexistente | `GET /booking/99999999` | 404 | M |
| TC-API-09 | Listar reservas | `GET /booking` | 200 y lista de objetos con `bookingid` numérico | M |
| TC-API-10 | Filtrar por apellido | `GET /booking?lastname=Brown` | 200 y lista | M |
