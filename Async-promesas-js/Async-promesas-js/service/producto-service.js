/**
 * Servicio para gestionar productos en la tienda
 * Contiene todas las operaciones CRUD para productos
 */

// Función para listar todos los productos disponibles en la base de datos
const listaProductos = () => {
  // Realizamos una petición GET a la API de productos
  return fetch("http://localhost:3000/productos")
    // Convertimos la respuesta a formato JSON para manipular los datos
    .then(respuesta => respuesta.json());
};

// Función para crear un nuevo producto en la base de datos
const crearProducto = (nombre, precio, descripcion) => {
  // Realizamos una petición POST a la API con los datos del nuevo producto
  return fetch("http://localhost:3000/productos", {
    // Especificamos el método HTTP para crear recursos
    method: "POST",
    // Definimos las cabeceras para indicar que enviamos JSON
    headers: {
      "Content-Type": "application/json"
    },
    // Convertimos el objeto JavaScript a una cadena JSON
    // Incluimos un ID único generado con uuid
    body: JSON.stringify({ 
      nombre, 
      precio, 
      descripcion, 
      id: uuid.v4() // Generamos un ID único para cada producto
    })
  })
  .then(respuesta => {
    // Verificamos si la respuesta fue exitosa
    if (respuesta.ok) {
      // Si es exitosa, convertimos la respuesta a JSON y la devolvemos
      return respuesta.json();
    }
    // Si hubo un error, lanzamos una excepción
    throw new Error('No se pudo crear el producto');
  });
};

// Función para obtener un producto específico por su ID
const obtenerProducto = (id) => {
  // Realizamos una petición GET a la API con el ID específico
  return fetch(`http://localhost:3000/productos/${id}`)
    // Convertimos la respuesta a formato JSON
    .then(respuesta => respuesta.json());
};

// Función para eliminar un producto por su ID
const eliminarProducto = (id) => {
  // Realizamos una petición DELETE a la API con el ID del producto a eliminar
  return fetch(`http://localhost:3000/productos/${id}`, {
    // Especificamos el método HTTP para eliminar recursos
    method: "DELETE"
  });
};

// Función para actualizar un producto existente
const actualizarProducto = (nombre, precio, descripcion, id) => {
  // Realizamos una petición PUT a la API con los datos actualizados
  return fetch(`http://localhost:3000/productos/${id}`, {
    // Usamos PUT para actualizar recursos existentes
    method: "PUT",
    // Definimos las cabeceras para indicar que enviamos JSON
    headers: {
      "Content-Type": "application/json"
    },
    // Convertimos el objeto con los datos actualizados a una cadena JSON
    body: JSON.stringify({ nombre, precio, descripcion })
  })
  // Convertimos la respuesta a formato JSON
  .then(respuesta => respuesta.json())
  // Capturamos cualquier error que pueda ocurrir
  .catch(error => console.log(error));
};

// Exportamos todas las funciones como un objeto para usarlas en otros archivos
export const productoService = {
  listaProductos,
  crearProducto,
  obtenerProducto,
  eliminarProducto,
  actualizarProducto
};