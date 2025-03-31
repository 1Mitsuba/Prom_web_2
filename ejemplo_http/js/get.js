//Enlace recuperado de la terminal despues de levantar el servidor con el comando 
//json-server --watch "D:\progamacion web2\Prom_web_2\ejemplo_http\ejemplo_http\api\db.json" --port 3000
//Endpoints:
//http://localhost:3000/posts
const API_URL = 'http://localhost:3000/posts';

const getData =() => {
    fetch(API_URL) // conexión a la api 
        .then(response => {
            if (!response.ok) { // si es diferende de ok lanzamos un error   // verificador de errores 
                throw new Error(`Eror en la petición get el estado es ${response.status}`); 
            }
            return response.json(); // cuando es ok devolvemos los datos del json 
        })
        .then(data => showResult(data)) // mostramos el resultado
        .catch(error => showResult(error.message.true)); // si hay un error lo mostramos
};
