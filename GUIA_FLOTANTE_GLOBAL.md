# 🌐 GUÍA FLOTANTE GLOBAL PERSISTENTE - IMPLEMENTACIÓN

**Fecha:** 2025-12-01 17:04  
**Objetivo:** Panel flotante que persiste al navegar por toda la aplicación

---

## ✅ **COMPONENTES CREADOS**

### **1. GuideContext.jsx** ✅
Context API para mantener el estado global de la guía:
- `activeGuide` - ID de la guía activa
- `currentStep` - Paso actual
- `completedSteps` - Pasos completados
- `isFloatingMode` - Si está en modo flotante
- `isMinimized` - Si está minimizado

### **2. GlobalFloatingGuide.jsx** ✅
Componente que se renderiza globalmente:
- Lee el estado del Context
- Se muestra en toda la aplicación
- Persiste al navegar
- Maneja redirecciones sin cerrarse

---

## 🔧 **PASOS PARA COMPLETAR LA INTEGRACIÓN**

### **Paso 1: Envolver App con GuideProvider**

Editar `frontend/src/routes/App.jsx`:

```javascript
import { GuideProvider } from '../context/GuideContext';
import GlobalFloatingGuide from '../components/GlobalFloatingGuide';

function App() {
  return (
    <GuideProvider>
      <Router>
        {/* Rutas existentes */}
        <Routes>
          {/* ... todas las rutas ... */}
        </Routes>
        
        {/* Panel flotante global - siempre visible */}
        <GlobalFloatingGuide />
      </Router>
    </GuideProvider>
  );
}
```

### **Paso 2: Actualizar AIAssistant.jsx**

Modificar la función `showQuickGuide`:

```javascript
import { useGuide } from '../context/GuideContext';

function AIAssistant() {
  const { startGuide } = useGuide();
  
  const showQuickGuide = (guideId) => {
    // Iniciar guía en el context
    startGuide(guideId);
    // Abrir modal de guía
    setSelectedGuide(guideId);
    setShowInteractiveGuide(true);
    setShowQuickGuideModal(false);
  };
}
```

### **Paso 3: Actualizar InteractiveGuide.jsx**

Modificar el botón "Activar Guía Flotante":

```javascript
import { useGuide } from '../context/GuideContext';

function InteractiveGuide({ guide, onClose }) {
  const { activateFloatingMode } = useGuide();
  
  return (
    // ... contenido del modal ...
    
    <button 
      className="toggle-floating-btn"
      onClick={() => {
        activateFloatingMode(); // Activa modo flotante global
        if (onClose) onClose(); // Cierra el modal
      }}
    >
      📌 Activar Guía Flotante
    </button>
  );
}
```

---

## 🎯 **FLUJO COMPLETO**

```
Usuario en AIAssistant
    ↓
Click "📚 Guías"
    ↓
Selecciona "🚀 Primeros Pasos"
    ↓
startGuide('getting_started') → Context actualizado
    ↓
Modal completo se abre
    ↓
Lee paso 1
    ↓
Click "📌 Activar Guía Flotante"
    ↓
activateFloatingMode() → Context: isFloatingMode = true
    ↓
Modal se cierra (onClose())
    ↓
GlobalFloatingGuide detecta isFloatingMode = true
    ↓
Panel flotante aparece en esquina ┐
    ↓                                │
Usuario lee paso 1                  │
    ↓                                │
Click "→ Ejecutar: Ir a Mi Perfil"  │
    ↓                                │
navigate('/profile')                │ Panel
    ↓                                │ permanece
Usuario navega a /profile           │ visible
    ↓                                │ en toda
Panel SIGUE VISIBLE                 │ la app
    ↓                                │
Usuario completa su perfil          │
    ↓                                │
Click "Siguiente →" en panel        │
    ↓                                │
nextStep() → Context actualizado    │
    ↓                                │
Panel muestra paso 2                │
    ↓                                │
Click "→ Ejecutar: Ir al Dashboard" │
    ↓                                │
navigate('/dashboard')              │
    ↓                                │
Panel SIGUE VISIBLE                 │
    ↓                                │
Usuario explora dashboard           │
    ↓                                │
... continúa hasta último paso ...  │
    ↓                                │
Click "✓ Finalizar Guía"            │
    ↓                                │
closeGuide() → Context reseteado    │
    ↓                                ┘
Panel desaparece
```

---

## 📦 **ARCHIVOS NECESARIOS**

### **Creados:**
- ✅ `frontend/src/context/GuideContext.jsx`
- ✅ `frontend/src/components/GlobalFloatingGuide.jsx`

### **A Modificar:**
- ⚠️ `frontend/src/routes/App.jsx` - Agregar GuideProvider y GlobalFloatingGuide
- ⚠️ `frontend/src/pages/AIAssistant.jsx` - Usar useGuide()
- ⚠️ `frontend/src/components/InteractiveGuide.jsx` - Actualizar botón flotante

---

## 💻 **CÓDIGO COMPLETO PARA App.jsx**

```javascript
// frontend/src/routes/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { GuideProvider } from '../context/GuideContext';
import GlobalFloatingGuide from '../components/GlobalFloatingGuide';

// Importar páginas...
import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
// ... otras importaciones ...

function App() {
  return (
    <AuthProvider>
      <GuideProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/support" element={<UserSupport />} />
            {/* ... otras rutas ... */}
          </Routes>
          
          {/* Panel flotante global - renderiza en toda la app */}
          <GlobalFloatingGuide />
        </Router>
      </GuideProvider>
    </AuthProvider>
  );
}

export default App;
```

---

## ✨ **VENTAJAS DE ESTA IMPLEMENTACIÓN**

### **1. Persistencia Global**
- ✅ Panel visible en TODAS las páginas
- ✅ Estado se mantiene al navegar
- ✅ No se pierde progreso

### **2. Navegación Libre**
- ✅ Usuario puede ir a cualquier página
- ✅ Panel siempre accesible
- ✅ Guía efectiva paso a paso

### **3. Control Total**
- ✅ Usuario puede minimizar
- ✅ Usuario puede cerrar
- ✅ Usuario controla el ritmo

### **4. Experiencia Fluida**
- ✅ Redirecciones automáticas
- ✅ Panel no se cierra al navegar
- ✅ Comentarios interactivos
- ✅ Progreso visual

---

## 🎨 **EJEMPLO DE USO**

```
1. Usuario abre AI Assistant
2. Click "Guías" → "Primeros Pasos"
3. Modal se abre con paso 1
4. Lee: "Completa tu Perfil"
5. Click "📌 Activar Guía Flotante"
6. Modal se cierra
7. Panel aparece en esquina inferior derecha
8. Panel muestra: "Paso 1/5 - Completa tu Perfil"
9. Click "→ Ejecutar: Ir a Mi Perfil"
10. Navega a /profile
11. Panel SIGUE VISIBLE mostrando paso 1
12. Usuario completa su perfil
13. Click "Siguiente →" en panel
14. Panel muestra paso 2: "Explora el Dashboard"
15. Click "→ Ejecutar: Ir al Dashboard"
16. Navega a /dashboard
17. Panel SIGUE VISIBLE mostrando paso 2
18. ... continúa hasta completar todos los pasos ...
19. Click "✓ Finalizar Guía"
20. Panel desaparece
```

---

## 🚀 **ESTADO ACTUAL**

- ✅ GuideContext creado
- ✅ GlobalFloatingGuide creado
- ⚠️ Falta integrar en App.jsx
- ⚠️ Falta actualizar AIAssistant.jsx
- ⚠️ Falta actualizar InteractiveGuide.jsx

---

## 📝 **PRÓXIMO PASO**

**Necesitas:**
1. Agregar `GuideProvider` en App.jsx
2. Agregar `<GlobalFloatingGuide />` en App.jsx
3. Actualizar AIAssistant para usar `useGuide()`
4. Actualizar botón en InteractiveGuide

**¿Quieres que complete estas integraciones?** 🤔

---

**Última actualización:** 2025-12-01 17:05  
**Estado:** ⚠️ Componentes creados, integración pendiente
