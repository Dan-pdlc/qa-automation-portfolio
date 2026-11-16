Feature: Autenticación de la API de reservas

  Background:
    * url baseUrl
    * header Accept = 'application/json'

  @TC-API-01
  Scenario: Genera un token con credenciales válidas
    Given path 'auth'
    And request { username: '#(username)', password: '#(password)' }
    When method post
    Then status 200
    And match response == { token: '#string' }

  @TC-API-02
  Scenario: No entrega token con credenciales inválidas
    Given path 'auth'
    And request { username: '#(username)', password: 'incorrecta' }
    When method post
    Then status 200
    And match response == { reason: 'Bad credentials' }
