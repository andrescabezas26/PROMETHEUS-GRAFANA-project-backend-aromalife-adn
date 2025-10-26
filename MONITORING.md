# Monitoreo con Prometheus y Grafana - AromaLife

Este proyecto incluye configuración completa de monitoreo usando Prometheus y Grafana.

## Componentes

- **Prometheus**: Recolecta métricas de la aplicación NestJS
- **Grafana**: Visualiza las métricas en dashboards interactivos

## Métricas Disponibles

### Métricas HTTP
- `http_requests_total`: Contador de requests HTTP por método, ruta y código de estado
- `http_request_duration_seconds`: Histograma de duración de requests HTTP

### Métricas de Negocio
- `orders_total`: Contador de órdenes por estado
- `candles_created_total`: Contador de velas creadas
- `active_users`: Gauge de usuarios activos

## Uso

### 1. Instalar dependencias
```bash
npm install @nestjs/prometheus prom-client
```

### 2. Levantar servicios con Docker
```bash
docker-compose up -d
```

### 3. Acceder a los servicios

- **Aplicación NestJS**: http://localhost:3001
- **Métricas Prometheus**: http://localhost:3001/metrics
- **Prometheus UI**: http://localhost:9090
- **Grafana**: http://localhost:3000
  - Usuario: `admin`
  - Contraseña: `admin`

## Configuración

### Prometheus
- Archivo de configuración: `prometheus/prometheus.yml`
- Recolecta métricas cada 5 segundos de la aplicación
- Puerto: 9090

### Grafana
- Configuración automática de datasource para Prometheus
- Dashboard pre-configurado para AromaLife
- Puerto: 3000

## Métricas Personalizadas

Para agregar nuevas métricas, edita el archivo `src/metrics/metrics.service.ts`:

```typescript
// Ejemplo: Contador de productos vendidos
@InjectMetric('products_sold_total')
public readonly productsSoldTotal: Counter<string>;

// Uso en el servicio
this.metricsService.incrementProductsSold(productType);
```

## Dashboard

El dashboard incluye:
- Rate de requests HTTP
- Total de requests
- Duración de requests (percentiles 50 y 95)
- Total de órdenes
- Y más métricas específicas de AromaLife

## Troubleshooting

1. Si Prometheus no puede acceder a la aplicación, verifica que `host.docker.internal` funcione en tu sistema
2. Para Linux, cambia `host.docker.internal` por `172.17.0.1` en `prometheus/prometheus.yml`
3. Verifica que el endpoint `/metrics` responda correctamente en tu aplicación