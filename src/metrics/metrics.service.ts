import { Injectable } from '@nestjs/common';
import { Counter, Histogram, Gauge, register } from 'prom-client';
import * as os from 'os';
import * as process from 'process';

@Injectable()
export class MetricsService {
  // Métricas HTTP básicas
  public readonly httpRequestsTotal: Counter<string>;
  public readonly httpRequestDuration: Histogram<string>;
  
  // Métricas de sistema
  public readonly cpuUsage: Gauge<string>;
  public readonly memoryUsage: Gauge<string>;
  public readonly memoryTotal: Gauge<string>;
  
  // Métricas de aplicación
  public readonly ordersTotal: Counter<string>;
  public readonly candlesCreatedTotal: Counter<string>;

  constructor() {
    // Métricas HTTP simples
    this.httpRequestsTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'status_code'],
      registers: [register],
    });

    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method'],
      registers: [register],
    });

    // Métricas de sistema
    this.cpuUsage = new Gauge({
      name: 'nodejs_cpu_usage_percent',
      help: 'CPU usage percentage',
      registers: [register],
    });

    this.memoryUsage = new Gauge({
      name: 'nodejs_memory_usage_bytes',
      help: 'Memory usage in bytes',
      registers: [register],
    });

    this.memoryTotal = new Gauge({
      name: 'nodejs_memory_total_bytes',
      help: 'Total memory available in bytes',
      registers: [register],
    });

    // Métricas de aplicación simples
    this.ordersTotal = new Counter({
      name: 'orders_total',
      help: 'Total number of orders',
      registers: [register],
    });

    this.candlesCreatedTotal = new Counter({
      name: 'candles_created_total',
      help: 'Total number of candles created',
      registers: [register],
    });

    // Inicializar métricas de sistema
    this.initSystemMetrics();
  }

  // Métodos simplificados para HTTP
  incrementHttpRequests(method: string, status_code: string) {
    this.httpRequestsTotal.inc({ method, status_code });
  }

  observeHttpDuration(method: string, duration: number) {
    this.httpRequestDuration.observe({ method }, duration);
  }

  // Métodos para aplicación
  incrementOrders() {
    this.ordersTotal.inc();
  }

  incrementCandlesCreated() {
    this.candlesCreatedTotal.inc();
  }

  // Inicializar métricas de sistema
  private initSystemMetrics() {
    // Actualizar métricas de sistema cada 10 segundos
    setInterval(() => {
      this.updateSystemMetrics();
    }, 10000);

    // Actualizar inmediatamente
    this.updateSystemMetrics();
  }

  private updateSystemMetrics() {
    try {
      // Métricas de memoria
      const memUsage = process.memoryUsage();
      this.memoryUsage.set(memUsage.heapUsed);
      this.memoryTotal.set(os.totalmem());

      // Métricas de CPU (aproximación simple)
      const cpus = os.cpus();
      let totalIdle = 0;
      let totalTick = 0;

      cpus.forEach(cpu => {
        for (const type in cpu.times) {
          totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
      });

      const idle = totalIdle / cpus.length;
      const total = totalTick / cpus.length;
      const usage = 100 - ~~(100 * idle / total);
      
      this.cpuUsage.set(usage);
    } catch (error) {
      console.error('Error updating system metrics:', error);
    }
  }
}