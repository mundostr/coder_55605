## Clase 35

### Uso de módulo cluster para manejo de instancias.
* cluster es un módulo nativo, NO necesitamos agregarlo como dependencia, solo incluirlo y usarlo.
* Nos permitirá crear de manera automática distintas instancias de nuestra aplicación, y de esa forma realizar un mejor aprovechamiento de los recursos de equipo disponibles.
* Volver a ejecutar la prueba unitaria rápida de Artillery sobre el endpoint complex y comparar el resultado del reporte con el de la clase anterior. Ver cómo ha mejorado la respuesta gracias a las instancias trabajando en paralelo, a pesar que el código fuente del endpoint es el mismo.
* artillery quick --count 40 --num 50 "http://localhost:puerto/api/sessions/complex" -o complex_report_cluster.json

### Primeros pasos con Docker.
* Docker es un gestor de contenedores.
* Un contenedor es esencialmente una instancia en memoria de una imagen, que contiene un sistema autónomo completo, con todo lo necesario para correr nuestra aplicación de forma encapsulada, sin riesgo de conflictos con otras configuraciones en el equipo.
* Docker Desktop es un GUI para manejar de forma más cómoda imágenes y contenedores.
* Docker Hub es un centro de distribución de imágenes prearmadas, que podemos descargar y utilizar tal cual están, o aprovecharlas como base para crear nuestras propias imágenes.

#### Secuencia de creación de imagen:
1. Crear archivo Dockerfile y .dockerignore (ver comentarios en archivos).
2. Construir la imagen:
```
docker build -t nombre_imagen .
```
3. Crear contenedor (instancia de la imagen):
```
// -d indica que se correrá como servicio (daemon)
// -p nos permite mapear el puerto, en este caso desde afuera accederemos por puerto 5050, por supuesto podríamos mantener el mismo (8080:8080)
docker run -d -p 5050:8080 --name nombre_contenedor nombre_imagen
```
4. **IMPORTANTE!**: como en este caso el servicio de MongoDB que utilizamos no está corriendo dentro del contenedor, el sistema no podrá conectar al motor de Mongo en 127.0.0.1. Probar con el servicio de Atlas, o si se utiliza una bbdd local, utilizar **host.docker.internal** en lugar de 127.0.0.1.
```
// Revisar app.js, hemos activado el uso de process.env.MONGO. Para pasarlo como parámetro al arrancar el contenedor, podemos hacer lo siguiente:
docker run -d -p 5050:8080 -e "MONGO:mongodb://host.docker.internal:27017/coder55605" --name nombre_contenedor nombre_imagen
```

* La primera vez, la creación de la imagen puede tardar. En sucesivos ajustes que hagamos y nuevos build, será mucho más rápido.
* Abrir Docker Desktop y ver como aparece listada la imagen creada (también podemos hacerlo desde consola con docker images).
* Desde el propio Docker Desktop podemos crear contenedores visualmente, intentar activar 2 al menos, en distintos puertos, y probar el acceso.

#### Archivos a revisar:
* app.js: activación de cluster.
* Dockerfile: instrucciones para crear imagen Docker.

#### Dependencias a agregar:
* ninguna

#### Enlaces útiles:
* Docker Desktop: https://www.docker.com/products/docker-desktop/
* Docker Hub: https://hub.docker.com