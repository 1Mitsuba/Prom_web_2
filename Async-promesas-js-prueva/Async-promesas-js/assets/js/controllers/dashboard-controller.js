import { clienteService } from '../services/cliente-service.js';
import { petService } from '../services/pet-service.js';
import { productoService } from '../services/producto-service.js';

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Mostrar animación de carga
        const productosElement = document.getElementById('productos-count');
        const clientesElement = document.getElementById('clientes-count');
        const mascotasElement = document.getElementById('mascotas-count');
        
        if (productosElement) productosElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        if (clientesElement) clientesElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        if (mascotasElement) mascotasElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        // Obtener datos en paralelo para mayor eficiencia
        const [productos, clientes, mascotas] = await Promise.all([
            productoService.listarProductos(),
            clienteService.listarClientes(),
            petService.listarMascotas()
        ]);
        
        // Actualizar contadores con animación
        if (productosElement) animateCounter(productosElement, productos.length);
        if (clientesElement) animateCounter(clientesElement, clientes.length);
        if (mascotasElement) animateCounter(mascotasElement, mascotas.length);
        
        // Cargar actividades recientes
        cargarActividadesRecientes();
        
    } catch (error) {
        console.error("Error cargando datos del dashboard:", error);
        
        // Mostrar mensaje de error en los contadores
        const errorMessage = '<span class="text-danger">Error</span>';
        const elements = [
            document.getElementById('productos-count'),
            document.getElementById('clientes-count'),
            document.getElementById('mascotas-count')
        ];
        
        elements.forEach(el => {
            if (el) el.innerHTML = errorMessage;
        });
    }
});

/**
 * Anima un contador desde 0 hasta el valor final
 * @param {HTMLElement} element - Elemento donde mostrar el contador
 * @param {number} finalValue - Valor final del contador
 */
function animateCounter(element, finalValue) {
    // Si el valor es 0, simplemente mostrarlo
    if (finalValue === 0) {
        element.textContent = '0';
        return;
    }
    
    let currentValue = 0;
    const duration = 1000; // 1 segundo
    const steps = 20;
    const increment = Math.max(1, Math.floor(finalValue / steps));
    const stepTime = duration / steps;
    
    const timer = setInterval(() => {
        currentValue += increment;
        
        // Si llegamos o superamos el valor final, mostrar el valor final y detener
        if (currentValue >= finalValue) {
            clearInterval(timer);
            element.textContent = finalValue;
        } else {
            element.textContent = currentValue;
        }
    }, stepTime);
}

/**
 * Carga y muestra las actividades recientes
 */
function cargarActividadesRecientes() {
    const actividadListElement = document.getElementById('activity-list');
    if (!actividadListElement) return;
    
    try {
        const actividadesGuardadas = localStorage.getItem('actividades_recientes');
        const actividades = actividadesGuardadas ? JSON.parse(actividadesGuardadas) : [];
        
        if (actividades.length === 0) {
            // Mostrar mensaje de que no hay actividades
            actividadListElement.innerHTML = `
                <div class="activity-empty">
                    <p>No hay actividad reciente para mostrar</p>
                </div>
            `;
            return;
        }
        
        // Vaciar el contenedor
        actividadListElement.innerHTML = '';
        
        // Iconos para los diferentes tipos de actividades
        const iconos = {
            'crear': 'fa-plus-circle text-success',
            'editar': 'fa-edit text-primary',
            'eliminar': 'fa-trash-alt text-danger'
        };
        
        // Nombres de entidades para mostrar
        const nombreEntidad = {
            'cliente': 'Cliente',
            'mascota': 'Mascota',
            'producto': 'Producto'
        };
        
        // Mostrar cada actividad
        actividades.forEach(actividad => {
            const fecha = new Date(actividad.fecha);
            const ahora = new Date();
            
            // Formatear la fecha/hora relativa
            let tiempoRelativo;
            const diffMinutos = Math.round((ahora - fecha) / (1000 * 60));
            
            if (diffMinutos < 1) {
                tiempoRelativo = 'Justo ahora';
            } else if (diffMinutos < 60) {
                tiempoRelativo = `Hace ${diffMinutos} ${diffMinutos === 1 ? 'minuto' : 'minutos'}`;
            } else if (diffMinutos < 1440) {
                const horas = Math.floor(diffMinutos / 60);
                tiempoRelativo = `Hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
            } else {
                const dias = Math.floor(diffMinutos / 1440);
                tiempoRelativo = `Hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
            }
            
            const icono = iconos[actividad.tipo] || 'fa-circle';
            const entidad = nombreEntidad[actividad.entidad] || actividad.entidad;
            
            const itemHTML = `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fas ${icono}"></i>
                    </div>
                    <p class="activity-text">
                        <strong>${entidad}:</strong> ${actividad.nombre} 
                        <span class="activity-action">${actividad.tipo}</span>
                    </p>
                    <span class="activity-time">${tiempoRelativo}</span>
                </div>
            `;
            
            actividadListElement.innerHTML += itemHTML;
        });
    } catch (error) {
        console.error("Error al cargar actividades:", error);
        actividadListElement.innerHTML = `
            <div class="error-message">
                <p>Error al cargar actividades recientes</p>
            </div>
        `;
    }
}