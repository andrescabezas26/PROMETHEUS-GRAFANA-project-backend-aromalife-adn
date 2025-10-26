# 🕯️ Aromalife Backend - Personalización de Velas

Bienvenido al backend de **Aromalife**, una aplicación web diseñada para ofrecer una experiencia única e inmersiva en la personalización de velas. Este repositorio contiene la API y la lógica del servidor con **monitoreo completo usando Prometheus y Grafana**.

## 🚀 Tecnologías Utilizadas

- [NestJS](https://nestjs.com) - Framework para construir aplicaciones escalables del lado del servidor
- [TypeORM](https://typeorm.io) - ORM para manejar la persistencia de datos
- [Docker](https://www.docker.com) - Contenedores para facilitar el despliegue
- [Prometheus](https://prometheus.io) - Sistema de monitoreo y alerta
- [Grafana](https://grafana.com) - Plataforma de visualización de métricas
- [PostgreSQL](https://postgresql.org) - Base de datos relacional

## 📊 Sistema de Monitoreo Implementado 

### ¿Qué se agregó?

Se implementó un sistema completo de monitoreo que incluye:

#### 🏗️ **Arquitectura de Monitoreo**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   NestJS App    │───▶│   Prometheus    │───▶│    Grafana      │
│ (Port: 3001)    │    │ (Port: 9090)    │    │ (Port: 3000)    │
│                 │    │                 │    │                 │
│ /metrics        │    │ Scrapes metrics │    │ Visualizations  │
│ endpoint        │    │ every 5s        │    │ & Dashboards    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

#### 📈 **Métricas Implementadas**

1. **Métricas de Sistema:**
   - `nodejs_cpu_usage_percent` - Porcentaje de uso de CPU
   - `nodejs_memory_usage_bytes` - Uso de memoria en bytes
   - `nodejs_memory_total_bytes` - Memoria total disponible

2. **Métricas HTTP:**
   - `http_requests_total` - Contador total de requests HTTP
   - `http_request_duration_seconds` - Duración de requests HTTP

3. **Métricas de Aplicación:**
   - `orders_total` - Contador de órdenes creadas
   - `candles_created_total` - Contador de velas creadas

#### 🛠️ **Componentes Implementados**

1. **Módulo de Métricas (`src/metrics/`)**:
   ```typescript
   ├── metrics.module.ts      # Configuración del módulo
   ├── metrics.service.ts     # Servicio que maneja las métricas
   ├── metrics.controller.ts  # Controlador que expone /metrics
   └── metrics.interceptor.ts # Interceptor para capturar HTTP requests
   ```

2. **Configuración Docker**:
   ```yaml
   ├── prometheus/
   │   └── prometheus.yml     # Configuración de Prometheus
   ├── grafana/
   │   ├── provisioning/     # Auto-configuración de datasources
   │   └── dashboards/       # Dashboards pre-configurados
   └── docker-compose.yaml   # Orquestación de servicios
   ```

## 🏃‍♂️ Cómo Ejecutar el Proyecto

### Requisitos Previos

- [Node.js](https://nodejs.org) (versión 20 o superior)
- [Docker](https://www.docker.com)
- [Git](https://git-scm.com)

### 🔧 Instalación y Configuración

#### 1. Clonar el repositorio
```bash
git clone https://github.com/andrescabezas26/PROMETHEUS-GRAFANA-project-backend-aromalife-adn.git
cd PROMETHEUS-GRAFANA-project-backend-aromalife-adn
```

#### 2. Instalar dependencias
```bash
npm install
```

#### 3. Configurar variables de entorno
Crea un archivo `.env` con la siguiente configuración:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=hola1234
DB_DATABASE=aromalife
DB_NAME=aromalife

# Aplicación
PORT=3001
NODE_ENV=development
JWT_SECRET=hola1234

# URLs
DATABASE_URL=postgresql://postgres:hola1234@localhost:5432/aromalife
FRONTEND_URL=http://localhost:3000

# APIs Externas (configura según tus credenciales)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
GEMINI_API_KEY=tu_gemini_key
SPOTIFY_CLIENT_ID=tu_spotify_client_id
SPOTIFY_CLIENT_SECRET=tu_spotify_client_secret
```

#### 4. Levantar servicios con Docker
```bash
# Levantar todos los servicios (Base de datos, Prometheus, Grafana)
docker-compose up -d

# Verificar que todos los contenedores estén corriendo
docker ps
```

#### 5. Ejecutar la aplicación NestJS
```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run start:prod
```

## 📊 Acceso a los Servicios

Una vez que todo esté ejecutándose, puedes acceder a:

| Servicio | URL | Credenciales | Descripción |
|----------|-----|--------------|-------------|
| **Aplicación NestJS** | http://localhost:3001 | - | API principal |
| **Swagger Documentation** | http://localhost:3001/api | - | Documentación API |
| **Métricas Prometheus** | http://localhost:3001/metrics | - | Endpoint de métricas |
| **Prometheus UI** | http://localhost:9090 | - | Interfaz de Prometheus |
| **Grafana** | http://localhost:3000 | admin/admin | Dashboards y visualizaciones |
| **PgAdmin** | http://localhost:8888 | - | Administrador de BD |

## 🔍 Usando Prometheus

### Vista de Targets
![alt text](image.png)

Prometheus monitorea estos targets:
- **nestjs-app** ✅ - Tu aplicación NestJS
- **prometheus** ✅ - Auto-monitoreo de Prometheus

### Endpoint de Métricas
![alt text](image-1.png)

El endpoint `/metrics` expone todas las métricas en formato Prometheus:
- Métricas de CPU y memoria
- Contadores de HTTP requests
- Métricas específicas de la aplicación

### Queries de Ejemplo

![alt text](image-3.png)

Queries útiles para probar:

```promql
# Rate de requests HTTP
rate(http_requests_total[1m])

# Uso de CPU
nodejs_cpu_usage_percent

# Uso de memoria en MB
nodejs_memory_usage_bytes / 1024 / 1024

# Total de requests
http_requests_total

# Total de órdenes
orders_total
```

## 📈 Usando Grafana

### Dashboard Principal
![alt text](image-2.png)

El dashboard incluye:
- **CPU Usage** - Porcentaje de uso de CPU
- **Memory Usage** - Uso de memoria en bytes
- **Total HTTP Requests** - Contador total de requests
- **Total Orders** - Contador de órdenes
- **HTTP Request Rate** - Rate de requests por segundo
- **HTTP Request Duration** - Duración de requests

### Configuración Automática
- **Datasource**: Prometheus configurado automáticamente
- **Dashboard**: Pre-cargado con métricas de AromaLife
- **Refresh**: Auto-refresh cada 5 segundos

## 🧪 Generando Datos de Prueba

Para ver métricas en acción, haz requests a tu API:

```bash
# Requests básicos
curl http://localhost:3001/
curl http://localhost:3001/candles
curl http://localhost:3001/orders
curl http://localhost:3001/auth/register

# Ver métricas directamente
curl http://localhost:3001/metrics
```

## 🔧 Configuración Avanzada

### Archivo de Configuración de Prometheus

```yaml
# prometheus/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'nestjs-app'
    static_configs:
      - targets: ['host.docker.internal:3001']
    metrics_path: '/metrics'
    scrape_interval: 5s
```

### Métricas Personalizadas

Para agregar nuevas métricas, edita `src/metrics/metrics.service.ts`:

```typescript
// Ejemplo: Nueva métrica de usuarios activos
this.activeUsers = new Gauge({
  name: 'active_users_count',
  help: 'Number of active users',
  registers: [register],
});

// Usar en el servicio
this.metricsService.activeUsers.set(activeUserCount);
```

## 🛠️ Comandos Útiles

```bash
# Docker
docker-compose up -d              # Levantar servicios
docker-compose down              # Detener servicios
docker-compose down -v           # Detener y limpiar volúmenes
docker-compose logs prometheus   # Ver logs de Prometheus
docker-compose logs grafana      # Ver logs de Grafana

# Aplicación
npm run start:dev               # Desarrollo
npm run start:prod              # Producción
npm run test                    # Tests
npm run lint                    # Linting
```


## 👥 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-metrica`)
3. Commit tus cambios (`git commit -am 'Agregar nueva métrica'`)
4. Push a la rama (`git push origin feature/nueva-metrica`)
5. Crea un Pull Request


## 🎯 Estado del Proyecto

✅ **Funcionando**: Monitoreo completo con Prometheus y Grafana  
✅ **Métricas**: CPU, Memoria, HTTP, Aplicación  
✅ **Dashboards**: Configurados y funcionando  
✅ **Docker**: Servicios orquestados correctamente  

**Desarrollado con ❤️ para AromaLife**