# Monitor de Métricas en Tiempo Real

## 📊 Descripción General

El Monitor de Métricas en Tiempo Real es una herramienta administrativa avanzada que permite visualizar estadísticas del sistema en tiempo real, con datos reales de la base de datos y actualización automática.

## 🎯 Características Principales

### 1. **Tres Categorías de Métricas**

#### 💰 Ventas
- **Pedidos Totales**: Cantidad de pedidos en el rango seleccionado
- **Ingresos**: Suma total de ventas
- **Productos Más Vendidos**: Top 5 productos por cantidad
- **Productos Menos Vendidos**: Bottom 5 productos

#### 👥 Usuarios
- **Usuarios Activos**: Cuentas con `estado=True`
- **Usuarios Inactivos**: Cuentas desactivadas
- **Nuevos Usuarios**: Registros en el rango de tiempo

#### 🖥️ Plataforma
- **Carga CPU**: Porcentaje de uso del procesador
- **Uso de Memoria**: RAM utilizada (% y GB)
- **Uso de Disco**: Espacio en disco
- **Hora del Servidor**: Timestamp actual

### 2. **Rangos de Tiempo Flexibles**

El sistema permite analizar datos en 9 rangos diferentes:
- **20 segundos** (tiempo real)
- **1 minuto**
- **1 hora**
- **1 día**
- **1 semana**
- **1 mes**
- **3 meses**
- **6 meses**
- **1 año**

### 3. **Actualización Automática Inteligente**

La frecuencia de actualización se ajusta según el rango:
- **20s - 1min**: Actualización cada 2 segundos
- **1h - 1día**: Actualización cada 10 segundos
- **Rangos mayores**: Actualización cada 60 segundos

## 🔧 Implementación Técnica

### Backend (Django)

**Endpoint**: `GET /api/usuarios/admin/metrics/?range={time_range}`

**Archivo**: `src/backend/apps/usuarios/views/views_admin.py`

```python
@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_advanced_metrics(request):
    time_range = request.query_params.get('range', '1h')
    
    # Cálculo de fecha de inicio según rango
    # Consultas a BD para ventas, usuarios
    # Métricas del sistema con psutil
    
    return Response({
        'range': time_range,
        'sales': {...},
        'users': {...},
        'platform': {...}
    })
```

**Dependencias**:
- `psutil`: Para métricas del sistema (CPU, RAM, disco)
- Django ORM: Agregaciones con `Count`, `Sum`

### Frontend (React)

**Componente**: `src/frontend/src/components/admin/LiveMetricsModal.jsx`

**Características**:
- Tabs para navegación entre categorías
- Botones de filtro de tiempo
- Auto-refresh con `useEffect` y `setInterval`
- Manejo de estados de carga y error

**Uso**:
```jsx
import LiveMetricsModal from '../components/admin/LiveMetricsModal';

function DashboardAdmin() {
  const [showMetrics, setShowMetrics] = useState(false);
  
  return (
    <>
      <div onClick={() => setShowMetrics(true)}>
        Ver Métricas
      </div>
      {showMetrics && (
        <LiveMetricsModal onClose={() => setShowMetrics(false)} />
      )}
    </>
  );
}
```

## 📈 Consultas SQL Optimizadas

### Ventas
```python
# Total de pedidos
orders_query = Pedido.objects.filter(fecha_creacion__gte=start_date)
total_orders = orders_query.count()
total_revenue = orders_query.aggregate(Sum('total'))['total__sum']

# Top productos
product_stats = DetallePedido.objects.filter(
    pedido__fecha_creacion__gte=start_date
).values('producto__nombre').annotate(
    qty=Sum('cantidad')
).order_by('-qty')[:5]
```

### Usuarios
```python
active_users = Usuario.objects.filter(estado=True).count()
new_users = Usuario.objects.filter(fecha_registro__gte=start_date).count()
```

## 🎨 Diseño UI/UX

- **Modal Overlay**: Fondo oscuro semi-transparente
- **Contenedor**: Máximo 900px, scroll vertical
- **Tabs**: Navegación clara con indicador visual
- **Cards**: Diseño limpio con sombras sutiles
- **Colores**: Paleta consistente con el sistema
  - Azul (#3b82f6): Principal
  - Verde (#10b981): Positivo
  - Naranja (#f59e0b): Advertencia
  - Gris (#64748b): Neutral

## 🔒 Seguridad

- **Autenticación**: Requiere `IsAdminUser`
- **Autorización**: Solo administradores pueden acceder
- **Rate Limiting**: Considerar implementar para evitar abuso
- **Validación**: Rangos de tiempo validados en backend

## 🚀 Mejoras Futuras

1. **Gráficos Avanzados**: Integrar Chart.js o Recharts
2. **Exportación**: Permitir descargar datos en CSV/PDF
3. **Alertas**: Notificaciones cuando métricas excedan umbrales
4. **Histórico**: Guardar snapshots para análisis temporal
5. **Comparativas**: Comparar periodos (mes actual vs anterior)
6. **WebSockets**: Actualización en tiempo real sin polling

## 📝 Notas de Desarrollo

- Si `psutil` no está instalado, las métricas de plataforma mostrarán valores por defecto (0%)
- El endpoint maneja gracefully la ausencia de datos (listas vacías, 0 en contadores)
- La UI muestra mensajes apropiados cuando no hay datos disponibles

## 🧪 Testing

Ver `src/backend/tests/test_metrics.py` para tests unitarios del endpoint.

---

**Última actualización**: 2025-12-09  
**Versión**: 1.0  
**Autor**: Equipo PREXCOL
