## Clase 31
### Primer acercamiento a testing, conceptos de TDD.
* Más adelante veremos ejemplos de testing unitario utilizando herramientas. En esta clase realizamos un primer acercamiento a testing, diseñando nuestra primer función mediante enfoque TDD.

### Generación de datos para pruebas (mock data) con faker.js.
* Activamos una ruta helper en nuestro paquete de rutas de usuario, para generar usuarios al azar mediante la librería faker.
* Visitando esa ruta podremos indicar cuántos usuarios generar, y obtener como respuesta el array, para copiar y pegar donde necesitemos.
* CUIDADO!: el sistema no está optimizado para generar grandes cantidades de usuarios, tener paciencia si se desean varios miles.

### Opciones alternativas online:
* https://www.mockaroo.com/
* https://mockapi.io/

#### Dependencias a agregar:
* @faker-js/faker (como dependencia de desarrollo)

#### Ver archivos:
* first.tdd.code.js
* clase_30/routes/users.routes.js
* clase_30/controllers/user.controller.mdb.js