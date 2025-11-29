# Proyecto Ejemplo Node.js - CI/CD con Jenkins

Aplicación Node.js de ejemplo para demostrar pipelines de CI/CD con Jenkins, incluyendo testing, linting, construcción de imágenes Docker y despliegue automatizado.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Requisitos Previos](#-requisitos-previos)
- [Inicio Rápido](#-inicio-rápido)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Configuración de Jenkins](#-configuración-de-jenkins)
- [Pipeline CI/CD](#-pipeline-cicd)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [Solución de Problemas](#-solución-de-problemas)

## ✨ Características

- ✅ API REST con Express.js
- ✅ Tests unitarios con Jest
- ✅ Linting con ESLint
- ✅ Cobertura de código
- ✅ Dockerización completa
- ✅ Pipeline de Jenkins automatizado
- ✅ Health checks integrados
- ✅ Despliegue automático

## 🔧 Requisitos Previos

- **Node.js** >= 14.x
- **npm** >= 6.x
- **Docker** >= 20.x
- **Jenkins** >= 2.x (para CI/CD)
- **Git**

## 🚀 Inicio Rápido

### Ejecutar Localmente

```bash
# Clonar el repositorio
git clone <tu-repositorio-url>
cd proyecto-ejemplo-nodejs

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:3000
```

### Ejecutar con Docker

```bash
# Construir la imagen
docker build -t ejemplo-nodejs:latest .

# Ejecutar el contenedor
docker run -d -p 3000:3000 --name mi-app ejemplo-nodejs:latest

# Ver logs
docker logs -f mi-app

# Detener y eliminar
docker stop mi-app && docker rm mi-app
```

### Ejecutar Tests

```bash
# Tests con cobertura
npm test

# Solo tests
npm run test

# Linting
npm run lint
```

## 🌐 Endpoints de la API

| Método | Endpoint | Descripción | Ejemplo |
|--------|----------|-------------|---------|
| GET | `/` | Mensaje de bienvenida | `curl http://localhost:3000/` |
| GET | `/health` | Health check del servicio | `curl http://localhost:3000/health` |
| GET | `/api/hello?name=Juan` | Saludo personalizado | `curl http://localhost:3000/api/hello?name=Juan` |
| GET | `/info` | Información del sistema | `curl http://localhost:3000/info` |

## 🔧 Configuración de Jenkins

### Paso 1: Prerrequisitos en Jenkins

Instala los siguientes plugins:
- Git Plugin
- Pipeline Plugin
- Docker Pipeline Plugin
- JUnit Plugin

### Paso 2: Configurar Credenciales

1. Ve a **Manage Jenkins** → **Manage Credentials**
2. Agrega credenciales de Git:
   - **Kind**: Username with password
   - **ID**: `git-credentials`
   - **Username**: tu usuario de Git
   - **Password**: tu token de acceso

### Paso 3: Crear el Job

#### Opción A: Pipeline desde SCM (Recomendado)

1. Click en **New Item**
2. Nombre: `proyecto-ejemplo-nodejs`
3. Tipo: **Pipeline**
4. En **Pipeline**:
   - **Definition**: Pipeline script from SCM
   - **SCM**: Git
   - **Repository URL**: `https://github.com/tu-usuario/proyecto-ejemplo-nodejs.git`
   - **Credentials**: Selecciona `git-credentials`
   - **Branch**: `*/main`
   - **Script Path**: `Jenkinsfile`
5. Click **Save**

#### Opción B: Pipeline Script Directo

1. Click en **New Item**
2. Nombre: `proyecto-ejemplo-nodejs`
3. Tipo: **Pipeline**
4. En **Pipeline**:
   - **Definition**: Pipeline script
   - Copia y pega el contenido del `Jenkinsfile`
5. Click **Save**

### Paso 4: Configurar Docker en Jenkins

```bash
# En el servidor Jenkins, agregar usuario jenkins al grupo docker
sudo usermod -aG docker jenkins

# Reiniciar Jenkins
sudo systemctl restart jenkins
```

### Paso 5: Ejecutar el Pipeline

1. Ve al job creado
2. Click en **Build Now**
3. Observa el progreso en **Console Output**

## 🔄 Pipeline CI/CD

El pipeline de Jenkins ejecuta las siguientes etapas:

### 1. **Checkout** 
Obtiene el código fuente del repositorio Git usando `checkout scm`

### 2. **Install Dependencies**
Instala las dependencias de Node.js con `npm install`

### 3. **Lint**
Ejecuta ESLint para verificar la calidad del código

### 4. **Test**
Ejecuta los tests unitarios con Jest y genera reportes de cobertura

### 5. **Build Docker Image**
Construye la imagen Docker y la etiqueta con el número de build

### 6. **Deploy**
Despliega el contenedor Docker en el servidor

### 7. **Health Check**
Verifica que la aplicación esté funcionando correctamente

### Diagrama del Pipeline

```
┌─────────────┐
│  Checkout   │
└──────┬──────┘
       │
┌──────▼──────┐
│   Install   │
└──────┬──────┘
       │
┌──────▼──────┐
│    Lint     │
└──────┬──────┘
       │
┌──────▼──────┐
│    Test     │
└──────┬──────┘
       │
┌──────▼──────┐
│    Build    │
└──────┬──────┘
       │
┌──────▼──────┐
│   Deploy    │
└──────┬──────┘
       │
┌──────▼──────┐
│Health Check │
└─────────────┘
```

## 📁 Estructura del Proyecto

```
proyecto-ejemplo-nodejs/
├── src/
│   ├── index.js              # Aplicación Express principal
│   └── index.test.js         # Tests unitarios con Jest
├── coverage/                 # Reportes de cobertura (generado)
├── node_modules/            # Dependencias (generado)
├── .eslintrc.json           # Configuración de ESLint
├── Dockerfile               # Definición de imagen Docker
├── Jenkinsfile              # Pipeline de Jenkins
├── jest.config.js           # Configuración de Jest
├── package.json             # Dependencias y scripts
├── package-lock.json        # Lock de dependencias
└── README.md               # Este archivo
```

## 📜 Scripts Disponibles

```bash
# Iniciar aplicación en producción
npm start

# Iniciar en modo desarrollo (con nodemon)
npm run dev

# Ejecutar tests con cobertura
npm test

# Ejecutar linter
npm run lint

# Build (placeholder)
npm run build
```

## 🐛 Solución de Problemas

### Error: "docker: command not found" en Jenkins

**Solución:**
```bash
# Instalar Docker en el servidor Jenkins
sudo apt-get update
sudo apt-get install docker.io

# Agregar usuario jenkins al grupo docker
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Error: "Permission denied" al acceder a Docker

**Solución:**
```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Error: Puerto 3000 ya en uso

**Solución:**
```bash
# Detener el contenedor existente
docker stop ejemplo-nodejs
docker rm ejemplo-nodejs

# O cambiar el puerto en el Jenkinsfile
# Modificar: -p 3001:3000
```

### Error: "Host key verification failed" (Git)

**Solución:**
- Usa HTTPS en lugar de SSH para el repositorio
- O agrega la clave SSH del servidor a `known_hosts`

### Tests fallan en Jenkins pero pasan localmente

**Solución:**
- Verifica que las versiones de Node.js sean compatibles
- Asegúrate de que `npm install` se ejecute correctamente
- Revisa los logs en Console Output

## 🔐 Configuración Adicional

### Webhooks para Builds Automáticos

1. En Jenkins, marca **GitHub hook trigger for GITScm polling**
2. En GitHub:
   - **Settings** → **Webhooks** → **Add webhook**
   - **Payload URL**: `http://tu-jenkins-url/github-webhook/`
   - **Content type**: `application/json`
   - **Events**: Just the push event

### Variables de Entorno

Puedes configurar variables de entorno en el `Jenkinsfile`:

```groovy
environment {
    NODE_ENV = 'production'
    PORT = '3000'
    DOCKER_IMAGE = 'ejemplo-nodejs'
}
```

## 📊 Reportes

El pipeline genera los siguientes reportes:

- **Cobertura de Tests**: `coverage/lcov-report/index.html`
- **Resultados JUnit**: `coverage/junit.xml`
- **Console Output**: Disponible en cada build de Jenkins

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autor

DevOps Course

## 📚 Recursos Adicionales

- [Documentación de Jenkins](https://www.jenkins.io/doc/)
- [Express.js](https://expressjs.com/)
- [Jest Testing Framework](https://jestjs.io/)
- [Docker Documentation](https://docs.docker.com/)
- [ESLint](https://eslint.org/)
