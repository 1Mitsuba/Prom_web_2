/**
 * Servicio para gestionar clientes en la plataforma
 * Contiene todas las operaciones CRUD para clientes
 */

// Función para listar todos los clientes registrados
const listaClientes = () => {
  // Realizamos una petición GET a la API de perfiles
  return fetch("http://localhost:3000/perfil")
    // Convertimos la respuesta a formato JSON
    .then(respuesta => respuesta.json())
    // Capturamos cualquier error que pueda ocurrir
    .catch(error => console.log(error));
};

// Función para crear un nuevo cliente en la base de datos
const crearCliente = (nombre, email) => {
  // Realizamos una petición POST a la API con los datos del nuevo cliente
  return fetch("http://localhost:3000/perfil", {
    // Especificamos el método HTTP para crear recursos
    method: "POST",
    // Definimos las cabeceras para indicar que enviamos JSON
    headers: {
      "Content-Type": "application/json"
    },
    // Convertimos el objeto JavaScript a una cadena JSON
    // Incluimos un ID único generado con uuid
    body: JSON.stringify({ nombre, email, id: uuid.v4() })
  });
};

// Función para eliminar un cliente por su ID
const eliminarCliente = (id) => {
  // Realizamos una petición DELETE a la API con el ID del cliente a eliminar
  return fetch(`http://localhost:3000/perfil/${id}`, {
    // Especificamos el método HTTP para eliminar recursos
    method: "DELETE"
  });
};

// Función para obtener un cliente específico por su ID
const clientes = (id) => {
  // Realizamos una petición GET a la API con el ID específico
  return fetch(`http://localhost:3000/perfil/${id}`)
    // Convertimos la respuesta a formato JSON
    .then(respuesta => respuesta.json());
};

// Función para actualizar un cliente existente
const actualizarClientes = (nombre, email, id) => {
  // Realizamos una petición PUT a la API con los datos actualizados
  return fetch(`http://localhost:3000/perfil/${id}`, {
    // Usamos PUT para actualizar recursos existentes
    method: "PUT",
    // Definimos las cabeceras para indicar que enviamos JSON
    headers: {
      "Content-Type": "application/json"
    },
    // Convertimos el objeto con los datos actualizados a una cadena JSON
    body: JSON.stringify({ nombre, email })
  })
  // Convertimos la respuesta a formato JSON
  .then(respuesta => respuesta.json())
  // Capturamos cualquier error que pueda ocurrir
  .catch(error => console.log(error));
};

// Exportamos todas las funciones como un objeto para usarlas en otros archivos
export const clientService = {
  listaClientes,
  crearCliente,
  eliminarCliente,
  clientes,
  actualizarClientes
};