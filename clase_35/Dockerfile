# La imagen:versión (versión es opcional) de la imagen que usaremos como base para crear la nuestra. En este caso será una imagen oficial de NodeJS, versión 20.
FROM node:20
# Un directorio interno de trabajo usado por Docker al crear la imagen, normalmente lo dejamos en /app.
WORKDIR /app
# Indicamos que primero copie los package al workdir
COPY package*.json ./
# Que ejecute luego un npm install para descargar todas las dependencias necesarias.
# MUY IMPORTANTE tener el .dockerignore creado, conteniendo node_modules, para evitar conflictos con el node_modules original del proyecto.
RUN npm install
# Que copie todo lo demás
COPY . .
# Exponga el puerto 8080 por defecto (es decir, que lo abra en el contenedor para poder accederlo desde afuera)
EXPOSE 8080
# Y corra finalmente un npm start para iniciar la aplicación.
# POR SUPUESTO, recordar configurar el comando start en package.json.
CMD ["npm", "start"]