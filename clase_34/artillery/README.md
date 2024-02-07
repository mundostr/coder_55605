## Clase 34
### Activación de WINSTON para registro.
* Ver carpeta winston: comentarios en app.js y services/winston.logger.js.

### Simulación de carga de solicitudes con ARTILLERY.
* https://www.npmjs.com/package/artillery
* Ver carpeta artillery.
* El proyecto contiene un endpoint simple de carga rápida, y otro complex que ejecuta un ciclo muy largo, para simular demora.
* RECORDAR configurar la ruta de la base de datos MongoDB en app.js.
* RECORDAR verificar en el modelo el nombre de la colección utilizada para almacenar los usuarios.
* Para pruebas unitarias de endpoints:
    - artillery quick --count 40 --num 50 "http://localhost:puerto/api/users/simple" -o artillery_simple.json
    - count indica cantidad de usuarios a simular y num cantidad de llamadas por usuario, es decir, en este caso estaremos simulando 2000 solicitudes.
    - realizar el MISMO test pero al endpoint complex, y observar la diferencia en el reporte del archivo json, dadas las demoras introducidas en ese endpoint.
* Para pruebas integradas de distintas etapas a la vez:
    - crear archivo de configuración (ver config.yml y detalles de comandos en sitio oficial Artillery).
    - correr la prueba con artillery run config.yml -o test_integrado.json
    - para reporte gráfico: artillery report test_integrado.json -o test_integrado.html

#### Dependencias a agregar:
* winston
* artillery (se puede agregar como global para aprovecharla en otros proyectos)
* plugin artillery-plugin-metrics-by-endpoint