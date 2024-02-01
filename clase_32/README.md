## Clase 32
### Repasos varios de distintas alternativas para mejora de performance de servidor.
* Uso de NODE_ENV=production, compresión, clustering, balanceo de carga y otros comentarios.

### Generación de clase básica personalizada para manejo central de errores.
* Generamos una clase customError. A partir de ahora, cuando necesitemos lanzar errores, crearemos instancias a partir de esta clase.

#### Dependencias a agregar:
* express-compression

#### Ver archivos:
* compression: uso de módulo express-compression para reducir contenidos antes de envío.
* js_errors: breve repaso de opciones para disparo de errores.
* .env.prod: agregamos NODE_ENV=production.
* app.js: aparece un middleware de captura de errores al final de la lista de rutas que hemos ido integrando con use(), pero ANTES del app.all(). Este middleware capturará cualquier error que generemos en los endpoints.
* users.routes.js: agregado endpoint post para ejemplo de uso de errores personalizados.