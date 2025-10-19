# 🎯 Instrucciones de Prueba - Sistema de Reservas de Canchas

## ✅ Correcciones Implementadas

### 1. Sistema de Usuarios Completo
- **Login con validación**: Ahora el login verifica que el usuario exista en localStorage
- **Registro con persistencia**: Los usuarios registrados se guardan permanentemente
- **Prevención de duplicados**: No permite registrar el mismo RUT dos veces

### 2. Reservas por Usuario
- **Filtrado correcto**: Cada usuario solo ve sus propias reservas
- **Contador dinámico**: El badge verde muestra el número correcto de reservas del usuario actual
- **Persistencia mejorada**: Las reservas se guardan inmediatamente en localStorage

### 3. Logs de Depuración
- Logs en consola del navegador para seguir el flujo de datos
- Información sobre login, registro, reservas guardadas y cargadas

## 🧪 Cómo Probar el Sistema

### Paso 1: Limpiar Datos Anteriores (Opcional)
Si quieres empezar desde cero:
1. Abre la consola del navegador (F12)
2. Ejecuta: `localStorage.clear()`
3. Recarga la página (F5)

### Paso 2: Registrar Primer Usuario
1. Ve a la pestaña "Registrarse"
2. Completa el formulario:
   - Nombre: Juan
   - Apellido: Pérez
   - RUT: 12345678-9
   - Email: juan@example.com
   - Contraseña: 123456
3. Haz clic en "Registrarse"

### Paso 3: Hacer una Reserva
1. Selecciona un deporte (ej: Fútbol)
2. Selecciona una cancha
3. Elige una fecha y hora
4. Confirma la reserva
5. Verás el mensaje de éxito

### Paso 4: Ver Mis Reservas
1. Haz clic en "Ver Mis Reservas"
2. Deberías ver tu reserva listada
3. El badge verde debe mostrar "(1)"

### Paso 5: Cerrar Sesión
1. Haz clic en "Cerrar Sesión"
2. Vuelves a la pantalla de login

### Paso 6: Registrar Segundo Usuario
1. Ve a "Registrarse"
2. Completa con datos diferentes:
   - Nombre: María
   - Apellido: González
   - RUT: 98765432-1
   - Email: maria@example.com
   - Contraseña: 654321
3. Regístrate

### Paso 7: Verificar Separación de Reservas
1. El contador debe mostrar "(0)" porque María no tiene reservas
2. Ve a "Mis Reservas" - debe estar vacío
3. Haz una nueva reserva con María
4. Ahora María debe ver "(1)"

### Paso 8: Verificar Persistencia
1. Cierra sesión con María
2. Inicia sesión con Juan (RUT: 12345678-9, contraseña: 123456)
3. Juan debe ver su propia reserva en el contador
4. María no debe ver las reservas de Juan ni viceversa

## 🔍 Verificación en Consola

Abre la consola del navegador (F12) y verás mensajes como:

```
App montada. Reservas en localStorage: [...]
Usuarios registrados: [...]
Registro exitoso: Juan Pérez
Login exitoso: María González
Reserva creada: {...}
Total de reservas: 2
Reservas del usuario: 1
Reservas guardadas en localStorage: 2
```

## 📝 Estructura de Datos

### localStorage contiene:
- `courtReservations`: Array con todas las reservas del sistema
- `registeredUsers`: Array con todos los usuarios registrados

### Cada reserva incluye:
```json
{
  "id": "R123456",
  "codigo": "AB1234",
  "usuario": "Juan Pérez",
  "canchaId": "CAN-01",
  "cancha": "Cancha Central #1",
  "deporte": "Fútbol",
  "fecha": "2025-10-20",
  "hora": "15:00",
  "precio": 45000,
  "estado": "Reservada"
}
```

### Cada usuario incluye:
```json
{
  "rut": "12345678-9",
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```

## 🐛 Solución de Problemas

### Si no ves las reservas:
1. Abre la consola (F12) y busca errores
2. Verifica que el nombre del usuario en la reserva coincida exactamente
3. Ejecuta en consola: `JSON.parse(localStorage.getItem('courtReservations'))`

### Si el login no funciona:
1. Asegúrate de registrarte primero
2. Verifica RUT y contraseña correctos
3. Ejecuta en consola: `JSON.parse(localStorage.getItem('registeredUsers'))`

### Si el contador está en 0 pero tienes reservas:
1. Verifica en consola: `app.$data.user` (debe mostrar tu usuario)
2. Verifica: `app.$data.userReservations` (debe mostrar tus reservas filtradas)
3. Cierra sesión y vuelve a iniciar

## ✨ Características Nuevas

- ✅ Sistema de usuarios completo con registro e inicio de sesión
- ✅ Cada usuario tiene su propia lista de reservas
- ✅ Las reservas se guardan permanentemente en localStorage
- ✅ El contador de reservas se actualiza automáticamente
- ✅ Validación de RUT duplicado al registrarse
- ✅ Alertas cuando RUT o contraseña son incorrectos
- ✅ Logs detallados en consola para depuración
