# language: es
# Escenarios en formato Gherkin (Dado-Cuando-Entonces). Cada etiqueta enlaza con el caso de docs/casos-de-prueba.md
# y con su prueba automatizada en tests/.

Característica: Inicio de sesión
  Como cliente de la tienda
  Quiero iniciar sesión con mis credenciales
  Para acceder al catálogo de productos

  Antecedentes:
    Dado que estoy en la página de inicio de sesión

  @TC-WEB-01
  Escenario: Ingreso con credenciales válidas
    Cuando ingreso el usuario "standard_user" y la clave "secret_sauce"
    Entonces veo el catálogo de productos

  @TC-WEB-02
  Escenario: Ingreso con clave incorrecta
    Cuando ingreso el usuario "standard_user" y una clave incorrecta
    Entonces veo el mensaje "Username and password do not match any user in this service"
    Y permanezco en la página de inicio de sesión

  @TC-WEB-03
  Escenario: Usuario bloqueado
    Cuando ingreso el usuario "locked_out_user" y la clave "secret_sauce"
    Entonces veo el mensaje "Sorry, this user has been locked out."

  @TC-WEB-04 @TC-WEB-05
  Esquema del escenario: Campos obligatorios vacíos
    Cuando ingreso el usuario "<usuario>" y la clave "<clave>"
    Entonces veo el mensaje "<mensaje>"

    Ejemplos:
      | usuario       | clave        | mensaje               |
      |               | secret_sauce | Username is required  |
      | standard_user |              | Password is required  |

  @TC-WEB-06
  Escenario: Acceso al catálogo sin sesión
    Dado que no he iniciado sesión
    Cuando abro directamente la página del catálogo
    Entonces veo el mensaje de que solo puedo acceder con una sesión iniciada

Característica: Carrito de compras
  Como cliente con la sesión iniciada
  Quiero agregar y quitar productos del carrito
  Para elegir lo que voy a comprar

  Antecedentes:
    Dado que inicié sesión como "standard_user"

  @TC-WEB-08
  Escenario: El contador del carrito refleja los productos agregados
    Cuando agrego "Sauce Labs Backpack" al carrito
    Y agrego "Sauce Labs Bike Light" al carrito
    Entonces el contador del carrito muestra 2

  @TC-WEB-09
  Escenario: Quitar un producto reduce el contador
    Dado que agregué "Sauce Labs Backpack" al carrito
    Cuando quito "Sauce Labs Backpack" del carrito
    Entonces el contador del carrito deja de mostrarse

  @TC-WEB-10
  Escenario: Ordenar por precio de menor a mayor
    Cuando ordeno los productos por "Price (low to high)"
    Entonces los precios aparecen en orden ascendente

Característica: Compra (checkout)
  Como cliente con productos en el carrito
  Quiero completar mis datos y confirmar la compra
  Para recibir mi pedido

  Antecedentes:
    Dado que inicié sesión como "standard_user"
    Y tengo "Sauce Labs Backpack" en el carrito
    Y inicié el proceso de compra

  @TC-WEB-12
  Escenario: Compra completa con datos válidos
    Cuando completo mis datos con nombre "Daniel", apellido "Plasencia" y código postal "13001"
    Y confirmo la compra
    Entonces veo el mensaje "Thank you for your order!"

  @TC-WEB-13 @TC-WEB-14 @TC-WEB-15
  Esquema del escenario: Datos obligatorios del checkout
    Cuando completo mis datos con nombre "<nombre>", apellido "<apellido>" y código postal "<cp>"
    Entonces veo el mensaje "<mensaje>"

    Ejemplos:
      | nombre | apellido  | cp    | mensaje                  |
      |        | Plasencia | 13001 | First Name is required   |
      | Daniel |           | 13001 | Last Name is required    |
      | Daniel | Plasencia |       | Postal Code is required  |

  @TC-WEB-16
  Escenario: El resumen incluye el impuesto
    Cuando completo mis datos con nombre "Daniel", apellido "Plasencia" y código postal "13001"
    Entonces el total del pedido es "$32.39"

Característica: Gestión de reservas por API
  Como sistema cliente
  Quiero crear, consultar, actualizar y eliminar reservas
  Para administrar las reservas de un hotel

  @TC-API-01 @TC-API-02
  Esquema del escenario: Autenticación
    Cuando solicito un token con usuario "admin" y clave "<clave>"
    Entonces <resultado>

    Ejemplos:
      | clave       | resultado                                    |
      | password123 | recibo un token                              |
      | incorrecta  | no recibo token y se indica "Bad credentials" |

  @TC-API-03 @TC-API-04
  Escenario: Crear y consultar una reserva
    Cuando creo una reserva para "Daniel Plasencia" por 150
    Entonces recibo el identificador de la reserva
    Y al consultarla veo los mismos datos

  @TC-API-05 @TC-API-06
  Esquema del escenario: Actualizar una reserva
    Dado que existe una reserva
    Cuando actualizo el precio a 200 <condicion>
    Entonces el servicio responde <estado>

    Ejemplos:
      | condicion  | estado |
      | con token  | 200    |
      | sin token  | 403    |

  @TC-API-07 @TC-API-08
  Escenario: Eliminar una reserva
    Dado que existe una reserva
    Cuando la elimino con token
    Entonces el servicio responde 201
    Y al consultarla el servicio responde 404
