/**
 * Controlador para la página de Dashboard
 * Gestiona la visualización de estadísticas y datos recientes
 */

// Importación de los servicios necesarios para el dashboard
import { clientService } from "../service/client-service.js";
import { productoService } from "../service/producto-service.js";
import { petService } from "../service/pet-service.js";

// Función principal para cargar todos los datos del dashboard
const cargarDashboard = async () => {
  try {
    // Obtenemos todos los datos necesarios de manera asíncrona
    const clientes = await clientService.listaClientes();
    const productos = await productoService.listaProductos();
    const pets = await petService.listaPets();
    
    // Actualizamos los contadores en la interfaz con el total de cada elemento
    document.querySelector('[data-total-clientes]').textContent = clientes.length;
    document.querySelector('[data-total-productos]').textContent = productos.length;
    document.querySelector('[data-total-pets]').textContent = pets.length;
    
    // Cargamos los datos recientes en sus respectivas tablas
    cargarClientesRecientes(clientes);
    cargarProductosRecientes(productos);
    cargarMascotasRecientes(pets);
    
  } catch (error) {
    // Si ocurre algún error, lo registramos y mostramos un mensaje
    console.error("Error al cargar datos del dashboard:", error);
    mostrarError("No se pudieron cargar los datos del dashboard");
  }
};

// Función para cargar los clientes recientes en la tabla correspondiente
const cargarClientesRecientes = (clientes) => {
  // Obtenemos la referencia a la tabla de clientes
  const tablaClientes = document.querySelector('#recent-clients tbody');
  
  // Verificamos si existe la tabla en el DOM
  if (!tablaClientes) return;
  
  // Limpiamos cualquier contenido previo de la tabla
  tablaClientes.innerHTML = '';
  
  // Verificamos si hay clientes para mostrar
  if (clientes.length === 0) {
    // Si no hay clientes, mostramos un mensaje informativo
    tablaClientes.innerHTML = '<tr><td colspan="2">No hay clientes registrados</td></tr>';
    return;
  }
  
  // Mostramos sólo los 5 clientes más recientes
  const clientesRecientes = clientes.slice(-5).reverse();
  
  // Creamos una fila para cada cliente y la añadimos a la tabla
  clientesRecientes.forEach(cliente => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cliente.nombre}</td>
      <td>${cliente.email}</td>
    `;
    tablaClientes.appendChild(row);
  });
};

// Función para cargar los productos recientes en la tabla correspondiente
const cargarProductosRecientes = (productos) => {
  // Obtenemos la referencia a la tabla de productos
  const tablaProductos = document.querySelector('#recent-products tbody');
  
  // Verificamos si existe la tabla en el DOM
  if (!tablaProductos) return;
  
  // Limpiamos cualquier contenido previo de la tabla
  tablaProductos.innerHTML = '';
  
  // Verificamos si hay productos para mostrar
  if (productos.length === 0) {
    // Si no hay productos, mostramos un mensaje informativo
    tablaProductos.innerHTML = '<tr><td colspan="2">No hay productos registrados</td></tr>';
    return;
  }
  
  // Mostramos sólo los 5 productos más recientes
  const productosRecientes = productos.slice(-5).reverse();
  
  // Creamos una fila para cada producto y la añadimos a la tabla
  productosRecientes.forEach(producto => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
    `;
    tablaProductos.appendChild(row);
  });
};

// Función para cargar las mascotas recientes en la tabla correspondiente
const cargarMascotasRecientes = (pets) => {
  // Obtenemos la referencia a la tabla de mascotas
  const tablaPets = document.querySelector('#recent-pets tbody');
  
  // Verificamos si existe la tabla en el DOM
  if (!tablaPets) return;
  
  // Limpiamos cualquier contenido previo de la tabla
  tablaPets.innerHTML = '';
  
  // Verificamos si hay mascotas para mostrar
  if (pets.length === 0) {
    // Si no hay mascotas, mostramos un mensaje informativo
    tablaPets.innerHTML = '<tr><td colspan="3">No hay mascotas registradas</td></tr>';
    return;
  }
  
  // Mostramos sólo las 5 mascotas más recientes
  const petsRecientes = pets.slice(-5).reverse();
  
  // Creamos una fila para cada mascota y la añadimos a la tabla
  petsRecientes.forEach(pet => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${pet.nombre}</td>
      <td>${pet.raza}</td>
      <td>${pet.propietario || 'No asignado'}</td>
    `;
    tablaPets.appendChild(row);
  });
};

// Función para mostrar mensajes de error en el dashboard
const mostrarError = (mensaje) => {
  // Creamos un elemento para mostrar el error
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error-message');
  errorDiv.textContent = mensaje;
  
  // Buscamos el contenedor del dashboard para añadir el mensaje
  const dashboard = document.querySelector('.dashboard');
  if (dashboard) {
    // Si existe el dashboard, añadimos el mensaje al mismo
    dashboard.appendChild(errorDiv);
  } else {
    // Si no existe, mostramos el error en la consola
    console.error(mensaje);
  }
};

// Iniciamos la carga del dashboard cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', cargarDashboard);