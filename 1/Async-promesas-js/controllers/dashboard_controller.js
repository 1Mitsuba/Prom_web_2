import { clientServices } from "../service/client-service.js";
import { productoService } from "../service/producto-service.js";
import { petService } from "../service/pet-service.js";

// Versión súper simplificada para diagnóstico
document.addEventListener("DOMContentLoaded", () => {
    console.log("======= INICIANDO DASHBOARD =======");
    
    // Referencias directas a los elementos
    const clienteCountElement = document.querySelector("[data-cliente-count] .stat-number");
    const productoCountElement = document.querySelector("[data-producto-count] .stat-number");
    const petCountElement = document.querySelector("[data-pet-count] .stat-number");
    
    console.log("Elementos encontrados:", {
        clienteCount: !!clienteCountElement,
        productoCount: !!productoCountElement, 
        petCount: !!petCountElement
    });
    
    // Función simplificada para cargar datos
    const cargarDatos = async (servicio, elemento, etiqueta) => {
        try {
            console.log(`Cargando ${etiqueta}...`);
            const datos = await servicio();
            console.log(`${etiqueta} cargados:`, datos);
            
            // Verificación adicional de datos
            if (!Array.isArray(datos)) {
                console.error(`Los datos de ${etiqueta} no son un array:`, datos);
                return 0;
            }
            
            // Actualizar elemento DIRECTAMENTE
            if (elemento) {
                elemento.textContent = datos.length;
                console.log(`✅ ${etiqueta} actualizados: ${datos.length}`);
            } else {
                console.error(`❌ No se encontró el elemento para ${etiqueta}`);
            }
            
            return datos.length;
        } catch (error) {
            console.error(`❌ Error cargando ${etiqueta}:`, error);
            return 0;
        }
    };
    
    // Cargar todos los datos con manejo directo
    const cargarTodo = async () => {
        try {
            // Clientes
            if (clienteCountElement) {
                await cargarDatos(clientServices.listaclientes, clienteCountElement, "Clientes");
            }
            
            // Productos
            if (productoCountElement) {
                await cargarDatos(productoService.listaProductos, productoCountElement, "Productos");
            }
            
            // Mascotas
            if (petCountElement) {
                await cargarDatos(petService.listaPets, petCountElement, "Mascotas");
            }
            
            console.log("🎉 Carga de datos finalizada");
        } catch (error) {
            console.error("Error general:", error);
        }
    };
    
    // Iniciar carga
    cargarTodo();
});