// Estado global de la aplicación
// Estado global de la aplicación
const appState = {
    currentView: 'auth',
    user: null,
    selectedSport: '',
    selectedCourt: null,
    selectedDate: null,
    selectedTime: '',
    reservations: [],  // SIEMPRE empezar vacío
    editingReservation: null,
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear()
};

// Datos mock
const sportsData = [
    {
        name: 'Fútbol',
        description: 'Canchas de fútbol 11 y fútbol 7',
        icon: '⚽',
        available: 8,
        color: 'green'
    },
    {
        name: 'Tenis',
        description: 'Canchas de tenis individuales y dobles',
        icon: '🎾',
        available: 5,
        color: 'orange'
    },
    {
        name: 'Pádel',
        description: 'Canchas de pádel techadas y al aire libre',
        icon: '🏓',
        available: 6,
        color: 'purple'
    }
];

const courtsData = {
    'Fútbol': [
        {
            id: 'CAN-01',
            name: 'Cancha Central #1',
            description: 'Cancha de fútbol 11 con césped sintético de última generación',
            capacity: 22,
            rating: 4.8,
            pricePerHour: 45000,
            features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Césped Sintético', 'Marcador Electrónico'],
            available: true
        },
        {
            id: 'CAN-02',
            name: 'Cancha Norte #2',
            description: 'Cancha de fútbol 7 ideal para partidos más íntimos',
            capacity: 14,
            rating: 4.6,
            pricePerHour: 35000,
            features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Césped Natural', 'Gradas Cubiertas'],
            available: true
        },
        {
            id: 'CAN-03',
            name: 'Cancha Sur #3',
            description: 'Cancha multiuso con césped híbrido',
            capacity: 22,
            rating: 4.7,
            pricePerHour: 40000,
            features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Césped Híbrido', 'Sistema de Riego'],
            available: false
        }
    ],
    'Tenis': [
        {
            id: 'CAN-04',
            name: 'Pista Tenis #1',
            description: 'Cancha de tenis profesional con superficie de polvo de ladrillo',
            capacity: 4,
            rating: 4.9,
            pricePerHour: 25000,
            features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Polvo de Ladrillo', 'Red Profesional'],
            available: true
        },
        {
            id: 'CAN-05',
            name: 'Pista Tenis #2',
            description: 'Cancha de tenis con superficie dura, ideal para principiantes',
            capacity: 4,
            rating: 4.5,
            pricePerHour: 20000,
            features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Superficie Dura', 'Gradas'],
            available: true
        },
        {
            id: 'CAN-06',
            name: 'Pista Tenis #3',
            description: 'Cancha de tenis cubierta para jugar en cualquier clima',
            capacity: 4,
            rating: 4.8,
            pricePerHour: 30000,
            features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Techada', 'Climatizada', 'Superficie Sintética'],
            available: true
        }
    ],
    'Pádel': [
        {
            id: 'CAN-07',
            name: 'Pista Pádel #1',
            description: 'Cancha de pádel techada con cristales panorámicos',
            capacity: 4,
            rating: 4.7,
            pricePerHour: 28000,
            features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Techada', 'Cristales Panorámicos', 'Aire Acondicionado'],
            available: true
        },
        {
            id: 'CAN-08',
            name: 'Pista Pádel #2',
            description: 'Cancha de pádel al aire libre con césped sintético',
            capacity: 4,
            rating: 4.4,
            pricePerHour: 22000,
            features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Al Aire Libre', 'Césped Sintético'],
            available: true
        },
        {
            id: 'CAN-09',
            name: 'Pista Pádel #3',
            description: 'Cancha de pádel premium con sistema de sonido',
            capacity: 4,
            rating: 4.9,
            pricePerHour: 35000,
            features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Premium', 'Sistema de Sonido', 'Gradas VIP'],
            available: false
        }
    ]
};

const timeSlots = [
    { time: '08:00', available: true },
    { time: '09:00', available: false },
    { time: '10:00', available: true },
    { time: '11:00', available: true },
    { time: '12:00', available: false },
    { time: '13:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: false },
    { time: '17:00', available: true },
    { time: '18:00', available: true },
    { time: '19:00', available: true },
    { time: '20:00', available: false },
    { time: '21:00', available: true },
    { time: '22:00', available: true }
];

// Main API Functions
async function loadCanchas() {
    try {
        // En una aplicación real, esto sería una llamada a API
        // Por ahora retornamos los datos que ya tenemos
        return Object.values(courtsData).flat();
    } catch (error) {
        console.error('Error cargando canchas:', error);
        return [];
    }
}

function renderCanchas(deporte = '') {
    const courtContainer = document.getElementById('courts-grid');
    if (!courtContainer) {
        console.error('No se encontró el contenedor courts-grid');
        return;
    }
    
    let courts = [];
    if (deporte && courtsData[deporte]) {
        courts = courtsData[deporte];
        console.log(`Renderizando ${courts.length} canchas de ${deporte}`);
    } else {
        courts = Object.values(courtsData).flat();
        console.log(`Renderizando todas las canchas: ${courts.length}`);
    }
    
    courtContainer.innerHTML = courts.map(court => {
        // Determinar el deporte de la cancha
        const sport = Object.keys(courtsData).find(key => 
            courtsData[key].some(c => c.id === court.id)
        );
        
        // Colores y configuración por deporte
        const sportConfig = {
            'Fútbol': { color: '#22c55e', emoji: '⚽', bg: '#22c55e' },
            'Tenis': { color: '#f97316', emoji: '🎾', bg: '#f97316' },
            'Pádel': { color: '#8b5cf6', emoji: '🏓', bg: '#8b5cf6' }
        };
        
        const config = sportConfig[sport] || { color: '#6b7280', emoji: '🏟️', bg: '#6b7280' };
        
        return `
            <div class="card h-100" style="width: 18rem; cursor: pointer;" onclick="selectCourt(${JSON.stringify(court).replace(/"/g, '&quot;')})">
                <div class="position-relative">
                    <div class="card-img-top d-flex align-items-center justify-content-center" 
                         style="height: 140px; background: linear-gradient(135deg, ${config.bg}20, ${config.bg}40); border-bottom: 1px solid #dee2e6;">
                        <div class="text-center">
                            <div style="font-size: 3rem; margin-bottom: 0.5rem;">${config.emoji}</div>
                            <h6 class="mb-0 fw-semibold" style="color: ${config.color};">${sport}</h6>
                        </div>
                    </div>
                    ${!court.available ? '<div class="position-absolute top-0 end-0 m-2"><span class="badge bg-secondary">No Disponible</span></div>' : ''}
                </div>
                
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold mb-2">${court.name}</h5>
                    <p class="card-text text-muted small mb-3">${court.description}</p>
                    
                    <div class="court-details mb-3">
                        <div class="d-flex align-items-center mb-2">
                            <i data-lucide="users" style="width: 16px; height: 16px;" class="me-2 text-muted"></i>
                            <span class="small text-muted">Hasta ${court.capacity} personas</span>
                        </div>
                        <div class="d-flex align-items-center mb-2">
                            <i data-lucide="star" style="width: 16px; height: 16px; color: #fbbf24; fill: currentColor;" class="me-2"></i>
                            <span class="small text-muted">${court.rating} estrellas</span>
                        </div>
                    </div>
                    
                    <div class="features mb-3">
                        <div class="d-flex flex-wrap gap-1">
                            ${court.features.slice(0, 2).map(feature => 
                                `<span class="badge bg-light text-dark small">${feature}</span>`
                            ).join('')}
                            ${court.features.length > 2 ? `<span class="badge bg-light text-muted small">+${court.features.length - 2}</span>` : ''}
                        </div>
                    </div>
                    
                    <div class="mt-auto">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <div class="availability-status">
                                <div class="d-flex align-items-center">
                                    <div class="availability-dot me-2" 
                                         style="width: 8px; height: 8px; border-radius: 50%; background-color: ${court.available ? '#22c55e' : '#ef4444'};"></div>
                                    <span class="small ${court.available ? 'text-success' : 'text-danger'}">${court.available ? 'Disponible' : 'No disponible'}</span>
                                </div>
                            </div>
                            <div class="price-display text-end">
                                <div class="fw-bold" style="color: ${config.color};">${formatPrice(court.pricePerHour)}</div>
                                <div class="small text-muted">por hora</div>
                            </div>
                        </div>
                        
                        <a href="#" 
                           class="btn ${court.available ? 'btn-dark' : 'btn-outline-secondary'} w-100" 
                           ${!court.available ? 'disabled' : ''}
                           onclick="event.preventDefault(); event.stopPropagation(); selectCourt(${JSON.stringify(court).replace(/"/g, '&quot;')})">
                            ${court.available ? 'Reservar' : 'No Disponible'}
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function reservarCancha(canchaId, fecha, hora, usuario) {
    console.log('🎯 CREANDO RESERVA REAL (no validación):', { canchaId, fecha, hora, usuario });
    
    // NO VALIDAR AQUÍ - la validación ya se hizo antes
    // Esta función solo debe CREAR la reserva cuando estamos seguros
    
    const reservationId = generateReservationId();
    const reservation = {
        id: reservationId,
        usuario: usuario || appState.user?.name || 'Usuario',
        canchaId: canchaId,
        fecha: fecha,
        hora: hora,
        estado: 'Reservada',
        fechaCreacion: new Date().toISOString()
    };
    
    console.log('✅ Agregando reserva al estado:', reservation);
    appState.reservations.push(reservation);
    console.log('📋 Total reservas después de agregar:', appState.reservations.length);
    
    return { success: true, reservation: reservation };
}

function validarDisponibilidad(canchaId, fecha, hora) {
    console.log('🔍 Validando disponibilidad:', { canchaId, fecha, hora });
    
    // DEPURACIÓN: Verificar si hay reservas que no deberían existir
    if (appState.reservations.length > 0) {
        console.warn('⚠️ SE DETECTARON RESERVAS INESPERADAS:');
        appState.reservations.forEach((res, index) => {
            console.warn(`   ${index + 1}. ID: ${res.id}, Cancha: ${res.canchaId}, Fecha: ${res.fecha}, Hora: ${res.hora}`);
        });
    }
    
    // 1. Verificar si la fecha es válida (no pasada y disponible)
    const selectedDate = new Date(fecha + 'T12:00:00');
    const dateAvailable = isDateAvailable(selectedDate);
    console.log('📅 Fecha disponible:', dateAvailable, 'para fecha:', selectedDate);
    
    if (!dateAvailable) {
        console.log('❌ Fecha no disponible - motivo: fecha no válida');
        return false;
    }
    
    // 2. Verificar si la cancha existe y está disponible
    const allCourts = Object.values(courtsData).flat();
    const court = allCourts.find(c => c.id === canchaId);
    console.log('🏟️ Cancha encontrada:', court);
    
    if (!court) {
        console.log('❌ Cancha no encontrada');
        return false;
    }
    
    if (!court.available) {
        console.log('❌ Cancha marcada como no disponible en datos:', court.available);
        return false;
    }
    
    // 3. Verificar si el horario no está ocupado por otra reserva
    const existingReservation = appState.reservations.find(r => 
        r.canchaId === canchaId && 
        r.fecha === fecha && 
        r.hora === hora &&
        r.estado !== 'Cancelada'
    );
    
    console.log('📋 Reservas existentes:', appState.reservations);
    console.log('📋 Reserva conflictiva encontrada:', existingReservation);
    
    if (existingReservation) {
        console.log('❌ Horario ya ocupado por reserva:', existingReservation);
        return false;
    }
    
    console.log('✅ ¡Horario DISPONIBLE! Todas las validaciones pasaron');
    return true;
}

function listarReservas(filtros = {}) {
    let reservas = [...appState.reservations];
    
    // Aplicar filtros
    if (filtros.usuario) {
        reservas = reservas.filter(r => r.usuario.toLowerCase().includes(filtros.usuario.toLowerCase()));
    }
    
    if (filtros.estado) {
        reservas = reservas.filter(r => r.estado === filtros.estado);
    }
    
    if (filtros.deporte) {
        const cortesDeporte = Object.values(courtsData).flat()
            .filter(c => c.id.includes(filtros.deporte) || 
                        Object.keys(courtsData).find(key => 
                            key === filtros.deporte && courtsData[key].some(court => court.id === c.id)
                        ));
        const courtIds = cortesDeporte.map(c => c.id);
        reservas = reservas.filter(r => courtIds.includes(r.canchaId));
    }
    
    if (filtros.fecha) {
        reservas = reservas.filter(r => r.fecha === filtros.fecha);
    }
    
    // Ordenar por fecha y hora
    reservas.sort((a, b) => {
        const dateCompare = new Date(a.fecha) - new Date(b.fecha);
        if (dateCompare !== 0) return dateCompare;
        return a.hora.localeCompare(b.hora);
    });
    
    return reservas;
}

function cancelarReserva(id) {
    const reservationIndex = appState.reservations.findIndex(r => r.id === id);
    if (reservationIndex === -1) {
        return { success: false, message: 'Reserva no encontrada' };
    }
    
    appState.reservations[reservationIndex].estado = 'Cancelada';
    appState.reservations[reservationIndex].fechaCancelacion = new Date().toISOString();
    
    return { success: true, message: 'Reserva cancelada exitosamente' };
}

function filtrarPorDeporte(deporte) {
    appState.selectedSport = deporte;
    renderCanchas(deporte);
    renderReservations();
}

function filtrarPorFecha(fecha) {
    const reservasFiltradas = listarReservas({ fecha: fecha });
    
    // Actualizar la vista de reservas con el filtro aplicado
    const reservationsContainer = document.getElementById('reservations-content');
    if (!reservationsContainer) return;
    
    if (reservasFiltradas.length === 0) {
        reservationsContainer.innerHTML = `
            <div class="empty-state">
                <i data-lucide="calendar-x"></i>
                <h3>No hay reservas para ${formatDate(new Date(fecha))}</h3>
                <p>No se encontraron reservas para la fecha seleccionada.</p>
                <button class="btn btn-outline" onclick="renderReservations()">
                    Ver todas las reservas
                </button>
            </div>
        `;
    } else {
        reservationsContainer.innerHTML = `
            <div class="reservations-list">
                ${reservasFiltradas.map(reservation => {
                    const court = Object.values(courtsData).flat().find(c => c.id === reservation.canchaId);
                    const sport = Object.keys(courtsData).find(key => 
                        courtsData[key].some(c => c.id === reservation.canchaId)
                    );
                    
                    return `
                        <div class="reservation-card">
                            <div class="reservation-content">
                                <div class="reservation-left">
                                    <div class="reservation-emoji">${getSportIcon(sport)}</div>
                                    <div class="reservation-details">
                                        <h3>${court ? court.name : 'Cancha no encontrada'}</h3>
                                        <p class="sport">${sport}</p>
                                        <div class="reservation-meta">
                                            <div class="meta-item">
                                                <i data-lucide="calendar"></i>
                                                <span>${formatDate(new Date(reservation.fecha))}</span>
                                            </div>
                                            <div class="meta-item">
                                                <i data-lucide="clock"></i>
                                                <span>${reservation.hora}</span>
                                            </div>
                                            <div class="meta-item">
                                                <i data-lucide="hash"></i>
                                                <span>ID: ${reservation.canchaId}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="reservation-right">
                                    <span class="badge ${reservation.estado === 'Reservada' ? 'badge-default' : 'badge-secondary'}">
                                        ${reservation.estado}
                                    </span>
                                    ${reservation.estado !== 'Cancelada' ? `
                                        <div class="reservation-actions">
                                            <button class="btn btn-outline btn-sm" onclick="editReservation('${reservation.id}')">
                                                Cambiar
                                            </button>
                                            <button class="btn btn-destructive btn-sm" onclick="showCancelDialog('${reservation.id}')">
                                                Cancelar
                                            </button>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Additional utility functions for filtering
function filtrarReservasPorEstado(estado) {
    return listarReservas({ estado: estado });
}

function obtenerCanchasPorDeporte(deporte) {
    return courtsData[deporte] || [];
}

function obtenerReservasDeHoy() {
    const hoy = new Date().toISOString().split('T')[0];
    return listarReservas({ fecha: hoy });
}

function obtenerProximasReservas() {
    const hoy = new Date();
    return listarReservas().filter(reserva => {
        const fechaReserva = new Date(reserva.fecha);
        return fechaReserva >= hoy;
    });
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(price);
}

function formatDate(date) {
    return date.toLocaleDateString('es-CL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatRut(value) {
    const cleanRut = value.replace(/[^0-9kK]/g, '');
    if (cleanRut.length <= 1) return cleanRut;
    
    const rutBody = cleanRut.slice(0, -1);
    const rutDv = cleanRut.slice(-1);
    
    let formattedRut = rutBody.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (rutDv) {
        formattedRut += `-${rutDv}`;
    }
    
    return formattedRut;
}

function getSportIcon(sport) {
    switch (sport) {
        case 'Fútbol': return '⚽';
        case 'Tenis': return '🎾';
        case 'Pádel': return '🏓';
        default: return '🏃';
    }
}

function isDateAvailable(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    console.log('📅 isDateAvailable - Comparando fechas:');
    console.log('    Fecha seleccionada:', date);
    console.log('    Fecha de hoy:', today);
    console.log('    ¿Es fecha pasada?:', date < today);
    
    // No permitir fechas pasadas
    if (date < today) {
        console.log('❌ Fecha rechazada: es fecha pasada');
        return false;
    }
    
    // No permitir fechas muy lejanas (más de 30 días)
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30);
    console.log('    Fecha máxima permitida:', maxDate);
    console.log('    ¿Es fecha muy lejana?:', date > maxDate);
    
    if (date > maxDate) {
        console.log('❌ Fecha rechazada: es muy lejana (más de 30 días)');
        return false;
    }
    
    const dayOfMonth = date.getDate();
    console.log('    Día del mes:', dayOfMonth);
    
    // Bloquear solo algunos días específicos para mantenimiento (opcional)
    // Por ejemplo, el día 25 de cada mes
    if (dayOfMonth === 25) {
        console.log('❌ Fecha rechazada: día de mantenimiento (25)');
        return false;
    }
    
    console.log('✅ Fecha VÁLIDA - todas las comprobaciones pasaron');
    return true;
}

// Generate unique reservation ID
function generateReservationId() {
    const existingIds = appState.reservations.map(r => r.id);
    let counter = 1;
    let newId;
    
    do {
        newId = `R${counter.toString().padStart(3, '0')}`;
        counter++;
    } while (existingIds.includes(newId));
    
    return newId;
}

// DOM manipulation functions
function showSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    appState.currentView = sectionId.replace('-section', '');
}

function showTab(tabName) {
    // Update nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('#dashboard-section .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

function showAuthTab(tabName) {
    document.querySelectorAll('.tab-trigger').forEach(trigger => {
        trigger.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    document.querySelectorAll('#auth-section .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Auth functions
function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rut = formData.get('rut') || document.getElementById('login-rut').value;
    
    appState.user = {
        rut: rut,
        nombre: 'Usuario',
        apellido: 'Demo',
        email: 'usuario@example.com'
    };
    
    document.getElementById('user-name').textContent = `${appState.user.nombre} ${appState.user.apellido}`;
    showSection('dashboard-section');
    renderSports();
}

function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    appState.user = {
        rut: document.getElementById('register-rut').value,
        nombre: document.getElementById('register-nombre').value,
        apellido: document.getElementById('register-apellido').value,
        email: document.getElementById('register-email').value
    };
    
    document.getElementById('user-name').textContent = `${appState.user.nombre} ${appState.user.apellido}`;
    showSection('dashboard-section');
    renderSports();
}

function handleLogout() {
    appState.user = null;
    appState.selectedSport = '';
    appState.selectedCourt = null;
    appState.selectedDate = null;
    appState.selectedTime = '';
    appState.reservations = [];
    appState.editingReservation = null;
    
    // Reset forms
    document.getElementById('login-form').reset();
    document.getElementById('register-form').reset();
    
    showSection('auth-section');
}

// Sports rendering
function renderSports() {
    const grid = document.getElementById('sports-grid');
    grid.innerHTML = '';
    
    sportsData.forEach(sport => {
        const sportCard = document.createElement('div');
        sportCard.className = 'card h-100';
        sportCard.style.width = '18rem';
        sportCard.style.cursor = 'pointer';
        
        // Colores específicos para cada deporte basados en la imagen
        const sportColors = {
            'Fútbol': '#22c55e',
            'Tenis': '#f97316', 
            'Pádel': '#8b5cf6'
        };
        
        sportCard.innerHTML = `
            <div class="card-body d-flex flex-column">
                <div class="d-flex align-items-center mb-3">
                    <div class="sport-icon me-3" style="font-size: 2rem; color: ${sportColors[sport.name]};">
                        ${sport.icon}
                    </div>
                    <div class="sport-info">
                        <h5 class="card-title mb-1 fw-bold">${sport.name}</h5>
                        <p class="card-text text-muted small mb-0">${sport.description}</p>
                    </div>
                </div>
                
                <div class="mt-auto">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <div class="d-flex align-items-center">
                            <div class="availability-dot me-2" 
                                 style="width: 8px; height: 8px; border-radius: 50%; background-color: ${sportColors[sport.name]};"></div>
                            <span class="text-muted small">${sport.available} canchas disponibles</span>
                        </div>
                    </div>
                    
                    <button class="btn btn-dark w-100" onclick="selectSport('${sport.name}')">
                        Ver Canchas
                    </button>
                </div>
            </div>
        `;
        
        sportCard.onclick = (e) => {
            if (e.target.tagName !== 'BUTTON') {
                selectSport(sport.name);
            }
        };
        
        grid.appendChild(sportCard);
    });
}

function selectSport(sportName) {
    appState.selectedSport = sportName;
    document.getElementById('sport-icon').textContent = getSportIcon(sportName);
    document.getElementById('sport-title').textContent = `Canchas de ${sportName}`;
    showSection('court-selection-section');
    renderCourts();
}

// Courts rendering
function renderCourts() {
    renderCanchas(appState.selectedSport);
}

function selectCourt(court) {
    appState.selectedCourt = court;
    document.getElementById('calendar-sport-icon').textContent = getSportIcon(appState.selectedSport);
    document.getElementById('calendar-court-title').textContent = 
        (appState.editingReservation ? 'Editar Reserva - ' : '') + court.name;
    
    showSection('calendar-section');
    renderCalendar();
    renderCourtInfo();
}

// Calendar rendering
function renderCalendar() {
    const calendar = document.getElementById('calendar-widget');
    const today = new Date();
    const firstDay = new Date(appState.currentYear, appState.currentMonth, 1);
    const lastDay = new Date(appState.currentYear, appState.currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    calendar.innerHTML = `
        <div class="calendar-header">
            <div class="calendar-nav prev">
                <button class="calendar-nav-btn" onclick="changeMonth(-1)">
                    <i data-lucide="chevron-left"></i>
                </button>
            </div>
            <div class="calendar-title">
                ${monthNames[appState.currentMonth]} ${appState.currentYear}
            </div>
            <div class="calendar-nav next">
                <button class="calendar-nav-btn" onclick="changeMonth(1)">
                    <i data-lucide="chevron-right"></i>
                </button>
            </div>
        </div>
        <table class="calendar-table">
            <thead>
                <tr>
                    <th class="calendar-header-cell">Dom</th>
                    <th class="calendar-header-cell">Lun</th>
                    <th class="calendar-header-cell">Mar</th>
                    <th class="calendar-header-cell">Mié</th>
                    <th class="calendar-header-cell">Jue</th>
                    <th class="calendar-header-cell">Vie</th>
                    <th class="calendar-header-cell">Sáb</th>
                </tr>
            </thead>
            <tbody id="calendar-body"></tbody>
        </table>
    `;
    
    const calendarBody = document.getElementById('calendar-body');
    let currentDate = new Date(startDate.getTime()); // Usar getTime() para evitar problemas de referencia
    
    for (let week = 0; week < 6; week++) {
        const row = document.createElement('tr');
        
        for (let day = 0; day < 7; day++) {
            const cell = document.createElement('td');
            cell.className = 'calendar-cell';
            
            const isCurrentMonth = currentDate.getMonth() === appState.currentMonth;
            const isToday = currentDate.toDateString() === today.toDateString();
            const isSelected = appState.selectedDate && 
                currentDate.toDateString() === appState.selectedDate.toDateString();
            const isAvailable = isDateAvailable(currentDate);
            
            let classes = ['calendar-day'];
            if (!isCurrentMonth) classes.push('outside');
            if (isToday) classes.push('today');
            if (isSelected) classes.push('selected');
            if (!isAvailable) classes.push('disabled');
            
            // Crear una nueva fecha para evitar problemas de referencia
            const cellDate = new Date(currentDate.getTime());
            const dateStr = cellDate.toISOString().split('T')[0];
            
            cell.innerHTML = `
                <button 
                    class="${classes.join(' ')}" 
                    onclick="selectDate('${dateStr}')"
                    ${!isAvailable ? 'disabled' : ''}
                    data-date="${dateStr}"
                >
                    ${currentDate.getDate()}
                </button>
            `;
            
            row.appendChild(cell);
            
            // Avanzar al siguiente día de forma segura
            currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        }
        
        calendarBody.appendChild(row);
    }
    
    lucide.createIcons();
    updateSelectedDateInfo();
}

function changeMonth(direction) {
    appState.currentMonth += direction;
    
    if (appState.currentMonth > 11) {
        appState.currentMonth = 0;
        appState.currentYear++;
    } else if (appState.currentMonth < 0) {
        appState.currentMonth = 11;
        appState.currentYear--;
    }
    
    renderCalendar();
}

function selectDate(dateStr) {
    console.log('Fecha seleccionada:', dateStr);
    appState.selectedDate = new Date(dateStr + 'T12:00:00'); // Agregar tiempo para evitar problemas de zona horaria
    console.log('Fecha parseada:', appState.selectedDate);
    renderCalendar();
    renderTimeSlots();
    updateSelectedDateInfo();
}

function updateSelectedDateInfo() {
    const info = document.getElementById('selected-date-info');
    const description = document.getElementById('time-slots-description');
    
    if (appState.selectedDate) {
        info.style.display = 'block';
        info.innerHTML = `
            <div class="label">Fecha seleccionada:</div>
            <div class="date">${formatDate(appState.selectedDate)}</div>
        `;
        description.textContent = `Horarios para ${formatDate(appState.selectedDate)}`;
    } else {
        info.style.display = 'none';
        description.textContent = 'Selecciona una fecha para ver los horarios';
    }
}

function renderTimeSlots() {
    const grid = document.getElementById('time-slots-grid');
    const noDateSelected = document.getElementById('no-date-selected');
    
    if (!appState.selectedDate) {
        grid.style.display = 'none';
        noDateSelected.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    noDateSelected.style.display = 'none';
    grid.innerHTML = '';
    
    const fechaSeleccionada = appState.selectedDate.toISOString().split('T')[0];
    
    // Generar horarios dinámicamente en lugar de usar timeSlots mock
    const horariosDisponibles = [
        '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
        '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
    ];
    
    horariosDisponibles.forEach(hora => {
        // Usar la nueva función validarDisponibilidad para cada horario
        const disponible = validarDisponibilidad(appState.selectedCourt.id, fechaSeleccionada, hora);
        console.log(`🕐 Hora ${hora} - Disponible: ${disponible}`);
        
        const timeSlot = document.createElement('button');
        timeSlot.className = `time-slot ${!disponible ? 'disabled' : ''}`;
        timeSlot.disabled = !disponible;
        
        // Solo permitir click si está disponible
        if (disponible) {
            timeSlot.onclick = () => selectTime(hora);
        } else {
            timeSlot.onclick = () => {
                console.log('❌ Click bloqueado en horario no disponible:', hora);
                showUnavailableMessage();
            };
        }
        
        timeSlot.innerHTML = `
            <span class="time">${hora}</span>
            <span class="price">
                ${disponible ? formatPrice(appState.selectedCourt.pricePerHour) : 'Ocupado'}
            </span>
        `;
        
        grid.appendChild(timeSlot);
    });
}

function selectTime(time) {
    console.log('⏰ Seleccionando hora DISPONIBLE:', time);
    
    // Solo procesar si el horario ya fue validado como disponible en renderTimeSlots
    appState.selectedTime = time;
    console.log('✅ Tiempo seleccionado exitosamente, mostrando confirmación:', time);
    
    // Update button states
    document.querySelectorAll('.time-slot').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Find and select the clicked button
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        if (slot.textContent.includes(time) && !slot.disabled) {
            slot.classList.add('selected');
        }
    });
    
    // Show reserve button
    const reserveBtn = document.querySelector('.reserve-btn');
    if (reserveBtn) {
        reserveBtn.style.display = 'block';
        reserveBtn.disabled = false;
    }
    
    showConfirmDialog();
    return true;
}

function showUnavailableMessage() {
    // Crear un modal de error temporal
    const errorModal = document.createElement('div');
    errorModal.className = 'modal active';
    errorModal.innerHTML = `
        <div class="modal-content" style="max-width: 400px;">
            <div class="modal-header">
                <h3 class="modal-title text-danger">
                    <i data-lucide="alert-triangle"></i>
                    Horario No Disponible
                </h3>
                <p class="modal-description">Este horario ya está ocupado o la cancha no está disponible. Por favor selecciona una fecha u horario diferente.</p>
            </div>
            <div class="modal-footer justify-content-center">
                <button class="btn btn-primary border" onclick="closeUnavailableMessage()">
                    <i data-lucide="calendar"></i>
                    Seleccionar Otra Fecha
                </button>
            </div>
        </div>
    `;
    errorModal.id = 'unavailable-modal';
    document.body.appendChild(errorModal);
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function closeUnavailableMessage() {
    const modal = document.getElementById('unavailable-modal');
    if (modal) {
        modal.remove();
    }
    // Limpiar selección de tiempo para forzar nueva selección
    appState.selectedTime = '';
    // Mantener la fecha seleccionada para que el usuario pueda elegir otro horario
    // o puede cambiar de fecha si lo desea
}

function renderCourtInfo() {
    const content = document.getElementById('court-info-content');
    const court = appState.selectedCourt;
    
    content.innerHTML = `
        <div class="court-info">
            <div>
                <h4 class="card-title">${court.name}</h4>
                <p class="court-description">${court.description}</p>
                <div class="court-stats-list">
                    <div class="court-stat">
                        <span class="label">Capacidad:</span>
                        <span class="value">${court.capacity} personas máx.</span>
                    </div>
                    <div class="court-stat">
                        <span class="label">Precio por hora:</span>
                        <span class="value price">${formatPrice(court.pricePerHour)}</span>
                    </div>
                </div>
            </div>
            <div class="features-section">
                <h5>Características:</h5>
                <div class="features-list">
                    ${court.features.map(feature => 
                        `<span class="badge badge-secondary">${feature}</span>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
}

// Modal functions
function showConfirmDialog() {
    const modal = document.getElementById('confirm-dialog');
    const details = document.getElementById('confirm-details');
    
    // Validar disponibilidad antes de mostrar el diálogo (solo para nuevas reservas)
    if (!appState.editingReservation) {
        const fechaSeleccionada = appState.selectedDate.toISOString().split('T')[0];
        const disponible = validarDisponibilidad(appState.selectedCourt.id, fechaSeleccionada, appState.selectedTime);
        
        if (!disponible) {
            console.log('Intento de reserva en horario no disponible bloqueado');
            showUnavailableMessage();
            return false; // Detener completamente el proceso
        }
    }
    
    details.innerHTML = `
        <div class="confirmation-details">
            <div class="detail-row">
                <span class="label">Deporte:</span>
                <span class="value">${appState.selectedSport}</span>
            </div>
            <div class="detail-row">
                <span class="label">Cancha:</span>
                <span class="value">${appState.selectedCourt.name}</span>
            </div>
            <div class="detail-row">
                <span class="label">Fecha:</span>
                <span class="value">${formatDate(appState.selectedDate)}</span>
            </div>
            <div class="detail-row">
                <span class="label">Hora:</span>
                <span class="value">${appState.selectedTime}</span>
            </div>
            <div class="detail-row total">
                <span class="label">Total:</span>
                <span class="value">${formatPrice(appState.selectedCourt.pricePerHour)}</span>
            </div>
        </div>
    `;
    
    // Update confirm button text
    const confirmBtn = document.getElementById('confirm-reservation');
    confirmBtn.innerHTML = `
        <i data-lucide="check"></i>
        ${appState.editingReservation ? 'Actualizar Reserva' : 'Confirmar Reserva'}
    `;
    
    modal.classList.add('active');
    return true;
}

function hideConfirmDialog() {
    document.getElementById('confirm-dialog').classList.remove('active');
}

function confirmReservation() {
    const usuario = `${appState.user.nombre} ${appState.user.apellido}`;
    const fecha = appState.selectedDate.toISOString().split('T')[0];
    
    if (appState.editingReservation) {
        // Editar reserva existente
        const index = appState.reservations.findIndex(r => r.id === appState.editingReservation.id);
        if (index !== -1) {
            appState.reservations[index] = {
                ...appState.reservations[index],
                usuario: usuario,
                canchaId: appState.selectedCourt.id,
                fecha: fecha,
                hora: appState.selectedTime,
                // Datos adicionales para la interfaz
                sport: appState.selectedSport,
                court: appState.selectedCourt.name,
                price: appState.selectedCourt.pricePerHour,
                status: 'confirmed'
            };
        }
        appState.editingReservation = null;
    } else {
        // Nueva reserva - validar disponibilidad una vez más antes de confirmar
        console.log('🔄 Validación final antes de crear reserva...');
        if (!validarDisponibilidad(appState.selectedCourt.id, fecha, appState.selectedTime)) {
            console.error('❌ Reserva bloqueada: cancha no disponible');
            hideConfirmDialog(); // Cerrar modal de confirmación
            showUnavailableMessage(); // Mostrar error personalizado
            return false;
        }
        
        console.log('✅ Validación exitosa, procediendo a crear reserva...');
        const result = reservarCancha(appState.selectedCourt.id, fecha, appState.selectedTime, usuario);
        if (!result.success) {
            console.error('❌ Error al crear reserva');
            hideConfirmDialog(); // Cerrar modal de confirmación
            showUnavailableMessage(); // Mostrar error personalizado
            return false;
        }
        
        console.log('🎉 Reserva creada exitosamente:', result.reservation);
        
        // Agregar datos adicionales para la interfaz
        result.reservation.sport = appState.selectedSport;
        result.reservation.court = appState.selectedCourt.name;
        result.reservation.price = appState.selectedCourt.pricePerHour;
        result.reservation.status = 'confirmed';
    }
    
    hideConfirmDialog();
    showSection('success-section');
    
    // Actualizar los time slots para reflejar la nueva reserva
    renderTimeSlots();
    console.log('🔄 Time slots actualizados después de la reserva');
    
    // Obtener la reserva actualizada para mostrar en success
    const reservation = appState.reservations[appState.reservations.length - 1];
    renderReservationSuccess(reservation);
}

function showCancelDialog(reservationId) {
    const modal = document.getElementById('cancel-dialog');
    const details = document.getElementById('cancel-details');
    const reservation = appState.reservations.find(r => r.id === reservationId);
    
    if (reservation) {
        details.innerHTML = `
            <div class="confirmation-details">
                <div class="detail-row">
                    <span class="label">ID Cancha:</span>
                    <span class="value">${reservation.canchaId}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Cancha:</span>
                    <span class="value">${reservation.court}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Fecha:</span>
                    <span class="value">${formatDate(new Date(reservation.fecha || reservation.date))}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Hora:</span>
                    <span class="value">${reservation.hora || reservation.time}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Estado:</span>
                    <span class="value">${reservation.estado || reservation.status}</span>
                </div>
            </div>
        `;
        
        document.getElementById('confirm-cancel').onclick = () => {
            const result = cancelarReserva(reservationId);
            if (result.success) {
                document.getElementById('cancel-dialog').classList.remove('active');
                renderReservations();
            } else {
                alert(result.message);
            }
        };
        
        modal.classList.add('active');
    }
}

function hideCancelDialog() {
    document.getElementById('cancel-dialog').classList.remove('active');
}

// Reservations rendering
function renderReservations(filtros = {}) {
    const content = document.getElementById('reservations-content');
    const actions = document.getElementById('reservation-actions');
    
    const reservas = listarReservas(filtros);
    
    if (reservas.length === 0) {
        content.innerHTML = `
            <div class="empty-state">
                <i data-lucide="calendar"></i>
                <h3>No tienes reservas</h3>
                <p>Comienza reservando una cancha para tu deporte favorito</p>
                <button class="btn btn-primary" onclick="showTab('sports')">
                    Hacer una Reserva
                </button>
            </div>
        `;
        actions.style.display = 'none';
    } else {
        actions.style.display = 'flex';
        content.innerHTML = `
            <div class="reservations-list">
                ${reservas.map(reservation => {
                    const court = Object.values(courtsData).flat().find(c => c.id === reservation.canchaId);
                    const sport = Object.keys(courtsData).find(key => 
                        courtsData[key].some(c => c.id === reservation.canchaId)
                    );
                    
                    return `
                        <div class="reservation-card">
                            <div class="reservation-content">
                                <div class="reservation-left">
                                    <div class="reservation-emoji">${getSportIcon(sport)}</div>
                                    <div class="reservation-details">
                                        <h3>${court ? court.name : reservation.court || 'Cancha no encontrada'}</h3>
                                        <p class="sport">${sport || reservation.sport}</p>
                                        <div class="reservation-meta">
                                            <div class="meta-item">
                                                <i data-lucide="calendar"></i>
                                                <span>${formatDate(new Date(reservation.fecha || reservation.date))}</span>
                                            </div>
                                            <div class="meta-item">
                                                <i data-lucide="clock"></i>
                                                <span>${reservation.hora || reservation.time}</span>
                                            </div>
                                            <div class="meta-item">
                                                <i data-lucide="hash"></i>
                                                <span>ID: ${reservation.canchaId || reservation.id}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="reservation-right">
                                    <span class="badge ${reservation.estado === 'Reservada' || reservation.status === 'confirmed' ? 'badge-default' : 'badge-secondary'}">
                                        ${reservation.estado || (reservation.status === 'confirmed' ? 'Confirmada' : 'Pendiente')}
                                    </span>
                                    ${reservation.estado !== 'Cancelada' && reservation.status !== 'cancelled' ? `
                                        <div class="reservation-actions">
                                            <button class="btn btn-outline btn-sm" onclick="editReservation('${reservation.id}')">
                                                Cambiar
                                            </button>
                                            <button class="btn btn-destructive btn-sm" onclick="showCancelDialog('${reservation.id}')">
                                                Cancelar
                                            </button>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        // Update action buttons
        document.getElementById('change-time-btn').onclick = () => {
            if (reservas.length > 0) {
                editReservation(reservas[0].id);
            }
        };
        
        document.getElementById('cancel-reservation-btn').onclick = () => {
            if (reservas.length > 0) {
                showCancelDialog(reservas[0].id);
            }
        };
    }
    
    lucide.createIcons();
}

function editReservation(reservationId) {
    const reservation = appState.reservations.find(r => r.id === reservationId);
    if (reservation) {
        appState.editingReservation = reservation;
        appState.selectedSport = reservation.sport;
        
        // Buscar la cancha usando el canchaId
        let foundCourt = null;
        for (const sport in courtsData) {
            foundCourt = courtsData[sport].find(court => court.id === reservation.canchaId);
            if (foundCourt) break;
        }
        
        // Si no se encuentra la cancha, crear una básica para edición
        if (!foundCourt) {
            foundCourt = {
                id: reservation.canchaId || 'edit-' + reservation.id,
                name: reservation.court,
                description: `Cancha de ${reservation.sport.toLowerCase()}`,
                capacity: reservation.sport === 'Fútbol' ? 22 : 4,
                rating: 4.5,
                pricePerHour: reservation.price,
                features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED'],
                available: true
            };
        }
        
        appState.selectedCourt = foundCourt;
        appState.selectedDate = new Date(reservation.fecha || reservation.date);
        appState.currentMonth = appState.selectedDate.getMonth();
        appState.currentYear = appState.selectedDate.getFullYear();
        
        selectCourt(foundCourt);
    }
}

function renderReservationSuccess(reservation) {
    const details = document.getElementById('reservation-details');
    const code = document.getElementById('reservation-code');
    
    details.innerHTML = `
        <div class="reservation-header">
            <h3>Detalles de la Reserva</h3>
            <span class="badge badge-default" style="background-color: var(--color-green-600);">
                ${reservation.estado || 'Confirmada'}
            </span>
        </div>
        
        <div class="reservation-sport">
            <span class="emoji">${getSportIcon(reservation.sport)}</span>
            <div>
                <p class="name">${reservation.court}</p>
                <p class="type">${reservation.sport} (ID: ${reservation.canchaId})</p>
            </div>
        </div>
        
        <div class="reservation-info">
            <div class="info-item">
                <i data-lucide="calendar"></i>
                <div>
                    <p class="label">Fecha</p>
                    <p class="value">${formatDate(new Date(reservation.fecha || reservation.date))}</p>
                </div>
            </div>
            
            <div class="info-item">
                <i data-lucide="clock"></i>
                <div>
                    <p class="label">Hora</p>
                    <p class="value">${reservation.hora || reservation.time}</p>
                </div>
            </div>
        </div>
        
        <div class="reservation-total">
            <span class="label">Total Pagado</span>
            <span class="amount">${formatPrice(reservation.price)}</span>
        </div>
    `;
    
    code.innerHTML = `
        <p class="label">Código de Reserva</p>
        <p class="code">${reservation.id}</p>
        <p class="note">Presenta este código al llegar a la cancha</p>
    `;
    
    lucide.createIcons();
}

// Navigation functions
function goToReservations() {
    showSection('dashboard-section');
    showTab('reservations');
    renderReservations();
}

function makeNewReservation() {
    appState.selectedSport = '';
    appState.selectedCourt = null;
    appState.selectedDate = null;
    appState.selectedTime = '';
    appState.editingReservation = null;
    
    showSection('dashboard-section');
    showTab('sports');
}

// JSON Export functions
function exportCanchasData() {
    const canchas = [];
    for (const sport in courtsData) {
        courtsData[sport].forEach(court => {
            canchas.push({
                id: court.id,
                deporte: sport,
                nombre: court.name
            });
        });
    }
    return canchas;
}

function exportReservasData() {
    return appState.reservations.map(reservation => ({
        id: reservation.id,
        usuario: reservation.usuario,
        canchaId: reservation.canchaId,
        fecha: reservation.fecha,
        hora: reservation.hora,
        estado: reservation.estado
    }));
}

function downloadJSON(data, filename) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Aplicación iniciada');
    
    // FORZAR limpieza completa y bloquear creación automática
    appState.reservations = [];
    
    // Interceptar cualquier intento de agregar reservas automáticamente
    const originalPush = appState.reservations.push;
    appState.reservations.push = function(...args) {
        console.warn('🚨 INTENTO DE AGREGAR RESERVA:', args);
        console.trace('Stack trace de dónde viene la reserva:');
        return originalPush.apply(this, args);
    };
    
    console.log('🧹 Reservas completamente eliminadas y monitoreo activado');
    console.log('📋 Estado inicial:', appState);
    console.log('📋 Reservas existentes (DEBE estar vacío):', appState.reservations);
    console.log('🏟️ Datos de canchas:', courtsData);
    
    // Verificar que las canchas CAN-01 y CAN-02 estén disponibles
    const cancha01 = Object.values(courtsData).flat().find(c => c.id === 'CAN-01');
    const cancha02 = Object.values(courtsData).flat().find(c => c.id === 'CAN-02');
    console.log('🏟️ CAN-01 disponible:', cancha01?.available);
    console.log('🏟️ CAN-02 disponible:', cancha02?.available);
    
    // Probar validación con fecha de hoy
    const hoy = new Date();
    const fechaHoy = hoy.toISOString().split('T')[0];
    console.log('🧪 Prueba de validación para CAN-02, fecha hoy, 15:00:');
    const pruebaValidacion = validarDisponibilidad('CAN-02', fechaHoy, '15:00');
    console.log('🧪 Resultado:', pruebaValidacion);
    
    // Initialize lucide icons
    lucide.createIcons();
    
    // Auth tab switching
    document.querySelectorAll('.tab-trigger').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            showAuthTab(tabName);
        });
    });
    
    // Dashboard navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            showTab(tabName);
            if (tabName === 'reservations') {
                renderReservations();
            } else {
                renderSports();
            }
        });
    });
    
    // Form submissions
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    
    // RUT formatting
    document.getElementById('login-rut').addEventListener('input', function(e) {
        e.target.value = formatRut(e.target.value);
    });
    
    document.getElementById('register-rut').addEventListener('input', function(e) {
        e.target.value = formatRut(e.target.value);
    });
    
    // Navigation buttons
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    document.getElementById('back-to-dashboard').addEventListener('click', () => {
        showSection('dashboard-section');
        renderSports();
    });
    document.getElementById('back-to-courts').addEventListener('click', () => {
        showSection('court-selection-section');
        renderCourts();
    });
    
    // Modal controls
    document.getElementById('cancel-confirm').addEventListener('click', hideConfirmDialog);
    document.getElementById('confirm-reservation').addEventListener('click', confirmReservation);
    document.getElementById('keep-reservation').addEventListener('click', hideCancelDialog);
    
    // Success page actions
    document.getElementById('view-reservations-btn').addEventListener('click', goToReservations);
    document.getElementById('new-reservation-btn').addEventListener('click', makeNewReservation);
    
    // Download and share buttons
    document.getElementById('download-btn').addEventListener('click', () => {
        // Descargar datos de reservas en formato JSON
        const reservasData = exportReservasData();
        if (reservasData.length > 0) {
            downloadJSON(reservasData, 'mis-reservas.json');
        } else {
            alert('No tienes reservas para descargar');
        }
    });
    
    document.getElementById('share-btn').addEventListener('click', () => {
        if (navigator.share && appState.reservations.length > 0) {
            const lastReservation = appState.reservations[appState.reservations.length - 1];
            navigator.share({
                title: 'Mi Reserva de Cancha',
                text: `He reservado la ${lastReservation.court} para el ${lastReservation.fecha || lastReservation.date} a las ${lastReservation.hora || lastReservation.time}`,
                url: window.location.href
            });
        } else {
            alert('Funcionalidad de compartir no disponible o no hay reservas');
        }
    });
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Initialize with sports rendered
    renderSports();
});

// Make functions global for onclick handlers
window.selectSport = selectSport;
window.selectCourt = selectCourt;
window.selectDate = selectDate;
window.selectTime = selectTime;
window.changeMonth = changeMonth;
window.editReservation = editReservation;
window.showCancelDialog = showCancelDialog;
window.closeUnavailableMessage = closeUnavailableMessage;

// Make main API functions globally accessible
window.loadCanchas = loadCanchas;
window.renderCanchas = renderCanchas;
window.reservarCancha = reservarCancha;
window.validarDisponibilidad = validarDisponibilidad;
window.listarReservas = listarReservas;
window.cancelarReserva = cancelarReserva;
window.filtrarPorDeporte = filtrarPorDeporte;
window.filtrarPorFecha = filtrarPorFecha;

// Additional utility functions  
window.filtrarReservasPorEstado = filtrarReservasPorEstado;
window.obtenerCanchasPorDeporte = obtenerCanchasPorDeporte;
window.obtenerReservasDeHoy = obtenerReservasDeHoy;
window.obtenerProximasReservas = obtenerProximasReservas;

// Debug functions for exporting data (accessible from console)
window.exportCanchas = () => {
    const canchas = exportCanchasData();
    console.log('Datos de Canchas:', canchas);
    downloadJSON(canchas, 'canchas.json');
    return canchas;
};

window.exportReservas = () => {
    const reservas = exportReservasData();
    console.log('Datos de Reservas:', reservas);
    downloadJSON(reservas, 'reservas.json');
    return reservas;
};

window.showCurrentState = () => {
    console.log('Estado actual de la aplicación:', appState);
    return appState;
};
