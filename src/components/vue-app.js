// Vue.js Application for Court Reservations
const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            // Current view state
            currentView: 'auth',
            
            // Authentication state
            activeAuthTab: 'login',
            user: null,
            loginForm: {
                rut: '',
                password: ''
            },
            registerForm: {
                nombre: '',
                apellido: '',
                rut: '',
                email: '',
                password: ''
            },
            
            // Dashboard state
            activeDashboardTab: 'sports',
            
            // Sports and courts data
            sportsData: [
                {
                    name: 'Fútbol',
                    description: 'Canchas de fútbol 11 y fútbol 7',
                    icon: '⚽',
                    available: 3,
                    color: 'green'
                },
                {
                    name: 'Tenis',
                    description: 'Canchas de tenis individuales y dobles',
                    icon: '🎾',
                    available: 3,
                    color: 'orange'
                },
                {
                    name: 'Pádel',
                    description: 'Canchas de pádel techadas y al aire libre',
                    icon: '🏓',
                    available: 3,
                    color: 'purple'
                }
            ],
            
            courtsData: {
                'Fútbol': [
                    {
                        id: 'CAN-01',
                        name: 'Cancha Central #1',
                        description: 'Cancha de fútbol 11 con césped sintético de última generación',
                        capacity: 22,
                        rating: 4.8,
                        pricePerHour: 45000,
                        features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Césped Sintético', 'Marcador Electrónico'],
                        available: true,
                        location: {
                            city: 'Viña del Mar',
                            address: 'Av. Libertad 1348, Viña del Mar',
                            lat: -33.0244,
                            lon: -71.5519
                        }
                    },
                    {
                        id: 'CAN-02',
                        name: 'Cancha Norte #2',
                        description: 'Cancha de fútbol 7 ideal para partidos más íntimos',
                        capacity: 14,
                        rating: 4.6,
                        pricePerHour: 35000,
                        features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Césped Natural', 'Gradas Cubiertas'],
                        available: true,
                        location: {
                            city: 'Viña del Mar',
                            address: 'Av. Marina 37, Viña del Mar',
                            lat: -33.0153,
                            lon: -71.5500
                        }
                    },
                    {
                        id: 'CAN-03',
                        name: 'Cancha Sur #3',
                        description: 'Cancha multiuso con césped híbrido',
                        capacity: 22,
                        rating: 4.7,
                        pricePerHour: 40000,
                        features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Césped Híbrido', 'Sistema de Riego'],
                        available: true,
                        location: {
                            city: 'Viña del Mar',
                            address: 'Av. Los Castaños 155, Viña del Mar',
                            lat: -33.0365,
                            lon: -71.5320
                        }
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
                        available: true,
                        location: {
                            city: 'Viña del Mar',
                            address: 'Av. Sporting 2950, Viña del Mar',
                            lat: -33.0287,
                            lon: -71.5210
                        }
                    },
                    {
                        id: 'CAN-05',
                        name: 'Pista Tenis #2',
                        description: 'Cancha de tenis con superficie dura, ideal para principiantes',
                        capacity: 4,
                        rating: 4.5,
                        pricePerHour: 20000,
                        features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Superficie Dura', 'Gradas'],
                        available: true,
                        location: {
                            city: 'Viña del Mar',
                            address: 'Av. San Martín 180, Viña del Mar',
                            lat: -33.0325,
                            lon: -71.5538
                        }
                    },
                    {
                        id: 'CAN-06',
                        name: 'Pista Tenis #3',
                        description: 'Cancha de tenis cubierta para jugar en cualquier clima',
                        capacity: 4,
                        rating: 4.8,
                        pricePerHour: 30000,
                        features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Superficie Dura', 'Techo Retráctil'],
                        available: true,
                        location: {
                            city: 'Viña del Mar',
                            address: 'Av. Valparaíso 567, Viña del Mar',
                            lat: -33.0198,
                            lon: -71.5485
                        }
                    }
                ],
                'Pádel': [
                    {
                        id: 'CAN-07',
                        name: 'Cancha Pádel #1',
                        description: 'Cancha de pádel indoor con cristal panorámico',
                        capacity: 4,
                        rating: 4.9,
                        pricePerHour: 28000,
                        features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Cristal Panorámico', 'Climatizada'],
                        available: true,
                        location: {
                            city: 'Viña del Mar',
                            address: 'Av. Libertad 1348, Viña del Mar',
                            lat: -33.0245,
                            lon: -71.5518
                        }
                    },
                    {
                        id: 'CAN-08',
                        name: 'Cancha Pádel #2',
                        description: 'Cancha de pádel outdoor con césped sintético premium',
                        capacity: 4,
                        rating: 4.6,
                        pricePerHour: 22000,
                        features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Césped Sintético', 'Gradas'],
                        available: true,
                        location: {
                            city: 'Viña del Mar',
                            address: 'Av. Los Castaños 1455, Viña del Mar',
                            lat: -33.0156,
                            lon: -71.5425
                        }
                    },
                    {
                        id: 'CAN-09',
                        name: 'Cancha Pádel #3',
                        description: 'Cancha de pádel techada con las mejores instalaciones',
                        capacity: 4,
                        rating: 4.8,
                        pricePerHour: 26000,
                        features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Techo Retráctil', 'Bar'],
                        available: true,
                        location: {
                            city: 'Viña del Mar',
                            address: 'Av. 15 Norte 961, Viña del Mar',
                            lat: -33.0178,
                            lon: -71.5512
                        }
                    }
                ]
            },
            
            // Selection state
            selectedSport: '',
            selectedCourt: null,
            selectedDate: null,
            selectedTime: '',
            
            // Reservations
            reservations: [],
            selectedReservation: null,
            lastReservation: null,
            modifyingReservation: null,
            isLoadingReservations: false,
            
            // Calendar state
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            monthNames: [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            weekDays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            
            // Weather API
            weatherApiKey: (window.ENV && window.ENV.OPENWEATHER_API_KEY) || '61f6915417ca53ccd95fb615cc7fb019',
            weatherData: null,
            weatherByDate: {},
            weatherByHour: {},
            weatherByLocation: {}, // Clima por ubicación de cancha
            
            // Modal state
            showConfirm: false,
            showCancel: false
        }
    },
    
    computed: {
        // Filter reservations for current user only
        userReservations() {
            if (!this.user) {
                console.log('⚠️ userReservations: No hay usuario logueado');
                return [];
            }
            const userFullName = `${this.user.nombre} ${this.user.apellido}`;
            const filtered = this.reservations.filter(reservation => {
                const match = reservation.usuario === userFullName;
                if (!match) {
                    console.log(`🔍 Filtrando: "${reservation.usuario}" !== "${userFullName}"`);
                }
                return match;
            });
            console.log(`✅ userReservations calculado: ${filtered.length} reservas para "${userFullName}"`);
            return filtered;
        },
        calendarDays() {
            const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
            const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
            const today = new Date();
            
            const days = [];
            
            // Previous month days
            const prevMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
            const prevYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
            const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
            
            for (let i = firstDayOfMonth - 1; i >= 0; i--) {
                const date = daysInPrevMonth - i;
                days.push({
                    date,
                    isCurrentMonth: false,
                    isPast: true,
                    isToday: false,
                    fullDate: `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
                });
            }
            
            // Current month days
            for (let date = 1; date <= daysInMonth; date++) {
                const dayDate = new Date(this.currentYear, this.currentMonth, date);
                const isPast = dayDate < today.setHours(0, 0, 0, 0);
                const isToday = dayDate.toDateString() === today.toDateString();
                
                days.push({
                    date,
                    isCurrentMonth: true,
                    isPast,
                    isToday,
                    fullDate: `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
                });
            }
            
            // Next month days to fill the grid
            const remainingDays = 42 - days.length;
            const nextMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
            const nextYear = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
            
            for (let date = 1; date <= remainingDays; date++) {
                days.push({
                    date,
                    isCurrentMonth: false,
                    isPast: false,
                    isToday: false,
                    fullDate: `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
                });
            }
            
            return days;
        },
        
        availableTimeSlots() {
            if (!this.selectedDate) return [];
            
            const slots = [
                '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
                '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
                '20:00', '21:00', '22:00'
            ];
            
            // Check for occupied slots based on existing reservations
            return slots.map(time => {
                const occupied = this.reservations.some(reservation => 
                    reservation.fecha === this.selectedDate && 
                    reservation.hora === time &&
                    reservation.canchaId === this.selectedCourt?.id
                );
                
                return { time, occupied };
            });
        }
    },
    
    methods: {
        // Load reservations from localStorage or JSON file
        async loadReservations() {
            // First try to load from localStorage
            const savedReservations = localStorage.getItem('courtReservations');
            if (savedReservations) {
                try {
                    this.reservations = JSON.parse(savedReservations);
                    console.log('Reservas cargadas desde localStorage:', this.reservations.length);
                    return;
                } catch (error) {
                    console.error('Error al parsear reservas de localStorage:', error);
                    localStorage.removeItem('courtReservations');
                }
            }
            
            // If no localStorage data, try to load from JSON file
            try {
                const response = await fetch('./reservas.json');
                if (response.ok) {
                    const reservationsData = await response.json();
                    // Transform the data to match the expected format
                    this.reservations = reservationsData.map(reservation => ({
                        id: reservation.id,
                        usuario: reservation.usuario,
                        cancha: this.getCourtNameById(reservation.canchaId),
                        deporte: this.getSportByCourtId(reservation.canchaId),
                        fecha: reservation.fecha,
                        hora: reservation.hora,
                        estado: reservation.estado,
                        codigo: reservation.id // Use ID as code for now
                    }));
                    // Save to localStorage for future use
                    localStorage.setItem('courtReservations', JSON.stringify(this.reservations));
                    console.log('Reservas cargadas desde archivo JSON:', this.reservations.length);
                }
            } catch (error) {
                console.log('No se pudieron cargar las reservas del archivo JSON:', error);
                this.reservations = [];
            }
        },

        // Helper method to get court name by ID
        getCourtNameById(courtId) {
            for (const sport in this.courtsData) {
                const court = this.courtsData[sport].find(c => c.id === courtId);
                if (court) return court.name;
            }
            return 'Cancha Desconocida';
        },

        // Helper method to get sport by court ID
        getSportByCourtId(courtId) {
            for (const sport in this.courtsData) {
                const court = this.courtsData[sport].find(c => c.id === courtId);
                if (court) return sport;
            }
            return 'Deporte Desconocido';
        },

        // Authentication methods
        handleLogin() {
            // Simple validation - in real app, this would be an API call
            if (this.loginForm.rut && this.loginForm.password) {
                // Load users from localStorage
                const usersData = localStorage.getItem('registeredUsers');
                const users = usersData ? JSON.parse(usersData) : [];
                
                // Find user by RUT and password
                const foundUser = users.find(u => 
                    u.rut === this.loginForm.rut && u.password === this.loginForm.password
                );
                
                if (foundUser) {
                    // User found, login successful
                    this.user = {
                        rut: foundUser.rut,
                        nombre: foundUser.nombre,
                        apellido: foundUser.apellido,
                        email: foundUser.email
                    };
                    this.currentView = 'dashboard';
                    this.loginForm = { rut: '', password: '' };
                    console.log('Login exitoso:', `${this.user.nombre} ${this.user.apellido}`);
                } else {
                    // User not found or wrong password
                    alert('RUT o contraseña incorrectos. Por favor, regístrate si no tienes cuenta.');
                    console.log('Login fallido para RUT:', this.loginForm.rut);
                }
            }
        },
        
        handleRegister() {
            // Simple validation - in real app, this would be an API call
            if (this.registerForm.nombre && this.registerForm.apellido && 
                this.registerForm.rut && this.registerForm.email && this.registerForm.password) {
                
                // Load existing users
                const usersData = localStorage.getItem('registeredUsers');
                const users = usersData ? JSON.parse(usersData) : [];
                
                // Check if RUT already exists
                const existingUser = users.find(u => u.rut === this.registerForm.rut);
                if (existingUser) {
                    alert('Este RUT ya está registrado. Por favor, inicia sesión.');
                    return;
                }
                
                // Create new user
                const newUser = {
                    rut: this.registerForm.rut,
                    nombre: this.registerForm.nombre,
                    apellido: this.registerForm.apellido,
                    email: this.registerForm.email,
                    password: this.registerForm.password
                };
                
                // Save to localStorage
                users.push(newUser);
                localStorage.setItem('registeredUsers', JSON.stringify(users));
                
                // Login the user
                this.user = {
                    rut: newUser.rut,
                    nombre: newUser.nombre,
                    apellido: newUser.apellido,
                    email: newUser.email
                };
                
                this.currentView = 'dashboard';
                this.registerForm = { nombre: '', apellido: '', rut: '', email: '', password: '' };
                console.log('Registro exitoso:', `${this.user.nombre} ${this.user.apellido}`);
            }
        },
        
        logout() {
            this.user = null;
            this.currentView = 'auth';
            this.activeAuthTab = 'login';
            this.resetSelection();
        },
        
        // Navigation methods
        selectSport(sportName) {
            this.selectedSport = sportName;
            this.currentView = 'court-selection';
        },
        
        async selectCourt(court) {
            if (!court.available) return;
            this.selectedCourt = court;
            
            // Cargar clima específico de la ubicación de la cancha
            await this.fetchWeatherForCourt(court);
            
            this.currentView = 'calendar';
        },
        
        backToDashboard() {
            this.currentView = 'dashboard';
            this.resetSelection();
        },
        
        backToCourts() {
            this.currentView = 'court-selection';
            this.selectedCourt = null;
            this.selectedDate = null;
            this.selectedTime = '';
        },
        
        resetSelection() {
            this.selectedSport = '';
            this.selectedCourt = null;
            this.selectedDate = null;
            this.selectedTime = '';
        },
        
        // Calendar methods
        previousMonth() {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.currentYear--;
            } else {
                this.currentMonth--;
            }
        },
        
        nextMonth() {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.currentYear++;
            } else {
                this.currentMonth++;
            }
        },
        
        selectDate(day) {
            if (!day.isCurrentMonth || day.isPast) return;
            this.selectedDate = day.fullDate;
            this.selectedTime = '';
        },
        
        selectTimeSlot(time) {
            this.selectedTime = time;
        },
        
        // Reservation methods
        showConfirmDialog() {
            this.showConfirm = true;
        },
        
        hideConfirmDialog() {
            this.showConfirm = false;
        },
        
        confirmReservation() {
            // Verificar si estamos modificando una reserva existente
            if (this.modifyingReservation) {
                // Modificar reserva existente
                const reservationIndex = this.reservations.findIndex(r => r.id === this.modifyingReservation.id);
                if (reservationIndex !== -1) {
                    // Actualizar fecha y hora
                    this.reservations[reservationIndex].fecha = this.selectedDate;
                    this.reservations[reservationIndex].hora = this.selectedTime;
                    this.reservations[reservationIndex].estado = 'Reservada';
                    
                    // Set as last reservation for success page
                    this.lastReservation = this.reservations[reservationIndex];
                    
                    console.log('🔄 Reserva modificada exitosamente:', this.lastReservation.codigo);
                }
                
                // Limpiar la referencia de modificación
                this.modifyingReservation = null;
            } else {
                // Crear nueva reserva
                const reservationId = 'R' + String(Date.now()).slice(-6);
                const reservationCode = this.generateReservationCode();
                
                const newReservation = {
                    id: reservationId,
                    codigo: reservationCode,
                    usuario: `${this.user.nombre} ${this.user.apellido}`,
                    canchaId: this.selectedCourt.id,
                    cancha: this.selectedCourt.name,
                    deporte: this.selectedSport,
                    fecha: this.selectedDate,
                    hora: this.selectedTime,
                    precio: this.selectedCourt.pricePerHour,
                    estado: 'Reservada',
                    ubicacion: this.selectedCourt.location ? {
                        city: this.selectedCourt.location.city,
                        address: this.selectedCourt.location.address
                    } : null
                };
                
                // Add the new reservation to the array
                this.reservations.push(newReservation);
                
                // Set as last reservation for success page
                this.lastReservation = newReservation;
                
                console.log('✅ Reserva creada exitosamente:', newReservation.codigo);
            }
            
            // Explicitly save to localStorage
            localStorage.setItem('courtReservations', JSON.stringify(this.reservations));
            
            // Log for debugging
            console.log('📊 Total de reservas en sistema:', this.reservations.length);
            console.log('👤 Usuario actual:', `${this.user.nombre} ${this.user.apellido}`);
            console.log('🎯 Reservas filtradas del usuario:', this.userReservations.length);
            
            // Force reactivity update
            this.$forceUpdate();
            
            this.hideConfirmDialog();
            this.currentView = 'success';
        },
        
        generateReservationCode() {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numbers = '0123456789';
            let code = '';
            
            // 2 letters + 4 numbers
            for (let i = 0; i < 2; i++) {
                code += letters.charAt(Math.floor(Math.random() * letters.length));
            }
            for (let i = 0; i < 4; i++) {
                code += numbers.charAt(Math.floor(Math.random() * numbers.length));
            }
            
            return code;
        },
        
        selectReservation(reservation) {
            this.selectedReservation = this.selectedReservation?.id === reservation.id ? null : reservation;
        },
        
        showCancelDialog() {
            if (!this.selectedReservation) return;
            this.showCancel = true;
        },
        
        hideCancelDialog() {
            this.showCancel = false;
        },
        
        confirmCancelReservation() {
            if (this.selectedReservation) {
                // Cambiar el estado a "Cancelada" en lugar de eliminar
                const reservationIndex = this.reservations.findIndex(r => r.id === this.selectedReservation.id);
                if (reservationIndex !== -1) {
                    this.reservations[reservationIndex].estado = 'Cancelada';
                    console.log('✅ Reserva cancelada:', this.reservations[reservationIndex].codigo);
                }
                this.selectedReservation = null;
            }
            this.hideCancelDialog();
        },
        
        changeReservationTime() {
            if (!this.selectedReservation) return;
            
            // Guardar la reserva que se está modificando
            this.modifyingReservation = { ...this.selectedReservation };
            
            // Find the court and sport
            this.selectedSport = this.selectedReservation.deporte;
            this.selectedCourt = this.getAvailableCourts(this.selectedSport)
                .find(court => court.id === this.selectedReservation.canchaId);
            
            // Pre-seleccionar la fecha actual
            this.selectedDate = this.selectedReservation.fecha;
            
            // Cambiar a la vista del calendario
            this.currentView = 'calendar';
            
            console.log('🔄 Modificando reserva:', this.modifyingReservation.codigo);
        },
        
        // Success page methods
        viewReservations() {
            console.log('🔍 Mostrando vista de reservas...');
            
            // Reload reservations from localStorage to ensure we have the latest data
            const savedReservations = localStorage.getItem('courtReservations');
            if (savedReservations) {
                try {
                    this.reservations = JSON.parse(savedReservations);
                    console.log('📦 Reservas totales cargadas desde localStorage:', this.reservations.length);
                    console.log('📋 Todas las reservas:', this.reservations);
                } catch (error) {
                    console.error('❌ Error al parsear reservas:', error);
                    this.reservations = [];
                }
            } else {
                console.warn('⚠️ No hay reservas en localStorage');
                this.reservations = [];
            }
            
            // Log user information
            if (this.user) {
                console.log('👤 Usuario actual:', `${this.user.nombre} ${this.user.apellido}`);
                console.log('🎯 Reservas filtradas del usuario:', this.userReservations.length);
                console.log('📝 Detalle reservas del usuario:', this.userReservations);
            } else {
                console.error('❌ No hay usuario logueado');
            }
            
            this.currentView = 'dashboard';
            this.activeDashboardTab = 'reservations';
            
            // Force update to ensure UI reflects changes
            this.$nextTick(() => {
                this.$forceUpdate();
            });
        },

        // Method to reload reservations from JSON file
        async reloadReservations() {
            this.isLoadingReservations = true;
            
            // First, try to get from localStorage
            const savedReservations = localStorage.getItem('courtReservations');
            if (savedReservations) {
                this.reservations = JSON.parse(savedReservations);
                console.log('Reservas recargadas desde localStorage:', this.reservations.length);
                this.isLoadingReservations = false;
                return;
            }
            
            // If no localStorage, try JSON file
            try {
                const response = await fetch('./reservas.json');
                if (response.ok) {
                    const reservationsData = await response.json();
                    // Transform the data to match the expected format
                    this.reservations = reservationsData.map(reservation => ({
                        id: reservation.id,
                        usuario: reservation.usuario,
                        cancha: this.getCourtNameById(reservation.canchaId),
                        deporte: this.getSportByCourtId(reservation.canchaId),
                        fecha: reservation.fecha,
                        hora: reservation.hora,
                        estado: reservation.estado,
                        codigo: reservation.id // Use ID as code for now
                    }));
                    // Save to localStorage for future use
                    localStorage.setItem('courtReservations', JSON.stringify(this.reservations));
                    console.log('Reservas actualizadas desde el archivo JSON');
                } else {
                    console.error('No se pudo cargar el archivo de reservas');
                }
            } catch (error) {
                console.error('Error al recargar las reservas:', error);
            } finally {
                this.isLoadingReservations = false;
            }
        },
        
        newReservation() {
            this.currentView = 'dashboard';
            this.activeDashboardTab = 'sports';
            this.resetSelection();
        },
        
        downloadReservation() {
            // Simple download functionality
            const content = `
Reserva de Cancha
=================
Código: ${this.lastReservation.codigo}
Cancha: ${this.lastReservation.cancha}
Deporte: ${this.lastReservation.deporte}
Fecha: ${this.formatDate(this.lastReservation.fecha)}
Hora: ${this.lastReservation.hora}
Total: $${this.formatPrice(this.lastReservation.precio)}
            `;
            
            const blob = new Blob([content], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `reserva-${this.lastReservation.codigo}.txt`;
            a.click();
            window.URL.revokeObjectURL(url);
        },
        
        shareReservation() {
            const text = `¡He reservado una cancha! Código: ${this.lastReservation.codigo}, Fecha: ${this.formatDate(this.lastReservation.fecha)}, Hora: ${this.lastReservation.hora}`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Mi Reserva de Cancha',
                    text: text
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(text);
                alert('Información de reserva copiada al portapapeles');
            }
        },
        
        // Utility methods
        getAvailableCourts(sport) {
            return this.courtsData[sport] || [];
        },
        
        getSportIcon(sport) {
            const sportData = this.sportsData.find(s => s.name === sport);
            return sportData ? sportData.icon : '🏟️';
        },
        
        formatPrice(price) {
            if (!price) return '0';
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        },
        
        formatDate(dateString) {
            if (!dateString) return '';
            // Parse the date string manually to avoid timezone issues
            const [year, month, day] = dateString.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            return date.toLocaleDateString('es-CL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        
        formatSelectedDate() {
            if (!this.selectedDate) return '';
            // Parse the date string manually to avoid timezone issues
            const [year, month, day] = this.selectedDate.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            return date.toLocaleDateString('es-CL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        
        // Weather API methods
        async fetchWeatherData(lat = -33.4489, lon = -70.6693, locationKey = 'default') {
            if (!this.weatherApiKey) {
                console.warn('⚠️ OPENWEATHER_API_KEY no configurada. No se cargará el clima.');
                return;
            }
            
            try {
                console.log(`🌤️ Solicitando clima para ${locationKey} (lat: ${lat}, lon: ${lon})...`);
                const data = await ApiService.fetchWeather(lat, lon, this.weatherApiKey);
                console.log(`📦 Datos del clima recibidos para ${locationKey}:`, data.list ? `${data.list.length} registros` : 'sin datos');
                
                // Si es la ubicación por defecto, usar las variables globales
                if (locationKey === 'default') {
                    this.weatherData = data;
                    this.processWeatherData(data);
                } else {
                    // Guardar clima específico por ubicación
                    this.weatherByLocation[locationKey] = data;
                    this.processWeatherDataForLocation(data, locationKey);
                }
                
                console.log(`✅ Datos del clima cargados correctamente para ${locationKey}`);
            } catch (error) {
                console.error(`❌ Error al cargar el clima para ${locationKey}:`, error);
            }
        },
        
        async fetchWeatherForCourt(court) {
            if (!court || !court.location) return;
            
            const locationKey = court.id;
            
            // Si ya tenemos datos del clima para esta ubicación, no volver a consultar
            if (this.weatherByLocation[locationKey]) {
                console.log(`📦 Usando clima cacheado para ${court.location.city}`);
                return;
            }
            
            await this.fetchWeatherData(
                court.location.lat,
                court.location.lon,
                locationKey
            );
        },
        
        processWeatherData(data) {
            // Procesar datos del clima por fecha y hora
            this.weatherByDate = {};
            this.weatherByHour = {};
            
            console.log('🔄 Procesando datos del clima (default location)...');
            
            data.list.forEach(item => {
                const dateTime = new Date(item.dt * 1000);
                const dateStr = dateTime.toISOString().split('T')[0];
                const hour = dateTime.getHours();
                const hourStr = `${String(hour).padStart(2, '0')}:00`;
                
                // Guardar clima por fecha (promedio del día)
                if (!this.weatherByDate[dateStr]) {
                    this.weatherByDate[dateStr] = {
                        temp: item.main.temp,
                        weather: item.weather[0].main,
                        description: item.weather[0].description,
                        icon: item.weather[0].icon,
                        count: 1
                    };
                } else {
                    this.weatherByDate[dateStr].temp += item.main.temp;
                    this.weatherByDate[dateStr].count += 1;
                }
                
                // Guardar clima por fecha y hora específica
                const key = `${dateStr}_${hourStr}`;
                this.weatherByHour[key] = {
                    temp: Math.round(item.main.temp),
                    weather: item.weather[0].main,
                    description: item.weather[0].description,
                    icon: item.weather[0].icon
                };
            });
            
            // Calcular promedio de temperatura por día
            Object.keys(this.weatherByDate).forEach(date => {
                const data = this.weatherByDate[date];
                data.temp = Math.round(data.temp / data.count);
            });
            
            console.log(`📅 weatherByDate procesado con ${Object.keys(this.weatherByDate).length} fechas:`, Object.keys(this.weatherByDate));
            console.log(`⏰ weatherByHour procesado con ${Object.keys(this.weatherByHour).length} horas`);
        },
        
        processWeatherDataForLocation(data, locationKey) {
            console.log(`🔄 Procesando datos del clima para ubicación: ${locationKey}...`);
            
            const weatherByDate = {};
            const weatherByHour = {};
            
            data.list.forEach(item => {
                const dateTime = new Date(item.dt * 1000);
                const dateStr = dateTime.toISOString().split('T')[0];
                const hour = dateTime.getHours();
                const hourStr = `${String(hour).padStart(2, '0')}:00`;
                
                // Guardar clima por fecha
                if (!weatherByDate[dateStr]) {
                    weatherByDate[dateStr] = {
                        temp: item.main.temp,
                        weather: item.weather[0].main,
                        description: item.weather[0].description,
                        icon: item.weather[0].icon,
                        count: 1
                    };
                } else {
                    weatherByDate[dateStr].temp += item.main.temp;
                    weatherByDate[dateStr].count += 1;
                }
                
                // Guardar clima por hora
                const key = `${dateStr}_${hourStr}`;
                weatherByHour[key] = {
                    temp: Math.round(item.main.temp),
                    weather: item.weather[0].main,
                    description: item.weather[0].description,
                    icon: item.weather[0].icon
                };
            });
            
            // Calcular promedio
            Object.keys(weatherByDate).forEach(date => {
                const data = weatherByDate[date];
                data.temp = Math.round(data.temp / data.count);
            });
            
            this.weatherByLocation[locationKey] = {
                byDate: weatherByDate,
                byHour: weatherByHour
            };
            
            console.log(`📅 weatherByLocation[${locationKey}].byDate con ${Object.keys(weatherByDate).length} fechas:`, Object.keys(weatherByDate));
            console.log(`⏰ weatherByLocation[${locationKey}].byHour con ${Object.keys(weatherByHour).length} horas`);
        },
        
        getWeatherIcon(weather) {
            const iconMap = {
                'Clear': '☀️',
                'Clouds': '☁️',
                'Rain': '🌧️',
                'Drizzle': '🌦️',
                'Thunderstorm': '⛈️',
                'Snow': '🌨️',
                'Mist': '🌫️',
                'Fog': '🌫️',
                'Haze': '🌫️'
            };
            return iconMap[weather] || '🌤️';
        },
        
        getWeatherForDate(dateStr) {
            // Usar clima de la cancha seleccionada si existe
            let weatherData = this.weatherByDate;
            
            if (this.selectedCourt && this.weatherByLocation[this.selectedCourt.id]) {
                weatherData = this.weatherByLocation[this.selectedCourt.id].byDate;
                console.log(`🔍 Buscando clima para ${dateStr} en cancha ${this.selectedCourt.id}`);
            } else {
                console.log(`🔍 Buscando clima para ${dateStr} en datos globales`);
            }
            
            if (!weatherData[dateStr]) {
                console.log(`⚠️ No hay clima para fecha: ${dateStr}`);
                return null;
            }
            
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const targetDate = new Date(dateStr + 'T00:00:00');
            const diffDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
            
            // Solo mostrar clima para los próximos 8 días
            if (diffDays < 0 || diffDays > 8) {
                console.log(`⚠️ Fecha ${dateStr} fuera de rango (${diffDays} días desde hoy)`);
                return null;
            }
            
            console.log(`✅ Clima encontrado para ${dateStr}:`, weatherData[dateStr]);
            return weatherData[dateStr];
        },
        
        getWeatherForHour(dateStr, hour) {
            // Usar clima de la cancha seleccionada si existe
            let weatherData = this.weatherByHour;
            
            if (this.selectedCourt && this.weatherByLocation[this.selectedCourt.id]) {
                weatherData = this.weatherByLocation[this.selectedCourt.id].byHour;
            }
            
            const key = `${dateStr}_${hour}`;
            if (!weatherData[key]) return null;
            
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const targetDate = new Date(dateStr + 'T00:00:00');
            const diffDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
            
            // Solo mostrar clima para los próximos 8 días
            if (diffDays < 0 || diffDays > 8) return null;
            
            return weatherData[key];
        },
        
        getStatusClass(status) {
            switch (status) {
                case 'Reservada':
                    return 'status-reserved';
                case 'Completada':
                    return 'status-completed';
                case 'Cancelada':
                    return 'status-cancelled';
                default:
                    return '';
            }
        }
    },
    
    mounted() {
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            this.$nextTick(() => {
                lucide.createIcons();
            });
        }
        
        // Load existing reservations from localStorage or JSON file
        this.loadReservations();
        
        // Load weather data
        this.fetchWeatherData();
        
        // Log initial state
        console.log('App montada. Reservas en localStorage:', localStorage.getItem('courtReservations'));
        console.log('Usuarios registrados:', localStorage.getItem('registeredUsers'));
    },
    
    watch: {
        // Save reservations to localStorage whenever they change
        reservations: {
            handler(newReservations) {
                localStorage.setItem('courtReservations', JSON.stringify(newReservations));
                console.log('Reservas guardadas en localStorage:', newReservations.length);
            },
            deep: true
        },
        
        // Reload reservations when user changes (login/logout)
        user: {
            handler(newUser) {
                if (newUser) {
                    // User logged in, reload reservations
                    this.loadReservations();
                    console.log('Usuario logueado:', `${newUser.nombre} ${newUser.apellido}`);
                    console.log('Reservas del usuario:', this.userReservations.length);
                } else {
                    console.log('Usuario deslogueado');
                }
            },
            deep: true
        },
        
        // Re-initialize Lucide icons when view changes
        currentView() {
            this.$nextTick(() => {
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
        }
    }
});

// Mount the app and make it globally accessible
window.app = app.mount('#app');

console.log('✅ Aplicación Vue montada correctamente');
console.log('👤 Acceso global disponible mediante: window.app');
