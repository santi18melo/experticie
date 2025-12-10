# Sistema de Temas y Configuración Global

## 🎨 Descripción

Sistema de gestión de temas (claro/oscuro) y configuraciones globales del usuario, con persistencia en localStorage y aplicación instantánea.

## 📋 Componentes

### 1. ThemeContext

**Ubicación**: `src/frontend/src/context/ThemeContext.jsx`

**Funcionalidad**:
- Gestiona el estado global del tema
- Persiste preferencias en `localStorage`
- Aplica cambios al `document.documentElement`

```jsx
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Cambiar a {theme === 'light' ? 'Oscuro' : 'Claro'}
    </button>
  );
}
```

### 2. I18nContext

**Ubicación**: `src/frontend/src/context/I18nContext.jsx`

**Funcionalidad**:
- Gestiona el idioma de la aplicación
- Función `t()` para traducciones
- Cambio de idioma en tiempo real

```jsx
import { useTranslation } from '../context/I18nContext';

function MyComponent() {
  const { t, locale, changeLocale } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => changeLocale('es')}>Español</button>
      <button onClick={() => changeLocale('en')}>English</button>
    </div>
  );
}
```

### 3. Settings Page

**Ubicación**: `src/frontend/src/pages/Settings.jsx`

**Características**:
- Cambio de tema (light/dark)
- Cambio de idioma (es/en)
- Configuración de notificaciones
- Desactivación de cuenta
- Cambio de contraseña

## 🔧 Implementación

### Variables CSS

El tema se aplica mediante variables CSS en `src/frontend/src/styles/index.css`:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a202c;
  --color-primary: #3b82f6;
}

[data-theme="dark"] {
  --bg-primary: #1a202c;
  --text-primary: #f7fafc;
  --color-primary: #60a5fa;
}
```

### Persistencia

```javascript
// Guardar tema
localStorage.setItem('theme', 'dark');

// Leer tema
const savedTheme = localStorage.getItem('theme') || 'light';

// Aplicar al DOM
document.documentElement.setAttribute('data-theme', theme);
```

## 🎯 Flujo de Cambio de Tema

1. Usuario hace clic en selector de tema
2. `setTheme()` actualiza el estado en Context
3. `useEffect` detecta cambio y:
   - Actualiza `localStorage`
   - Aplica atributo `data-theme` al DOM
4. CSS reacciona a `[data-theme="dark"]`
5. UI se actualiza instantáneamente

## 🌐 Internacionalización

### Estructura de Traducciones

```
src/frontend/src/locales/
├── es.json
└── en.json
```

**Ejemplo es.json**:
```json
{
  "welcome": "Bienvenido",
  "dashboard": "Panel de Control",
  "settings": "Configuración"
}
```

### Uso de Traducciones

```jsx
const { t } = useTranslation();

<h1>{t('dashboard')}</h1>
<p>{t('welcome')}</p>
```

## 🔐 Desactivación de Cuenta

### Frontend

```jsx
const handleDeactivateAccount = async () => {
  if (!window.confirm('¿Estás seguro?')) return;
  
  try {
    await axiosInstance.post('/usuarios/deactivate/');
    logout();
    navigate('/login');
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Backend

**Endpoint**: `POST /api/usuarios/deactivate/`

**Archivo**: `src/backend/apps/usuarios/views/view_account_management.py`

```python
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def self_deactivate_account(request):
    user = request.user
    user.self_deactivated = True
    user.estado = False
    user.save()
    
    # Enviar email de confirmación
    send_mail(
        'Desactivación de Cuenta',
        f'Tu cuenta ha sido desactivada...',
        settings.DEFAULT_FROM_EMAIL,
        [user.email]
    )
    
    return Response({'message': 'Cuenta desactivada'})
```

## 📧 Email de Desactivación

**Contenido del email**:
- Confirmación de desactivación
- Instrucciones para reactivar
- Información de contacto de soporte

**Configuración SMTP** (`.env`):
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=tu-email@gmail.com
EMAIL_HOST_PASSWORD=tu-app-password
EMAIL_USE_TLS=True
```

## 🧪 Testing

### Test de Tema

```javascript
describe('ThemeContext', () => {
  it('should toggle theme', () => {
    const { result } = renderHook(() => useTheme());
    
    expect(result.current.theme).toBe('light');
    
    act(() => {
      result.current.setTheme('dark');
    });
    
    expect(result.current.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
```

### Test de Desactivación

```python
def test_self_deactivate_account(self):
    self.client.force_authenticate(user=self.user)
    response = self.client.post('/api/usuarios/deactivate/')
    
    self.assertEqual(response.status_code, 200)
    self.user.refresh_from_db()
    self.assertFalse(self.user.estado)
    self.assertTrue(self.user.self_deactivated)
```

## 🎨 Mejores Prácticas

1. **Siempre usar Context para estado global**
2. **Persistir preferencias críticas en localStorage**
3. **Validar cambios en backend antes de aplicar**
4. **Proporcionar feedback visual inmediato**
5. **Confirmar acciones destructivas (desactivación)**

---

**Última actualización**: 2025-12-09  
**Versión**: 1.0
