function fn() {
  // Configuración global de Karate. Se puede cambiar con: mvn test -Dkarate.env=otro
  var config = {
    baseUrl: 'https://restful-booker.herokuapp.com',
    username: 'admin',
    password: 'password123'
  };

  karate.configure('connectTimeout', 10000);
  karate.configure('readTimeout', 15000);

  return config;
}
