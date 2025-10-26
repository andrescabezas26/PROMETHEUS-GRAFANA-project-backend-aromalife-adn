# 📸 Instrucciones para Agregar Imágenes al README

Para que las imágenes se muestren correctamente en el README, sigue estos pasos:

## 📁 Estructura de Carpetas

Crea la siguiente estructura en tu proyecto:

```
docs/
└── images/
    ├── prometheus-targets.png
    ├── metrics-endpoint.png
    ├── prometheus-query.png
    └── grafana-dashboard.png
```

## 🖼️ Imágenes a Agregar

### 1. prometheus-targets.png
**Captura**: Pantalla de Prometheus mostrando los targets (Status > Targets)
- URL: `http://localhost:9090/targets`
- Muestra: nestjs-app (UP), prometheus (UP), postgres (DOWN)

### 2. metrics-endpoint.png
**Captura**: Endpoint de métricas de la aplicación
- URL: `http://localhost:3001/metrics`
- Muestra: Las métricas raw en formato Prometheus

### 3. prometheus-query.png
**Captura**: Query de Prometheus en acción
- URL: `http://localhost:9090/query`
- Query: `rate(http_requests_total[1m])`
- Muestra: El gráfico resultante

### 4. grafana-dashboard.png
**Captura**: Dashboard de Grafana funcionando
- URL: `http://localhost:3000/d/aromalife-simple/aromalife-api-simple-dashboard`
- Muestra: Dashboard con métricas de CPU, Memory, HTTP requests

## 📸 Cómo Tomar las Capturas

1. **Ejecuta todos los servicios**:
   ```bash
   docker-compose up -d
   npm run start:dev
   ```

2. **Genera algo de tráfico**:
   ```bash
   curl http://localhost:3001/
   curl http://localhost:3001/candles
   curl http://localhost:3001/orders
   ```

3. **Toma las capturas** de cada URL mencionada arriba

4. **Guarda las imágenes** en `docs/images/` con los nombres exactos

## 🔗 Referencias en el README

Las imágenes ya están referenciadas en el README como:

```markdown
![Prometheus Targets](docs/images/prometheus-targets.png)
![Métricas Raw](docs/images/metrics-endpoint.png)
![Prometheus Query](docs/images/prometheus-query.png)
![Grafana Dashboard](docs/images/grafana-dashboard.png)
```

Una vez que agregues las imágenes con esos nombres exactos, se mostrarán automáticamente en el README.