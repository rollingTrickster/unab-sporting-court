# Sistema de Reservas de Canchas Deportivas

## Descripción
Este es un sistema completo de reservas de canchas deportivas convertido a HTML, CSS y JavaScript vanilla. Mantiene todas las funcionalidades originales de la aplicación React/TypeScript.

## Funcionalidades

### 🔐 Autenticación
- **Login**: Acceso con RUT y contraseña
- **Registro**: Creación de cuenta con datos personales
- **Formateo automático de RUT**: Formato chileno (12.345.678-9)
- **Validación de formularios**: Campos obligatorios y validación de email

### 🏟️ Gestión de Deportes
- **Fútbol**: Canchas de fútbol 11 y fútbol 7
- **Tenis**: Canchas individuales y dobles  
- **Pádel**: Canchas techadas y al aire libre
- **Información detallada**: Capacidad, características, precios y disponibilidad

### 📅 Sistema de Reservas
- **Calendario interactivo**: Navegación por meses y selección de fechas
- **Horarios disponibles**: Slots de tiempo con precios
- **Validación de fechas**: Solo fechas futuras y disponibles
- **Confirmación de reserva**: Modal con resumen de detalles

### 📋 Gestión de Reservas
- **Mis Reservas**: Lista de reservas actuales
- **Editar reservas**: Cambiar fecha y hora
- **Cancelar reservas**: Con confirmación de seguridad
- **Estados de reserva**: Confirmada/Pendiente

### ✅ Confirmación y Seguimiento
- **Página de éxito**: Confirmación visual de la reserva
- **Código de reserva**: Código único para presentar en la cancha
- **Acciones**: Descargar, compartir, ver reservas o hacer nueva reserva
- **Información importante**: Instrucciones para el día de la reserva

## Estructura de Archivos

```
/
├── index.html          # Archivo principal HTML
├── styles.css          # Estilos CSS completos
├── app.js             # Lógica JavaScript de la aplicación
├── canchas.json       # Datos estructurados de las canchas
├── reservas.json      # Datos estructurados de las reservas
├── package.json       # Configuración del proyecto (mantenido)
└── README_VANILLA.md  # Este archivo
```

## Tecnologías Utilizadas
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con variables CSS y Grid/Flexbox
- **JavaScript ES6+**: Lógica de aplicación vanilla sin frameworks
- **Lucide Icons**: Iconografía consistente y moderna

## Características Técnicas

### 🎨 Diseño
- **Responsive**: Adaptable a dispositivos móviles y desktop
- **Tema consistente**: Variables CSS para colores y espaciado
- **Componentes reutilizables**: Sistema de clases CSS modular
- **Animaciones suaves**: Transiciones y estados hover

### 🔧 Funcionalidad
- **Estado global**: Gestión centralizada del estado de la aplicación
- **Navegación SPA**: Cambio de vistas sin recarga de página
- **Validaciones**: Formateo automático y validación de datos
- **Persistencia simulada**: Datos mantenidos durante la sesión

### 📱 Experiencia de Usuario
- **Interfaz intuitiva**: Flujo lógico de navegación
- **Feedback visual**: Estados de carga, éxito y error
- **Accesibilidad**: Etiquetas semánticas y navegación por teclado
- **Modales informativos**: Confirmaciones y detalles importantes

## Cómo Usar

### 1. Iniciar la Aplicación
- Abre `index.html` en cualquier navegador moderno
- No requiere servidor web local

### 2. Autenticación
- **Login**: Usa cualquier RUT válido y contraseña
- **Registro**: Completa todos los campos (simulado)

### 3. Reservar una Cancha
1. Selecciona un deporte en el dashboard
2. Elige una cancha disponible
3. Selecciona fecha en el calendario
4. Elige un horario disponible
5. Confirma los detalles de la reserva
6. Recibe tu código de reserva

### 4. Gestionar Reservas
- Ve a "Mis Reservas" en el dashboard
- Edita o cancela reservas existentes
- Visualiza detalles y códigos de reserva

## Datos de Prueba

### Estructura de Canchas (canchas.json)
```json
[
  {"id": "CAN-01", "deporte": "Fútbol", "nombre": "Cancha Central #1"},
  {"id": "CAN-02", "deporte": "Fútbol", "nombre": "Cancha Norte #2"},
  {"id": "CAN-03", "deporte": "Fútbol", "nombre": "Cancha Sur #3"},
  {"id": "CAN-04", "deporte": "Tenis", "nombre": "Pista Tenis #1"},
  {"id": "CAN-05", "deporte": "Tenis", "nombre": "Pista Tenis #2"},
  {"id": "CAN-06", "deporte": "Tenis", "nombre": "Pista Tenis #3"},
  {"id": "CAN-07", "deporte": "Pádel", "nombre": "Pista Pádel #1"},
  {"id": "CAN-08", "deporte": "Pádel", "nombre": "Pista Pádel #2"},
  {"id": "CAN-09", "deporte": "Pádel", "nombre": "Pista Pádel #3"}
]
```

### Estructura de Reservas (reservas.json)
```json
[
  {
    "id": "R001",
    "usuario": "Carlos Díaz",
    "canchaId": "CAN-01",
    "fecha": "2025-09-15",
    "hora": "18:00",
    "estado": "Reservada"
  }
]
```

### Deportes Disponibles
- **Fútbol**: 3 canchas (CAN-01, CAN-02, CAN-03) - 2 disponibles
- **Tenis**: 3 canchas (CAN-04, CAN-05, CAN-06) - todas disponibles  
- **Pádel**: 3 canchas (CAN-07, CAN-08, CAN-09) - 2 disponibles

### Horarios de Ejemplo
- Abierto de 8:00 a 22:00
- Algunos slots ocupados para simular realismo
- Precios variables según cancha y deporte

### Fechas No Disponibles
- Fechas pasadas
- Algunos domingos específicos
- Días 25 y 31 de cada mes (mantenimiento)

## Personalización

### Modificar Deportes
Edita el array `sportsData` en `app.js`:
```javascript
const sportsData = [
    {
        name: 'Nuevo Deporte',
        description: 'Descripción del deporte',
        icon: '🏀',
        available: 5,
        color: 'blue'
    }
];
```

### Añadir Canchas
Modifica el objeto `courtsData` en `app.js`:
```javascript
const courtsData = {
    'Nuevo Deporte': [
        {
            id: 'unique-id',
            name: 'Nombre de la Cancha',
            description: 'Descripción detallada',
            capacity: 10,
            rating: 4.5,
            pricePerHour: 30000,
            features: ['Característica 1', 'Característica 2'],
            available: true
        }
    ]
};
```

### Personalizar Estilos
Modifica las variables CSS en `styles.css`:
```css
:root {
    --primary: #tu-color-primario;
    --secondary: #tu-color-secundario;
    --radius: 0.5rem; /* Cambiar radio de bordes */
}
```

## Compatibilidad
- **Navegadores modernos**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Dispositivos móviles**: iOS Safari, Chrome Mobile, Samsung Internet
- **Funcionalidades**: ES6+, CSS Grid, Flexbox, CSS Variables

## Limitaciones de la Demo
- **Persistencia**: Los datos se pierden al recargar la página
- **Autenticación**: Simulada, acepta cualquier credencial
- **Pagos**: No integrado, solo simulación de precios
- **Notificaciones**: Alertas básicas del navegador

## Posibles Mejoras Futuras
- Integración con backend real
- Persistencia en localStorage
- Sistema de pagos online
- Notificaciones push
- Integración con calendario del dispositivo
- Geolocalización de canchas
- Sistema de reviews y comentarios

---

**Nota**: Esta es una conversión completa de la aplicación React original a vanilla HTML/CSS/JavaScript, manteniendo toda la funcionalidad y experiencia de usuario.
