(function(global) {
    'use strict';

    // Simple API Service exposed on window.ApiService for non-bundled usage
    const ApiService = {
        // Fetch 5-day/3h forecast from OpenWeatherMap
        async fetchWeather(lat, lon, apiKey, { units = 'metric', lang = 'es' } = {}) {
            if (!apiKey) {
                throw new Error('Falta OPENWEATHER_API_KEY. Defínelo en window.ENV.OPENWEATHER_API_KEY');
            }
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${lang}`;
            const resp = await fetch(url);
            if (!resp.ok) {
                const text = await resp.text().catch(() => '');
                throw new Error(`Error al obtener el clima (${resp.status}): ${text}`);
            }
            return resp.json();
        },

        // Fetch raw reservations JSON (component will transform/massage it)
        async fetchReservationsRaw(path = './reservas.json') {
            const resp = await fetch(path);
            if (!resp.ok) {
                throw new Error(`No se pudieron cargar las reservas (${resp.status})`);
            }
            return resp.json();
        },

        // LocalStorage helpers for reservations
        loadLocalReservations(key = 'courtReservations') {
            try {
                const saved = localStorage.getItem(key);
                return saved ? JSON.parse(saved) : null;
            } catch (_) {
                localStorage.removeItem(key);
                return null;
            }
        },

        saveLocalReservations(reservations, key = 'courtReservations') {
            try {
                localStorage.setItem(key, JSON.stringify(reservations || []));
            } catch (_) {
                // noop
            }
        }
    };

    // Expose
    global.ApiService = ApiService;

    // Optional ENV shim example (user can define window.ENV earlier in index.html)
    global.ENV = global.ENV || {
        OPENWEATHER_API_KEY: '61f6915417ca53ccd95fb615cc7fb019' // Rellena con tu API key en ejecución (no se lee .env en navegador)
    };
})(window);
