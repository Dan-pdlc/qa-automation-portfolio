Feature: Consulta de reservas

  Background:
    * url baseUrl
    * header Accept = 'application/json'

  @TC-API-09
  Scenario: Lista las reservas con ids numéricos
    Given path 'booking'
    When method get
    Then status 200
    And match response == '#[_ > 0]'
    And match each response == { bookingid: '#number' }

  @TC-API-10
  Scenario: Filtra reservas por apellido
    Given path 'booking'
    And param lastname = 'Brown'
    When method get
    Then status 200
    And match response == '#array'
