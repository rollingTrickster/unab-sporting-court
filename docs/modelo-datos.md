# Modelo de Datos - Sistema de Reservas de Canchas Deportivas

## Diagrama Entidad-Relación

```mermaid
erDiagram
    USER ||--o{ RESERVATION : "realiza"
    COURT ||--o{ RESERVATION : "es reservada en"
    
    USER {
        int id PK
        string email UK
        string rut UK
        string hashed_password
        string full_name
        boolean is_active
        boolean is_admin
        datetime created_at
        datetime updated_at
    }
    
    COURT {
        int id PK
        string court_id UK
        string name
        string sport
        text description
        int capacity
        float rating
        int price_per_hour
        text features
        boolean is_active
        datetime created_at
    }
    
    RESERVATION {
        int id PK
        int user_id FK
        int court_id FK
        string date
        string time
        int duration
        int total_price
        string status
        text notes
        datetime created_at
        datetime updated_at
    }
```

## Diagrama de Clases

```mermaid
classDiagram
    class User {
        +int id
        +string email
        +string rut
        +string hashed_password
        +string full_name
        +boolean is_active
        +boolean is_admin
        +datetime created_at
        +datetime updated_at
        +List~Reservation~ reservations
    }
    
    class Court {
        +int id
        +string court_id
        +string name
        +string sport
        +text description
        +int capacity
        +float rating
        +int price_per_hour
        +text features
        +boolean is_active
        +datetime created_at
        +List~Reservation~ reservations
    }
    
    class Reservation {
        +int id
        +int user_id
        +int court_id
        +string date
        +string time
        +int duration
        +int total_price
        +string status
        +text notes
        +datetime created_at
        +datetime updated_at
        +User user
        +Court court
    }
    
    User "1" --> "0..*" Reservation : tiene
    Court "1" --> "0..*" Reservation : recibe
    Reservation --> "1" User : pertenece a
    Reservation --> "1" Court : reserva
```

## Relaciones

### User → Reservation (1:N)
- Un usuario puede tener múltiples reservas
- Una reserva pertenece a un solo usuario

### Court → Reservation (1:N)
- Una cancha puede tener múltiples reservas
- Una reserva es para una sola cancha

## Tipos de Datos Enumerados

### Sport (Deporte)
- `Fútbol`
- `Tenis`
- `Pádel`

### Status (Estado de Reserva)
- `confirmed`: Confirmada
- `cancelled`: Cancelada
- `completed`: Completada

## Índices y Constraints

### User
- `email`: UNIQUE INDEX
- `rut`: UNIQUE INDEX
- `id`: PRIMARY KEY

### Court
- `court_id`: UNIQUE INDEX
- `id`: PRIMARY KEY

### Reservation
- `user_id`: FOREIGN KEY → users(id)
- `court_id`: FOREIGN KEY → courts(id)
- `id`: PRIMARY KEY

## Validaciones (Pydantic)

### UserCreate
- `rut`: string, normalizado (sin puntos, con guión antes del dígito verificador)
- `password`: min_length=6

### ReservationCreate
- `date`: formato YYYY-MM-DD
- `time`: formato HH:MM
- `duration`: 1-4 horas (ge=1, le=4)
