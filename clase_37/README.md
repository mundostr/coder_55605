## Clase 37
### Práctica de integración
* En esta clase simplemente tratamos de iniciar un proyecto desde cero, e ir integrando componentes en base a códigos que ya hemos escrito.
* Para ello actualizamos nuestro clon local del repo del curso (git pull), y vamos tomando código de la clase_36.

### Elementos importantes para repasar en la integración:
* Revisar la organización por capas (rutas, controladores, servicios / DAOs, autenticación / autorización, vistas, logs).
* Activar el uso de Handlebars para las vistas (si se planea de cara a la presentación del proyecto final utilizar otro soporte para frontend, se puede prescindir de este paso).
* Usar función o instancia de clase DTO (Data Transfer Object) para sanitizar los contenidos de un objeto antes de pasarlo al DAO correspondiente.
* Utilizar patrón SINGLETON para conexión a MongoDB.
* Utilizar variables de entorno y opciones de línea de comandos, contando si es posible con un objeto central de configuración. El sistema debe ser capaz de cargar una configuración de DESARROLLO u otra de PRODUCCION según el seteo de una variable de línea de comandos.
* IMPORTANTE!!!: aplicar no solo autenticación, sino también control de roles.
* Roles disponibles que debe contemplar el sistema:
    - Usuario normal: user
    - Usuario especial: premium
    - Usuario administrador: admin
* La autenticación puede hacerse vía Passport o manualmente a través de un middleware autenticador como AuthToken (auth/custom.jwt.auth.js). Como mencionamos, también se puede optar por usar sessions en lugar de tokens.
* Probar el uso de mailing para comunicación: vimos en clases anteriores algunas alternativas, usar la que se desee, en este caso se ha reactivado la opción para enviar con Nodemailer y una cuenta de Github (ver utils.js).
* Repasar cómo activar una clase custom para el manejo de errores y el uso de un diccionario. Si bien no es imprescindible, mejora sustancialmente el nivel de nuestro backend.
* Similar situación con un registro de errores (Winston), dejarlo para el final y si hay tiempo para seguir practicando, volver a activarlo para poder registrar con el nivel que se desee a consola y archivo.