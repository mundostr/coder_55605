## Proyecto ADOPTME, adopción de mascotas
### Aprovechamos el mismo proyecto de la clase anterior, ahora para práctica de tests unitarios

Test unitario:
Un test unitario es aquel enfocado en probar un módulo / componente específico.

Clonar Repo:
- Si se desea comenzar desde cero nuevamente con Adoptme, se puede clonar desde https://github.com/CoderContenidos/RecursosBackend-Adoptme

Instalación de Mocha y Chai como dependencias de desarrollo:
- npm i mocha chai --save-dev
- También se los puede instalar globalmente: npm i -g mocha chai

Verificación de ejecución:
- Revisar que el proyecto levante y ejecute correctamente

Configuración inicial:
- Crear carpeta test (fuera de src)
- Crear archivo nuevo para los tests del componente que se desee, terminando siempre con test.js, por ejemplo Users.dao.test.js.
- Importar en el archivo las librerías y componentes necesarios.
- Cargar los tests según lo resumido en los slides, ver también comentarios en los archivos de tests adjuntos, serán de mucha utilidad.

Ejecución de pruebas:
- Los tests pueden correrse desde línea de comandos invocando a mocha:
- Modo normal: mocha src/test/Users.dao.test.js
- Modo watcher: mocha --watch --parallel src/test/Users.dao.test.js

Chai:
- Notar la sintaxis alternativa utilizada por Chai, que permite armar las expresiones de prueba de una forma más natural.

Prácticas adicionales:
- Realizar pruebas para las rutinas bcrypt en utils y para testear el DTO.
- Trasladar estos conceptos a la generación de tests para el futuro proyecto final del curso.

Enlaces útiles:
- Mocha: https://mochajs.org/
- Chai: https://www.chaijs.com
- Jest (herramienta alternativa): https://jestjs.io/
- Cypress (herramienta alternativa): https://www.cypress.io/