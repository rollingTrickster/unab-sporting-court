# 🔥 Guía de Configuración de Firebase para Autenticación Social

Esta guía te ayudará a configurar Firebase Authentication para usar Google, Facebook y GitHub como proveedores de autenticación.

---

## 📋 Requisitos Previos

- Cuenta de Google (para acceder a Firebase Console)
- Aplicación web funcional

---

## 🚀 Paso 1: Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en **"Agregar proyecto"**
3. Nombre del proyecto: `unab-sporting-court` (o el nombre que prefieras)
4. Acepta los términos y continúa
5. Desactiva Google Analytics si no lo necesitas
6. Haz clic en **"Crear proyecto"**

---

## 🌐 Paso 2: Registrar tu Aplicación Web

1. En el dashboard del proyecto, haz clic en el ícono **Web** (`</>`)
2. Nombre de la app: `UNAB Sporting Court Web`
3. **NO** marques "Firebase Hosting" por ahora
4. Haz clic en **"Registrar app"**
5. **IMPORTANTE**: Copia las credenciales de Firebase Config:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

6. Pega estas credenciales en `index.html` en la sección `window.ENV.FIREBASE_CONFIG`

---

## 🔐 Paso 3: Habilitar Métodos de Autenticación

### 3.1 Habilitar Autenticación en Firebase

1. En Firebase Console, ve a **"Authentication"** (menú izquierdo)
2. Haz clic en **"Comenzar"**
3. Ve a la pestaña **"Sign-in method"**

---

### 3.2 Configurar Google Sign-In

1. En "Sign-in method", haz clic en **"Google"**
2. Activa el interruptor para **"Habilitar"**
3. Selecciona un email de soporte del proyecto
4. Haz clic en **"Guardar"**

✅ **Google está listo** - No requiere configuración adicional

---

### 3.3 Configurar Facebook Sign-In

#### A. Crear App en Facebook Developers

1. Ve a [Facebook Developers](https://developers.facebook.com/)
2. Haz clic en **"Mis aplicaciones"** → **"Crear aplicación"**
3. Selecciona tipo: **"Consumidor"**
4. Nombre de la app: `UNAB Sporting Court`
5. Email de contacto: tu email
6. Haz clic en **"Crear aplicación"**

#### B. Configurar Facebook Login

1. En el dashboard de tu app de Facebook, busca **"Facebook Login"**
2. Haz clic en **"Configurar"**
3. Selecciona plataforma: **"Web"**
4. URL del sitio: `http://localhost:8080` (desarrollo) o tu dominio
5. Guarda los cambios

#### C. Obtener App ID y App Secret

1. Ve a **"Configuración"** → **"Básica"**
2. Copia el **"Identificador de la app"** (App ID)
3. Haz clic en **"Mostrar"** junto a **"Clave secreta de la app"** (App Secret)
4. Copia el App Secret

#### D. Configurar en Firebase

1. Vuelve a Firebase Console
2. En "Sign-in method", haz clic en **"Facebook"**
3. Activa el interruptor para **"Habilitar"**
4. Pega el **App ID** y **App Secret** de Facebook
5. Copia la **URL de devolución de llamada OAuth** que aparece:
   ```
   https://tu-proyecto.firebaseapp.com/__/auth/handler
   ```
6. Haz clic en **"Guardar"**

#### E. Agregar URL de devolución en Facebook

1. Vuelve a Facebook Developers
2. Ve a **"Facebook Login"** → **"Configuración"**
3. En **"URI de redireccionamiento de OAuth válidos"**, pega la URL copiada de Firebase
4. Guarda los cambios

#### F. Hacer la App Pública (Opcional, para producción)

1. En Facebook Developers, ve a **"Configuración"** → **"Básica"**
2. Cambia el estado de la app de "Desarrollo" a "Activa"
3. Completa los campos requeridos (URL de política de privacidad, etc.)

---

### 3.4 Configurar GitHub Sign-In

#### A. Crear OAuth App en GitHub

1. Ve a [GitHub Settings](https://github.com/settings/developers)
2. Haz clic en **"OAuth Apps"** → **"New OAuth App"**
3. Completa el formulario:
   - **Application name**: `UNAB Sporting Court`
   - **Homepage URL**: `http://localhost:8080` (desarrollo)
   - **Authorization callback URL**: (copiar de Firebase en paso siguiente)
4. **NO** hagas clic en "Register application" todavía

#### B. Obtener Callback URL de Firebase

1. En Firebase Console, ve a "Sign-in method"
2. Haz clic en **"GitHub"**
3. Activa el interruptor para **"Habilitar"**
4. Copia la **URL de devolución de llamada de autorización**:
   ```
   https://tu-proyecto.firebaseapp.com/__/auth/handler
   ```

#### C. Completar Registro en GitHub

1. Vuelve al formulario de GitHub
2. Pega la URL de callback en **"Authorization callback URL"**
3. Haz clic en **"Register application"**
4. Copia el **Client ID**
5. Haz clic en **"Generate a new client secret"**
6. Copia el **Client Secret** (solo se muestra una vez)

#### D. Configurar en Firebase

1. Vuelve a Firebase Console
2. En la configuración de GitHub Sign-in
3. Pega el **Client ID** y **Client Secret** de GitHub
4. Haz clic en **"Guardar"**

---

## 📝 Paso 4: Configurar Dominios Autorizados

1. En Firebase Console, ve a **"Authentication"** → **"Settings"**
2. Pestaña **"Authorized domains"**
3. Agrega tus dominios autorizados:
   - `localhost` (ya debería estar)
   - Tu dominio de producción (ej: `tu-app.com`)

---

## 🔧 Paso 5: Actualizar Configuración en el Código

### Opción A: Actualizar en `index.html`

Busca la sección de configuración de Firebase:

```javascript
window.ENV = window.ENV || {
    OPENWEATHER_API_KEY: '61f6915417ca53ccd95fb615cc7fb019',
    FIREBASE_CONFIG: {
        apiKey: "TU_API_KEY_AQUI",
        authDomain: "tu-proyecto.firebaseapp.com",
        projectId: "tu-proyecto-id",
        storageBucket: "tu-proyecto.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:123456789:web:abc123def456"
    }
};
```

Reemplaza los valores con los de tu proyecto de Firebase.

### Opción B: Crear archivo `.env` (recomendado para producción)

Crea un archivo `.env` en la raíz del proyecto:

```bash
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

---

## 🧪 Paso 6: Probar la Autenticación

1. Inicia tu servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre el navegador en `http://localhost:8080`

3. Intenta iniciar sesión con cada proveedor:
   - **Google**: Debería funcionar inmediatamente
   - **Facebook**: Solo funcionará si la app está en modo desarrollo y el usuario está agregado como tester, o si la app está pública
   - **GitHub**: Debería funcionar inmediatamente

---

## 🐛 Solución de Problemas

### Error: "Popup bloqueado"

**Solución**: Permite popups en tu navegador para `localhost` o tu dominio.

### Error: "Auth domain not authorized"

**Solución**: Agrega el dominio en Firebase Console → Authentication → Settings → Authorized domains.

### Error: Facebook "App Not Setup"

**Solución**: Verifica que:
1. La URL de devolución OAuth está correctamente configurada en Facebook
2. La app de Facebook está en modo "Desarrollo" y tu cuenta está como administrador/tester
3. O la app está pública y completaste todos los campos requeridos

### Error: GitHub "Redirect URI mismatch"

**Solución**: Verifica que la callback URL en GitHub OAuth App coincida exactamente con la de Firebase.

### Error: "apiKey is not valid"

**Solución**: Verifica que copiaste correctamente todas las credenciales de Firebase Config.

---

## 🔒 Seguridad en Producción

### 1. Restricciones de API Key

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto de Firebase
3. Ve a **"APIs & Services"** → **"Credentials"**
4. Encuentra tu API Key de Firebase
5. Haz clic en "Edit"
6. En "Application restrictions", selecciona **"HTTP referrers"**
7. Agrega tus dominios autorizados:
   ```
   https://tu-dominio.com/*
   ```

### 2. Reglas de Seguridad de Firebase

Configura reglas de seguridad en Firestore/Storage si los usas.

### 3. Variables de Entorno

No commits las credenciales de Firebase en el código. Usa variables de entorno.

---

## 📚 Recursos Adicionales

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firebase Console](https://console.firebase.google.com/)
- [Facebook Developers](https://developers.facebook.com/)
- [GitHub OAuth Apps](https://github.com/settings/developers)

---

## ✅ Checklist de Configuración

- [ ] Proyecto de Firebase creado
- [ ] App web registrada en Firebase
- [ ] Credenciales de Firebase copiadas en `index.html`
- [ ] Google Sign-In habilitado
- [ ] Facebook App creada y configurada
- [ ] Facebook Sign-In habilitado en Firebase
- [ ] GitHub OAuth App creada
- [ ] GitHub Sign-In habilitado en Firebase
- [ ] Dominios autorizados agregados
- [ ] Pruebas de login exitosas con cada proveedor

---

**¡Listo!** Ahora tu aplicación tiene autenticación social con Firebase. 🎉
