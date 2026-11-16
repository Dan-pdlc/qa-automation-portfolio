@ignore
Feature: Ayudante - crea una reserva y devuelve su id

  Scenario: Crear reserva
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
    Given url baseUrl
    And path 'booking'
    And header Accept = 'application/json'
    And request reserva
    When method post
    Then status 200
    * def id = response.bookingid
