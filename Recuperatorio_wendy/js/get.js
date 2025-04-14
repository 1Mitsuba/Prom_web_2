//Enlace recuperado de la terminal despues de levantar el servidor con el comando 
//json-server --watch "D:\progamacion web2\Prom_web_2\ejemplo_http\ejemplo_http\api\db.json" --port 3000
//Endpoints:
//http://localhost:3000/posts
// No volver a definir API_URL, ya está en el HTML
// const API_URL = 'http://localhost:3000/tasks';

const getData = () => {
    console.log("Obteniendo datos...");
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la petición get el estado es ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos:", data);
            // Verificar si la función updateTaskList existe
            if (typeof updateTaskList === 'function') {
                updateTaskList(data);
            } else {
                console.error("La función updateTaskList no está definida");
            }
            // Comentar o eliminar la siguiente línea para evitar el alert
            // showResult("Tareas cargadas correctamente");
        })
        .catch(error => {
            console.error("Error al obtener datos:", error);
            showResult(error.message, true);
        });
};

console.log("get.js cargado");
// Asegurarnos de que el evento DOMContentLoaded se ejecute
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded ejecutado");
    getData();
});
setTimeout(() => {
    console.log("Intentando cargar datos después de timeout");
    getData();
}, 1000);