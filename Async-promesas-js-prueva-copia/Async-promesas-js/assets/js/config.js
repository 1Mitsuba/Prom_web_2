/**
 * Configuración global de la aplicación
 */
export const CONFIG = {
    // URL base de tu API PHP
    API_URL: 'http://localhost/Async-promesas-js/api',
    
    // Método para obtener headers comunes para las solicitudes
    getHeaders() {
        return {
            'Content-Type': 'application/json'
        };
    }
};