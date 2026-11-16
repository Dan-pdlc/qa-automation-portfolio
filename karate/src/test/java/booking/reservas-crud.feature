Feature: CRUD de reservas

  Background:
    * url baseUrl
    * header Accept = 'application/json'
    * def reserva =
    """
    {
      firstname: 'Daniel',
      lastname: 'Plasencia',
      totalprice: 150,
      depositpaid: true,
      bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
      additionalneeds: 'Desayuno'
    }
    """

  @TC-API-03 @TC-API-04
  Scenario: Crea una reserva y la consulta
    Given path 'booking'
    And request reserva
    When method post
    Then status 200
    And match response.bookingid == '#number'
    And match response.booking == reserva
    * def id = response.bookingid

    Given path 'booking', id
    When method get
    Then status 200
    And match response == reserva

  @TC-API-05 @TC-API-06
  Scenario: Actualiza con token y rechaza la actualización sin token
    * def token = call read('obtener-token.feature')
    * def creada = call read('crear-reserva.feature')
    * def id = creada.id
    * def cambio = karate.merge(reserva, { totalprice: 200 })

    Given path 'booking', id
    And header Cookie = 'token=' + token.token
    And request cambio
    When method put
    Then status 200
    And match response.totalprice == 200

    Given path 'booking', id
    And request karate.merge(reserva, { totalprice: 999 })
    When method put
    Then status 403

  @TC-API-07
  Scenario: Elimina la reserva y ya no existe
    * def token = call read('obtener-token.feature')
    * def creada = call read('crear-reserva.feature')
    * def id = creada.id

    Given path 'booking', id
    And header Cookie = 'token=' + token.token
    When method delete
    Then status 201

    Given path 'booking', id
    When method get
    Then status 404

  @TC-API-08
  Scenario: Responde 404 ante un id inexistente
    Given path 'booking', 99999999
    When method get
    Then status 404
