// Vue.js Application for Court Reservations
const { createApp } = Vue;

createApp({
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
                        available: true
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
                        features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Superficie Dura', 'Techo Retráctil'],
                        available: true
                    }
                ],
                'Pádel': [
                    {
                        id: 'CAN-07',
                        name: 'Pista Pádel #1',
                        description: 'Cancha de pádel profesional con superficie de césped sintético',
                        capacity: 4,
                        rating: 4.7,
                        pricePerHour: 22000,
                        features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Césped Sintético', 'Paredes Cristal'],
                        available: true
                    },
                    {
                        id: 'CAN-08',
                        name: 'Pista Pádel #2',
                        description: 'Cancha de pádel al aire libre con excelente ventilación',
                        capacity: 4,
                        rating: 4.6,
                        pricePerHour: 18000,
                        features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Al Aire Libre', 'Superficie Premium'],
                        available: true
                    },
                    {
                        id: 'CAN-09',
                        name: 'Pista Pádel #3',
                        description: 'Cancha de pádel cubierta para todas las condiciones climáticas',
                        capacity: 4,
                        rating: 4.9,
                        pricePerHour: 26000,
                        features: ['Vestuarios', 'Estacionamiento', 'Iluminación LED', 'Cubierta', 'Aire Acondicionado'],
                        available: true
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
            isLoadingReservations: false,
            
            // Calendar state
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            monthNames: [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            weekDays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            
            // Modal state
            showConfirm: false,
            showCancel: false
        }
    },
    
    computed: {
        // Filter reservations for current user only
        userReservations() {
            if (!this.user) return [];
            const userFullName = `${this.user.nombre} ${this.user.apellido}`;
            return this.reservations.filter(reservation => 
                reservation.usuario === userFullName
            );
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
                this.reservations = JSON.parse(savedReservations);
                return;
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
                this.user = {
                    rut: this.loginForm.rut,
                    nombre: 'Usuario',
                    apellido: 'Demo'
                };
                this.currentView = 'dashboard';
                this.loginForm = { rut: '', password: '' };
            }
        },
        
        handleRegister() {
            // Simple validation - in real app, this would be an API call
            if (this.registerForm.nombre && this.registerForm.apellido && 
                this.registerForm.rut && this.registerForm.email && this.registerForm.password) {
                this.user = {
                    rut: this.registerForm.rut,
                    nombre: this.registerForm.nombre,
                    apellido: this.registerForm.apellido,
                    email: this.registerForm.email
                };
                this.currentView = 'dashboard';
                this.registerForm = { nombre: '', apellido: '', rut: '', email: '', password: '' };
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
        
        selectCourt(court) {
            if (!court.available) return;
            this.selectedCourt = court;
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
                estado: 'Reservada'
            };
            
            this.reservations.push(newReservation);
            this.lastReservation = newReservation;
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
                this.reservations = this.reservations.filter(r => r.id !== this.selectedReservation.id);
                this.selectedReservation = null;
            }
            this.hideCancelDialog();
        },
        
        changeReservationTime() {
            if (!this.selectedReservation) return;
            
            // Find the court and sport
            this.selectedSport = this.selectedReservation.deporte;
            this.selectedCourt = this.getAvailableCourts(this.selectedSport)
                .find(court => court.id === this.selectedReservation.canchaId);
            
            this.currentView = 'calendar';
        },
        
        // Success page methods
        viewReservations() {
            this.currentView = 'dashboard';
            this.activeDashboardTab = 'reservations';
        },

        // Method to reload reservations from JSON file
        async reloadReservations() {
            this.isLoadingReservations = true;
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
            const date = new Date(dateString);
            return date.toLocaleDateString('es-CL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        
        formatSelectedDate() {
            if (!this.selectedDate) return '';
            const date = new Date(this.selectedDate);
            return date.toLocaleDateString('es-CL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
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
    },
    
    watch: {
        // Save reservations to localStorage whenever they change
        reservations: {
            handler(newReservations) {
                localStorage.setItem('courtReservations', JSON.stringify(newReservations));
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
}).mount('#app');