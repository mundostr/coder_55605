## Clase 36
### Creación de imágenes de Docker
* Verificar el funcionamiento de la app manualmente, con npm start (recordar activar el comando start en package.json).
* Generar archivo Dockerfile con instrucciones para creación de imagen
* Hacer build de la imagen con:
```
// Desde la carpeta donde se encuentra el Dockerfile
docker build -t nombre_imagen .
```
* **IMPORTANTE!**: generar archivo .dockerignore conteniendo el texto node_modules, para evitar conflictos de módulos en la imagen.
* Correr imagen desde Docker Desktop, exponiendo el puerto 3000 y pasando la variable de entorno PORT 3000 también.
* Probar ahora la app desde el contenedor.

### Publicación a https://hub.docker.com:
* Loguearse al hub desde Docker Desktop.
* Luego desde terminal, ejecutar:
```
docker login
docker tag nombre_imagen usuario_hub/nombre_imagen:version

// por ejemplo
docker tag coder_55605 mundostr/coder_55605:1.0.0

// finalmente subir imagen
docker push mundostr/coder_55605:1.0.0
```
* **IMPORTANTE!**: para evitar pasos extra, colocar el repo de la imagen subida como **público**.

### Activación de un servidor de Kubernetes local.

#### Dependencias a agregar:

#### Cliente de Kubernetes (kubectl):
* https://kubernetes.io/docs/tasks/tools/
* Descargar para Windows:
```
curl.exe -LO "https://dl.k8s.io/release/v1.29.1/bin/windows/amd64/kubectl.exe"
```
* Copiar a un directorio de ejecutables (Windows, System32, etc).
* Verificar funcionamiento con:
```
kubectl version --client
```

#### Servidor de Kubernetes (minikube):
* Instalar usando Chocolatey:
```
choco install minikube
```
* Instalar desde Powershell:
* https://minikube.sigs.k8s.io/docs/start/
* Verificar funcionamiento con:
```
minikube --help
```

#### Relación Kubernetes - kubectl - minikube:
* Kubernetes: tecnología para manejo de clusters de contenedores.
* kubectl: herramienta cli para control de cluster.
* minikube: servidor de cluster.

#### Activar cluster:
```
// Descargar la imagen del servidor e iniciar el contenedor
minikube start

// Verificar estado del cluster (puede verse también desde Docker Desktop)
kubectl cluster-info

// Desplegar (ver archivo deploy.yaml)
kubectl apply -f deploy.yaml
```
* Más info formato YAML: https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started

```
/// Listar deployments, pods, services
kubectl get deployments
kubectl get pods
kubectl get services

// Reiniciar deployment
// coder55605-deploy es el nombre del deploy en deploy.yaml
kubectl rollout restart deployment coder55605-deploy

// Abrir acceso a servicio de balanceo para utilizar el cluster
// coder55605-service es el nombre del service en deploy.yaml
minikube service coder55605-service

// Detener servicio (escalarlo a 0 contenedores)
kubectl scale deployment coder55605-deploy --replicas=0

// Borrar deployment y service
kubectl delete deployment coder55605-deploy
kubectl delete service coder55605-service
```
* Info servicio Kubernetes cloud: https://www.linode.com/docs/guides/deploy-container-image-to-kubernetes/