# 🚀 Guía de Inicio Rápido - AromaLife con Prometheus y Grafana

## ⚡ Ejecutar en 5 Minutos

### 1. Pre-requisitos
```bash
# Verificar que tengas instalado:
node --version    # v20+
docker --version  # 20+
git --version     # 2.0+
```

### 2. Clonar y Configurar
```bash
git clone https://github.com/andrescabezas26/PROMETHEUS-GRAFANA-project-backend-aromalife-adn.git
cd PROMETHEUS-GRAFANA-project-backend-aromalife-adn
npm install
```

### 3. Archivo .env
Crea `.env` con:
```env
PORT=3001
DB_PASSWORD=hola1234
DB_NAME=aromalife
DB_USERNAME=postgres
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=aromalife
JWT_SECRET=hola1234
DATABASE_URL=postgresql://postgres:hola1234@localhost:5432/aromalife
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 4. Levantar Servicios
```bash
# Levantar Docker (Base de datos, Prometheus, Grafana)
docker-compose up -d

# Verificar que todo esté corriendo
docker ps

# Iniciar aplicación NestJS
npm run start:dev
```

### 5. Verificar Todo Funciona

#### ✅ Checklist
- [ ] Aplicación: http://localhost:3001 
- [ ] Métricas: http://localhost:3001/metrics
- [ ] Prometheus: http://localhost:9090
- [ ] Grafana: http://localhost:3000 (admin/admin)

#### 🧪 Generar Datos de Prueba
```bash
curl http://localhost:3001/
curl http://localhost:3001/candles
curl http://localhost:3001/orders
```

#### 📊 Ver Métricas
1. **Prometheus**: Ve a http://localhost:9090 y prueba:
   ```promql
   rate(http_requests_total[1m])
   nodejs_cpu_usage_percent
   nodejs_memory_usage_bytes
   ```

2. **Grafana**: Ve a http://localhost:3000
   - Login: admin/admin
   - Dashboard: "AromaLife API - Simple Dashboard"

## 🎯 URLs Importantes

| Servicio | URL | Login |
|----------|-----|-------|
| API | http://localhost:3001 | - |
| Swagger | http://localhost:3001/api | - |
| Métricas | http://localhost:3001/metrics | - |
| Prometheus | http://localhost:9090 | - |
| Grafana | http://localhost:3000 | admin/admin |
| PgAdmin | http://localhost:8888 | default@gmail.com/hola1234 |

## 🔥 Queries de Ejemplo

```promql
# CPU Usage
nodejs_cpu_usage_percent

# Memory en MB
nodejs_memory_usage_bytes / 1024 / 1024

# HTTP Requests por segundo
rate(http_requests_total[1m])

# Total órdenes
orders_total

# Total velas creadas
candles_created_total
```

## 🛑 Detener Todo

```bash
# Detener aplicación
Ctrl + C

# Detener Docker
docker-compose down

# Limpiar volúmenes (opcional)
docker-compose down -v
```

---

**🎉 ¡Listo! Ya tienes monitoreo completo funcionando.**