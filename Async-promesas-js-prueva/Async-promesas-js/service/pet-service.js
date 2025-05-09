import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// Cambia esta URL para usar el nuevo archivo PHP
const API_BASE_URL = 'http://localhost/api/mascotas.php';

// Listar todas las mascotas
const listaPets = () => {
  console.log("Solicitando lista de mascotas");
  return fetch(API_BASE_URL)
    .then(respuesta => {
      console.log("Respuesta de API mascotas:", respuesta.status);
      if(!respuesta.ok) {
        throw new Error(`Error al listar mascotas: ${respuesta.status}`);
      }
      return respuesta.json();
    })
    .then(data => {
      console.log("Datos de mascotas recibidos:", data.length || 'sin datos');
      // Asegurar que sea un array
      return Array.isArray(data) ? data : [];
    })
    .catch(error => {
      console.error("Error en listaPets:", error);
      // Devolver array vacío para evitar errores en código que consume este servicio
      return [];
    });
};

// Crear nueva mascota - CORREGIDO
const crearPet = (nombre, raza, edad, cliente_id) => {
  // Generar ID único para la mascota
  const id_pet = uuidv4();
  
  // Datos a enviar
  const data = {
    id_pet: id_pet,
    nombre: nombre,
    raza: raza,
    edad: edad,
    id: cliente_id // IMPORTANTE: El campo en la BD es 'id'
  };
  
  console.log("Enviando datos:", data);
  
  // IMPORTANTE: Esto faltaba - el return de la promesa
  return fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    console.log("Respuesta:", response.status);
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(`Error ${response.status}: ${text}`);
      });
    }
    return response.json();
  });
};

// Eliminar mascota
const eliminarPet = (id) => {
  return fetch(`${API_BASE_URL}?id_pet=${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error('Error al eliminar mascota');
    return response.json();
  });
};

// Obtener detalle de mascota
const detallePet = (id) => {
  console.log(`Solicitando detalle de mascota con ID: ${id}`);
  return fetch(`${API_BASE_URL}?id_pet=${id}`)
    .then(response => {
      console.log(`Respuesta del servidor para mascota ${id}:`, response.status);
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`Error ${response.status}: ${text}`);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log(`Datos recibidos para mascota ${id}:`, data);
      return data;
    })
    .catch(error => {
      console.error(`Error en detallePet(${id}):`, error);
      throw error;
    });
};

// Obtener mascotas por cliente
const petsPorCliente = (cliente_id) => {
  return fetch(`${API_BASE_URL}?id=${cliente_id}`)
  .then(response => {
    if (!response.ok) throw new Error('Error al obtener mascotas por cliente');
    return response.json();
  });
};

// Actualizar mascota
const actualizarPet = (id_pet, nombre, raza, edad, cliente_id) => {
  console.log("Actualizando mascota:", { id_pet, nombre, raza, edad, cliente_id });
  
  // Datos a enviar
  const data = {
    id_pet: id_pet,
    nombre: nombre,
    raza: raza,
    edad: edad,
    id: cliente_id // IMPORTANTE: Es 'id', no 'cliente_id'
  };
  
  // Enviar petición PUT
  return fetch(API_BASE_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    console.log("Respuesta:", response.status);
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(`Error ${response.status}: ${text}`);
      });
    }
    return response.json();
  })
  .catch(error => {
    console.error("Error en actualizarPet:", error);
    throw error;
  });
};

// Exportar servicios
export const petService = {
  listaPets,
  crearPet,
  eliminarPet,
  detallePet,
  petsPorCliente,
  actualizarPet
};