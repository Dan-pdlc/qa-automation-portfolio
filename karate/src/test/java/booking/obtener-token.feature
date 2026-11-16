@ignore
Feature: Ayudante - obtiene un token de autenticación

  Scenario: Solicitar token
    Given url baseUrl
    And path 'auth'
    And request { username: '#(username)', password: '#(password)' }
    When method post
    Then status 200
    * def token = response.token
