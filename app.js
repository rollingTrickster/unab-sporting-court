// Estado global de la aplicación
const appState = {
    currentView: 'auth',
    user: null,
    selectedSport: '',
    selectedCourt: null,
    selectedDate: null,
    selectedTime: '',
    reservations: [],
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
            id: '1',
            name: 'Cancha Central #1',
            description: 'Cancha de fútbol 11 con césped sintético de última generación',
            capacity: 22,
            rating: 4.8,
            pricePerHour: 45000,
            features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Césped Sintético', 'Marcador Electrónico'],
            available: true
        },
        {
            id: '2',
            name: 'Cancha Norte #2',
            description: 'Cancha de fútbol 7 ideal para partidos más íntimos',
            capacity: 14,
            rating: 4.6,
            pricePerHour: 35000,
            features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Césped Natural', 'Gradas Cubiertas'],
            available: true
        },
        {
            id: '3',
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
            id: '4',
            name: 'Pista Tenis #1',
            description: 'Cancha de tenis profesional con superficie de polvo de ladrillo',
            capacity: 4,
            rating: 4.9,
            pricePerHour: 25000,
            features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Polvo de Ladrillo', 'Red Profesional'],
            available: true
        },
        {
            id: '5',
            name: 'Pista Tenis #2',
            description: 'Cancha de tenis con superficie dura, ideal para principiantes',
            capacity: 4,
            rating: 4.5,
            pricePerHour: 20000,
            features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Superficie Dura', 'Gradas'],
            available: true
        },
        {
            id: '6',
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
            id: '7',
            name: 'Pista Pádel #1',
            description: 'Cancha de pádel techada con cristales panorámicos',
            capacity: 4,
            rating: 4.7,
            pricePerHour: 28000,
            features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Techada', 'Cristales Panorámicos', 'Aire Acondicionado'],
            available: true
        },
        {
            id: '8',
            name: 'Pista Pádel #2',
            description: 'Cancha de pádel al aire libre con césped sintético',
            capacity: 4,
            rating: 4.4,
            pricePerHour: 22000,
            features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Al Aire Libre', 'Césped Sintético'],
            available: true
        },
        {
            id: '9',
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
    
    if (date < today) return false;
    
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();
    
    if (dayOfWeek === 0 && dayOfMonth % 7 === 0) return false;
    if (dayOfMonth === 25 || dayOfMonth === 31) return false;
    
    return true;
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
        sportCard.className = 'card sport-card';
        sportCard.innerHTML = `
            <div class="card-header">
                <div class="sport-header">
                    <div class="sport-info">
                        <div class="sport-emoji">${sport.icon}</div>
                        <div class="sport-details">
                            <h3>${sport.name}</h3>
                            <p>${sport.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <div class="sport-availability">
                    <div class="availability-indicator">
                        <div class="availability-dot ${sport.color}"></div>
                        <span class="availability-text">${sport.available} canchas disponibles</span>
                    </div>
                    <button class="btn btn-primary" onclick="selectSport('${sport.name}')">
                        Ver Canchas
                    </button>
                </div>
            </div>
        `;
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
    const grid = document.getElementById('courts-grid');
    grid.innerHTML = '';
    
    const courts = courtsData[appState.selectedSport] || [];
    
    courts.forEach(court => {
        const courtCard = document.createElement('div');
        courtCard.className = `card ${!court.available ? 'loading' : ''}`;
        courtCard.innerHTML = `
            <div class="card-header">
                <div>
                    <div class="card-title">
                        ${court.name}
                        ${!court.available ? '<span class="badge badge-unavailable">No Disponible</span>' : ''}
                    </div>
                    <p class="card-description">${court.description}</p>
                </div>
            </div>
            <div class="card-content">
                <div class="court-stats">
                    <div class="stat-item">
                        <i data-lucide="users"></i>
                        <span>${court.capacity} personas máx.</span>
                    </div>
                    <div class="stat-item">
                        <i data-lucide="star" style="color: #fbbf24; fill: currentColor;"></i>
                        <span>${court.rating}</span>
                    </div>
                </div>
                
                <div class="court-features">
                    <p>Características:</p>
                    <div class="features-list">
                        ${court.features.map(feature => 
                            `<span class="badge badge-outline">${feature}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="court-footer">
                    <div class="price-info">
                        <div class="price">${formatPrice(court.pricePerHour)}</div>
                        <div class="period">por hora</div>
                    </div>
                    <button 
                        class="btn ${court.available ? 'btn-primary' : 'btn-outline'}" 
                        ${!court.available ? 'disabled' : ''}
                        onclick="selectCourt(${JSON.stringify(court).replace(/"/g, '&quot;')})"
                    >
                        <i data-lucide="map-pin"></i>
                        ${court.available ? 'Reservar' : 'No Disponible'}
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(courtCard);
    });
    
    // Initialize lucide icons
    lucide.createIcons();
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
    let currentDate = new Date(startDate);
    
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
            
            const dateStr = currentDate.toISOString().split('T')[0];
            
            cell.innerHTML = `
                <button 
                    class="${classes.join(' ')}" 
                    onclick="selectDate('${dateStr}')"
                    ${!isAvailable ? 'disabled' : ''}
                >
                    ${currentDate.getDate()}
                </button>
            `;
            
            row.appendChild(cell);
            currentDate.setDate(currentDate.getDate() + 1);
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
    appState.selectedDate = new Date(dateStr);
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
    
    timeSlots.forEach(slot => {
        const timeSlot = document.createElement('button');
        timeSlot.className = `time-slot ${!slot.available ? 'disabled' : ''}`;
        timeSlot.disabled = !slot.available;
        timeSlot.onclick = () => selectTime(slot.time);
        
        timeSlot.innerHTML = `
            <span class="time">${slot.time}</span>
            <span class="price">
                ${slot.available ? formatPrice(appState.selectedCourt.pricePerHour) : 'Ocupado'}
            </span>
        `;
        
        grid.appendChild(timeSlot);
    });
}

function selectTime(time) {
    appState.selectedTime = time;
    showConfirmDialog();
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
    confirmBtn.textContent = appState.editingReservation ? 'Actualizar Reserva' : 'Confirmar Reserva';
    
    modal.classList.add('active');
}

function hideConfirmDialog() {
    document.getElementById('confirm-dialog').classList.remove('active');
}

function confirmReservation() {
    const reservation = {
        id: appState.editingReservation?.id || Date.now().toString(),
        sport: appState.selectedSport,
        court: appState.selectedCourt.name,
        date: appState.selectedDate.toISOString().split('T')[0],
        time: appState.selectedTime,
        price: appState.selectedCourt.pricePerHour,
        status: 'confirmed'
    };
    
    if (appState.editingReservation) {
        const index = appState.reservations.findIndex(r => r.id === appState.editingReservation.id);
        if (index !== -1) {
            appState.reservations[index] = reservation;
        }
        appState.editingReservation = null;
    } else {
        appState.reservations.push(reservation);
    }
    
    hideConfirmDialog();
    showSection('success-section');
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
                    <span class="label">Cancha:</span>
                    <span class="value">${reservation.court}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Fecha:</span>
                    <span class="value">${formatDate(new Date(reservation.date))}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Hora:</span>
                    <span class="value">${reservation.time}</span>
                </div>
            </div>
        `;
        
        document.getElementById('confirm-cancel').onclick = () => {
            appState.reservations = appState.reservations.filter(r => r.id !== reservationId);
            document.getElementById('cancel-dialog').classList.remove('active');
            renderReservations();
        };
        
        modal.classList.add('active');
    }
}

function hideCancelDialog() {
    document.getElementById('cancel-dialog').classList.remove('active');
}

// Reservations rendering
function renderReservations() {
    const content = document.getElementById('reservations-content');
    const actions = document.getElementById('reservation-actions');
    
    if (appState.reservations.length === 0) {
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
                ${appState.reservations.map(reservation => `
                    <div class="reservation-card">
                        <div class="reservation-content">
                            <div class="reservation-left">
                                <div class="reservation-emoji">${getSportIcon(reservation.sport)}</div>
                                <div class="reservation-details">
                                    <h3>${reservation.court}</h3>
                                    <p class="sport">${reservation.sport}</p>
                                    <div class="reservation-meta">
                                        <div class="meta-item">
                                            <i data-lucide="calendar"></i>
                                            <span>${formatDate(new Date(reservation.date))}</span>
                                        </div>
                                        <div class="meta-item">
                                            <i data-lucide="clock"></i>
                                            <span>${reservation.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="reservation-right">
                                <span class="badge badge-default">Confirmada</span>
                                <div class="reservation-actions">
                                    <button class="btn btn-outline btn-sm" onclick="editReservation('${reservation.id}')">
                                        Cambiar
                                    </button>
                                    <button class="btn btn-destructive btn-sm" onclick="showCancelDialog('${reservation.id}')">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Update action buttons
        document.getElementById('change-time-btn').onclick = () => {
            if (appState.reservations.length > 0) {
                editReservation(appState.reservations[0].id);
            }
        };
        
        document.getElementById('cancel-reservation-btn').onclick = () => {
            if (appState.reservations.length > 0) {
                showCancelDialog(appState.reservations[0].id);
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
        
        // Create court object for editing
        const court = {
            id: 'edit-' + reservation.id,
            name: reservation.court,
            description: `Cancha de ${reservation.sport.toLowerCase()}`,
            capacity: reservation.sport === 'Fútbol' ? 22 : 4,
            rating: 4.5,
            pricePerHour: reservation.price,
            features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED'],
            available: true
        };
        
        appState.selectedCourt = court;
        appState.selectedDate = new Date(reservation.date);
        appState.currentMonth = appState.selectedDate.getMonth();
        appState.currentYear = appState.selectedDate.getFullYear();
        
        selectCourt(court);
    }
}

function renderReservationSuccess(reservation) {
    const details = document.getElementById('reservation-details');
    const code = document.getElementById('reservation-code');
    
    details.innerHTML = `
        <div class="reservation-header">
            <h3>Detalles de la Reserva</h3>
            <span class="badge badge-default" style="background-color: var(--color-green-600);">
                Confirmada
            </span>
        </div>
        
        <div class="reservation-sport">
            <span class="emoji">${getSportIcon(reservation.sport)}</span>
            <div>
                <p class="name">${reservation.court}</p>
                <p class="type">${reservation.sport}</p>
            </div>
        </div>
        
        <div class="reservation-info">
            <div class="info-item">
                <i data-lucide="calendar"></i>
                <div>
                    <p class="label">Fecha</p>
                    <p class="value">${formatDate(new Date(reservation.date))}</p>
                </div>
            </div>
            
            <div class="info-item">
                <i data-lucide="clock"></i>
                <div>
                    <p class="label">Hora</p>
                    <p class="value">${reservation.time}</p>
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
        <p class="code">RES-${reservation.id}</p>
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

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Download and share buttons (placeholder functionality)
    document.getElementById('download-btn').addEventListener('click', () => {
        alert('Funcionalidad de descarga no implementada en esta demo');
    });
    
    document.getElementById('share-btn').addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'Mi Reserva de Cancha',
                text: 'He reservado una cancha deportiva',
                url: window.location.href
            });
        } else {
            alert('Funcionalidad de compartir no implementada en esta demo');
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
