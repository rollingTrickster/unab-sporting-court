/**
 * Firebase Authentication Service
 * Maneja autenticación con redes sociales (Google, Facebook, GitHub)
 */

(function(global) {
    'use strict';

    // Configuración de Firebase (debes reemplazar con tus credenciales)
    const firebaseConfig = global.ENV?.FIREBASE_CONFIG || {
        apiKey: "TU_API_KEY",
        authDomain: "TU_AUTH_DOMAIN",
        projectId: "TU_PROJECT_ID",
        storageBucket: "TU_STORAGE_BUCKET",
        messagingSenderId: "TU_MESSAGING_SENDER_ID",
        appId: "TU_APP_ID"
    };

    let auth = null;
    let googleProvider = null;
    let facebookProvider = null;
    let githubProvider = null;

    /**
     * Inicializar Firebase
     */
    const initializeFirebase = () => {
        if (!global.firebase) {
            console.error('Firebase SDK no cargado. Asegúrate de incluir los scripts de Firebase en el HTML.');
            return false;
        }

        try {
            // Inicializar Firebase App
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
                console.log('✅ Firebase inicializado correctamente');
            }

            // Inicializar servicios
            auth = firebase.auth();
            
            // Configurar proveedores
            googleProvider = new firebase.auth.GoogleAuthProvider();
            googleProvider.addScope('profile');
            googleProvider.addScope('email');
            
            facebookProvider = new firebase.auth.FacebookAuthProvider();
            facebookProvider.addScope('email');
            
            githubProvider = new firebase.auth.GithubAuthProvider();
            githubProvider.addScope('user:email');

            // Configurar idioma español
            auth.languageCode = 'es';

            return true;
        } catch (error) {
            console.error('Error inicializando Firebase:', error);
            return false;
        }
    };

    const FirebaseService = {
        /**
         * Verificar si Firebase está inicializado
         */
        isInitialized() {
            return auth !== null;
        },

        /**
         * Inicializar el servicio
         */
        init() {
            return initializeFirebase();
        },

        /**
         * Login con Google
         */
        async loginWithGoogle() {
            if (!auth || !googleProvider) {
                throw new Error('Firebase no está inicializado');
            }

            try {
                const result = await auth.signInWithPopup(googleProvider);
                const user = result.user;
                
                console.log('✅ Login con Google exitoso:', user.email);
                
                return {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    provider: 'google',
                    emailVerified: user.emailVerified,
                    token: await user.getIdToken()
                };
            } catch (error) {
                console.error('❌ Error en login con Google:', error);
                throw this._handleAuthError(error);
            }
        },

        /**
         * Login con Facebook
         */
        async loginWithFacebook() {
            if (!auth || !facebookProvider) {
                throw new Error('Firebase no está inicializado');
            }

            try {
                const result = await auth.signInWithPopup(facebookProvider);
                const user = result.user;
                
                console.log('✅ Login con Facebook exitoso:', user.email);
                
                return {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    provider: 'facebook',
                    emailVerified: user.emailVerified,
                    token: await user.getIdToken()
                };
            } catch (error) {
                console.error('❌ Error en login con Facebook:', error);
                throw this._handleAuthError(error);
            }
        },

        /**
         * Login con GitHub
         */
        async loginWithGithub() {
            if (!auth || !githubProvider) {
                throw new Error('Firebase no está inicializado');
            }

            try {
                const result = await auth.signInWithPopup(githubProvider);
                const user = result.user;
                
                console.log('✅ Login con GitHub exitoso:', user.email);
                
                return {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    provider: 'github',
                    emailVerified: user.emailVerified,
                    token: await user.getIdToken()
                };
            } catch (error) {
                console.error('❌ Error en login con GitHub:', error);
                throw this._handleAuthError(error);
            }
        },

        /**
         * Logout de Firebase
         */
        async logout() {
            if (!auth) {
                throw new Error('Firebase no está inicializado');
            }

            try {
                await auth.signOut();
                console.log('✅ Logout de Firebase exitoso');
            } catch (error) {
                console.error('❌ Error en logout de Firebase:', error);
                throw error;
            }
        },

        /**
         * Obtener usuario actual de Firebase
         */
        getCurrentUser() {
            return auth ? auth.currentUser : null;
        },

        /**
         * Observar cambios en el estado de autenticación
         */
        onAuthStateChanged(callback) {
            if (!auth) {
                console.error('Firebase no está inicializado');
                return () => {};
            }

            return auth.onAuthStateChanged(callback);
        },

        /**
         * Obtener token del usuario actual
         */
        async getCurrentUserToken() {
            const user = this.getCurrentUser();
            if (!user) {
                throw new Error('No hay usuario autenticado');
            }
            return await user.getIdToken();
        },

        /**
         * Reautenticar usuario (refrescar token)
         */
        async refreshToken() {
            const user = this.getCurrentUser();
            if (!user) {
                throw new Error('No hay usuario autenticado');
            }
            return await user.getIdToken(true);
        },

        /**
         * Verificar si el usuario está autenticado
         */
        isAuthenticated() {
            return this.getCurrentUser() !== null;
        },

        /**
         * Manejo de errores de autenticación
         */
        _handleAuthError(error) {
            const errorCode = error.code;
            const errorMessage = error.message;

            let userMessage = errorMessage;

            switch (errorCode) {
                case 'auth/popup-closed-by-user':
                    userMessage = 'Popup cerrado antes de completar la autenticación';
                    break;
                case 'auth/cancelled-popup-request':
                    userMessage = 'Solicitud de popup cancelada';
                    break;
                case 'auth/popup-blocked':
                    userMessage = 'Popup bloqueado por el navegador. Por favor, permite popups para este sitio.';
                    break;
                case 'auth/account-exists-with-different-credential':
                    userMessage = 'Ya existe una cuenta con este email usando otro proveedor. Intenta con otro método de login.';
                    break;
                case 'auth/credential-already-in-use':
                    userMessage = 'Esta credencial ya está en uso por otra cuenta';
                    break;
                case 'auth/operation-not-allowed':
                    userMessage = 'Este método de autenticación no está habilitado. Contacta al administrador.';
                    break;
                case 'auth/invalid-credential':
                    userMessage = 'Credencial inválida o expirada';
                    break;
                case 'auth/user-disabled':
                    userMessage = 'Esta cuenta ha sido deshabilitada';
                    break;
                case 'auth/network-request-failed':
                    userMessage = 'Error de red. Verifica tu conexión a internet.';
                    break;
                default:
                    userMessage = `Error de autenticación: ${errorMessage}`;
            }

            const enhancedError = new Error(userMessage);
            enhancedError.code = errorCode;
            enhancedError.originalError = error;
            
            return enhancedError;
        }
    };

    // Exponer el servicio globalmente
    global.FirebaseService = FirebaseService;

    // Auto-inicializar cuando el script se carga
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            FirebaseService.init();
        });
    } else {
        FirebaseService.init();
    }

})(window);
