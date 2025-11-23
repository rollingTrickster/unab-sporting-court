# 🚀 Inicio Rápido - Autenticación con Firebase

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Cuenta de Google (para Firebase Console)

---

## ⚡ Configuración en 5 Minutos

### 1️⃣ Instalar Dependencias

```bash
cd unab-sporting-court
npm install
```

### 2️⃣ Crear Proyecto Firebase

1. Ve a https://console.firebase.google.com/
2. Crea un nuevo proyecto: "unab-sporting-court"
3. Registra una app web
4. Copia las credenciales de configuración

### 3️⃣ Configurar Credenciales

Abre `index.html` y busca esta sección (línea ~12):

```javascript
window.ENV = window.ENV || {
    OPENWEATHER_API_KEY: '61f6915417ca53ccd95fb615cc7fb019',
    FIREBASE_CONFIG: {
        apiKey: "PEGA_TU_API_KEY_AQUI",
        authDomain: "tu-proyecto.firebaseapp.com",
        projectId: "tu-proyecto-id",
        storageBucket: "tu-proyecto.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:123456789:web:abc123"
    }
};
```

Reemplaza los valores con los de tu proyecto Firebase.

### 4️⃣ Habilitar Proveedores en Firebase

1. En Firebase Console → **Authentication** → **Sign-in method**
2. Habilita **Google** (solo requiere un clic)
3. Habilita **Facebook** (requiere App ID de Facebook)
4. Habilita **GitHub** (requiere Client ID de GitHub)

> 💡 Para empezar rápido, solo habilita **Google** (es el más fácil)

### 5️⃣ Iniciar Aplicación

```bash
npm run dev
```

Abre http://localhost:8080

---

## ✅ Probar Autenticación

1. Haz clic en "Iniciar sesión con Google"
2. Selecciona tu cuenta de Google
3. Autoriza el acceso
4. ¡Listo! Deberías ver el dashboard

---

## 📚 Documentación Completa

- **Configuración detallada**: Ver `FIREBASE_SETUP.md`
- **Implementación técnica**: Ver `FIREBASE_IMPLEMENTATION.md`

---

## 🐛 Problemas Comunes

### "Firebase is not defined"

✅ **Solución**: Verifica que los scripts de Firebase estén cargados en `index.html` antes de `firebase.js`

### "Popup blocked"

✅ **Solución**: Permite popups para `localhost` en tu navegador

### "Auth domain not authorized"

✅ **Solución**: Agrega `localhost` en Firebase Console → Authentication → Settings → Authorized domains

---

## 📞 Soporte

Si tienes problemas, revisa:
1. Consola del navegador (F12) para ver errores
2. `FIREBASE_SETUP.md` para configuración paso a paso
3. Logs en la terminal

---

**¡Disfruta de tu sistema de autenticación social!** 🎉
