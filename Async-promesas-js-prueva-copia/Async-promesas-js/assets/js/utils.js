/**
 * Muestra un mensaje en el elemento con id 'result'
 * @param {string} mensaje Mensaje a mostrar
 * @param {boolean} esError Si es un mensaje de error
 * @param {boolean} redireccionar Si debe redireccionar
 * @param {string} url URL a la que redireccionar
 */
export function mostrarMensaje(mensaje, esError = false, redireccionar = false, url = '') {
    const resultElement = document.getElementById('result');
    if (!resultElement) return;
    
    resultElement.textContent = mensaje;
    resultElement.className = esError ? 
        'alert alert--danger' : 
        'alert alert--success';
    resultElement.style.display = 'block';
    
    if (redireccionar && url) {
        setTimeout(() => {
            window.location.href = url;
        }, 1500);
    }
}

/**
 * Obtiene un parámetro de la URL
 * @param {string} nombre Nombre del parámetro
 * @returns {string|null} Valor del parámetro o null si no existe
 */
export function obtenerParametroURL(nombre) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nombre);
}

/**
 * Registra una actividad en la sesión
 * @param {string} accion Acción realizada (crear, editar, eliminar)
 * @param {string} tipo Tipo de objeto (cliente, mascota, producto)
 * @param {string} nombre Nombre del objeto
 */
export function registrarActividad(accion, tipo, nombre) {
    // Obtener actividades existentes o inicializar array
    const actividades = JSON.parse(localStorage.getItem('actividades') || '[]');
    
    // Añadir nueva actividad
    actividades.unshift({
        accion,
        tipo,
        nombre,
        fecha: new Date().toISOString()
    });
    
    // Mantener solo las últimas 10 actividades
    if (actividades.length > 10) {
        actividades.length = 10;
    }
    
    // Guardar en localStorage
    localStorage.setItem('actividades', JSON.stringify(actividades));
}