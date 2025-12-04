# 🌍 Guía de Internacionalización (i18n)

## Descripción General

PREXCOL incluye soporte completo para múltiples idiomas mediante un sistema de internacionalización personalizado. Actualmente soporta **Español (ES)** e **Inglés (EN)** con detección automática del idioma del navegador.

## 📁 Estructura de Archivos

```
frontend/src/
├── locales/
│   ├── es.json          # Traducciones en español
│   └── en.json          # Traducciones en inglés
├── context/
│   └── I18nContext.jsx  # Contexto y lógica de i18n
└── components/
    └── LanguageSelector.jsx  # Selector de idioma
```

## 🚀 Uso Básico

### 1. Envolver la Aplicación con el Provider

En `main.jsx` o `App.jsx`:

```jsx
import { I18nProvider } from './context/I18nContext';

function App() {
  return (
    <I18nProvider>
      {/* Tu aplicación */}
    </I18nProvider>
  );
}
```

### 2. Usar Traducciones en Componentes

```jsx
import { useTranslation } from '../context/I18nContext';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <button>{t('common.save')}</button>
    </div>
  );
}
```

### 3. Traducciones con Parámetros

```jsx
const { t } = useTranslation();

// En es.json: "orderNumber": "Pedido #{{number}}"
<p>{t('orders.orderNumber', { number: 123 })}</p>
// Resultado: "Pedido #123"

// En es.json: "itemCount": "{{count}} artículo"
<p>{t('cart.itemCount', { count: 5 })}</p>
// Resultado: "5 artículos"
```

### 4. Cambiar Idioma Programáticamente

```jsx
const { changeLocale } = useTranslation();

<button onClick={() => changeLocale('en')}>
  Switch to English
</button>
```

### 5. Usar el Selector de Idioma

```jsx
import LanguageSelector from '../components/LanguageSelector';

function Header() {
  return (
    <header>
      <h1>PREXCOL</h1>
      <LanguageSelector />
    </header>
  );
}
```

## 📝 Estructura de Archivos de Traducción

Los archivos JSON están organizados por categorías:

```json
{
  "common": {
    "welcome": "Bienvenido",
    "login": "Iniciar Sesión"
  },
  "auth": {
    "loginTitle": "Iniciar Sesión en PREXCOL"
  },
  "dashboard": {
    "admin": {
      "title": "Panel de Administración"
    }
  }
}
```

### Acceso a Traducciones Anidadas

```jsx
t('dashboard.admin.title')  // "Panel de Administración"
t('auth.loginTitle')        // "Iniciar Sesión en PREXCOL"
```

## 🎯 Mejores Prácticas

### 1. Organización de Claves

- Usa nombres descriptivos y jerárquicos
- Agrupa por funcionalidad o página
- Mantén consistencia entre idiomas

```json
// ✅ Bueno
"orders.status.pending": "Pendiente"
"orders.status.delivered": "Entregado"

// ❌ Evitar
"pending": "Pendiente"
"delivered": "Entregado"
```

### 2. Manejo de Plurales

```json
{
  "cart.itemCount": "{{count}} artículo",
  "cart.itemCount_plural": "{{count}} artículos"
}
```

```jsx
// El hook detectará automáticamente si usar singular o plural
t('cart.itemCount', { count: 1 })  // "1 artículo"
t('cart.itemCount', { count: 5 })  // "5 artículos"
```

### 3. Valores por Defecto

Si una traducción no existe, el sistema mostrará la clave:

```jsx
t('nonexistent.key')  // Mostrará: "nonexistent.key"
// Y un warning en consola
```

### 4. Validación de Traducciones

Antes de agregar nuevas claves, verifica que existan en TODOS los idiomas:

```bash
# Ejecutar script de validación (crear si no existe)
npm run validate-translations
```

## 🔧 Agregar un Nuevo Idioma

### Paso 1: Crear Archivo de Traducción

Crea `frontend/src/locales/fr.json` (ejemplo: francés):

```json
{
  "common": {
    "welcome": "Bienvenue",
    "login": "Se connecter"
  }
}
```

### Paso 2: Registrar en el Contexto

En `I18nContext.jsx`:

```jsx
import es from '../locales/es.json';
import en from '../locales/en.json';
import fr from '../locales/fr.json';  // Nuevo

const translations = { es, en, fr };  // Agregar
```

### Paso 3: Actualizar Selector de Idioma

En `LanguageSelector.jsx`:

```jsx
const languages = {
  es: { name: 'Español', flag: '🇪🇸' },
  en: { name: 'English', flag: '🇺🇸' },
  fr: { name: 'Français', flag: '🇫🇷' }  // Nuevo
};
```

## 🧪 Testing con i18n

```jsx
import { render } from '@testing-library/react';
import { I18nProvider } from '../context/I18nContext';

test('renders translated text', () => {
  const { getByText } = render(
    <I18nProvider>
      <MyComponent />
    </I18nProvider>
  );
  
  expect(getByText('Bienvenido')).toBeInTheDocument();
});
```

## 📊 Estadísticas Actuales

- **Idiomas Soportados**: 2 (ES, EN)
- **Claves de Traducción**: ~150
- **Categorías**: 10 (common, auth, dashboard, products, orders, cart, users, stores, validation, errors)

## 🚀 Próximos Pasos

1. **Agregar más idiomas**: Francés, Portugués
2. **Pluralización avanzada**: Usar librería como `i18next`
3. **Traducciones dinámicas**: Cargar desde API
4. **Detección de idioma por región**: ES-CO, ES-MX, etc.
5. **Formato de fechas y números**: Según locale

## 📞 Soporte

Para agregar nuevas traducciones o reportar errores en las existentes, contacta al equipo de desarrollo.
