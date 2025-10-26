# 🔍 Queries Simples de Prometheus para AromaLife

## 📊 Métricas de Sistema (CPU y RAM)

### CPU Usage
```promql
nodejs_cpu_usage_percent
```

### Memory Usage (bytes)
```promql
nodejs_memory_usage_bytes
```

### Memory Usage (MB)
```promql
nodejs_memory_usage_bytes / 1024 / 1024
```

### Memory Total (GB)
```promql
nodejs_memory_total_bytes / 1024 / 1024 / 1024
```

## 🌐 Métricas HTTP Simples

### Total de Requests
```promql
http_requests_total
```

### Requests por método
```promql
sum by (method) (http_requests_total)
```

### Requests por código de estado
```promql
sum by (status_code) (http_requests_total)
```

### Rate de requests por minuto
```promql
rate(http_requests_total[1m])
```

### Errores HTTP (4xx y 5xx)
```promql
sum(http_requests_total{status_code=~"4..|5.."})
```

## 🏪 Métricas de Aplicación

### Total de órdenes
```promql
orders_total
```

### Total de velas creadas
```promql
candles_created_total
```

### Rate de órdenes por hora
```promql
rate(orders_total[1h])
```

### Rate de velas creadas por minuto
```promql
rate(candles_created_total[1m])
```

## 📈 Queries Útiles para Monitoreo

### Porcentaje de errores
```promql
(sum(http_requests_total{status_code=~"5.."}) / sum(http_requests_total)) * 100
```

### Duración promedio de requests
```promql
rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])
```

### Aplicación funcionando
```promql
up{job="nestjs-app"}
```

## 🚨 Alertas Simples

### CPU alto (>80%)
```promql
nodejs_cpu_usage_percent > 80
```

### Memoria alta (>500MB)
```promql
nodejs_memory_usage_bytes > 500000000
```

### Muchos errores HTTP
```promql
sum(rate(http_requests_total{status_code=~"5.."}[5m])) > 0.1
```

---

## 💡 Cómo usar:

1. Ve a **http://localhost:9090**
2. Pega cualquier query en el campo de consulta
3. Haz clic en **Execute**
4. Ve los resultados en la tabla o gráfico

## 📊 Dashboard:

- Ve a **http://localhost:3000** (admin/admin)
- El dashboard simple ya está configurado con CPU, RAM y HTTP metrics