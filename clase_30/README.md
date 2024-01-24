## Clase 30
### Envío de notificaciones desde la API

#### Por lo general utilizaremos 3 grandes líneas para notificar:
* Mails
* Mensajería instantánea (SMS, Whatsapp, Telegram)
* Publicaciones tipo push hacia otras APIs o servicios

#### Dependencias a agregar:
* @vonage/server-sdk
* nodemailer
* twilio

#### Activar cuentas gratuitas de prueba en:
* https://resend.com
* https://www.twilio.com
* https://www.vonage.com/

#### Agregar variables de entorno a .env.devel, y luego activarlas en config.js (RECORDAR colocar excepciones en .gitignore para NO PUBLICAR a Github los archivos env):
* GOOGLE_APP_EMAIL (Cuenta de Gmail)
* GOOGLE_APP_PASS (clave de APLICACION creada para esa cuenta). Habilitarla en https://myaccount.google.com/apppasswords
* RESEND_API_EMAIL (Email de prueba otorgado por Resend)
* RESEND_API_KEY (API key de Resend)
* TWILIO_ACCOUNT_SID (Id seguro de Twilio)
* TWILIO_AUTH_TOKEN (Token de Twilio)
* TWILIO_VIRTUAL_NUMBER (Número de teléfono virtual de prueba otorgado por Twilio, generalmente sobre USA)
* VONAGE_API_KEY (API key de Vonage)
* VONAGE_API_SECRET (Secret de Vonage)
* MAIN_SMS_NUMBER (Número de celular nuestro para pruebas de recepción)

#### En los ejemplos utilizaremos el endpoint /register, que en este momento tiene activado un middleware de passport para verificar si el usuario ya existe.

#### Agregaremos otro middleware para enviar una notificación por mail o SMS a quien se registró.

En este caso estaremos recibiendo los SMS de prueba en el número config.MAIN_SMS_NUMBER, en producción deberíamos pedir un teléfono por supuesto al cliente en el registro, donde notificarle.

#### Ver archivos:
* src/utils.js
* src/routes/auth.routes.js