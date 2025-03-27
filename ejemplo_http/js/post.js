
const postData = () => { // Función para crear la base de datos
    const newPost = {
        titulo:"Nuevo post",
        descripcion: "Nueva descripción",
        fecha: new Date().toISOString()
    };
    fetch(API_URL, {
        method: 'POST', //todos los metodos en mayusculas
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(newPost),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la petición post el estado es ${response.status}`);
        }
        return response.json();
    })
    .then(data => showResult(data))
    .catch(error => showResult(error.message, true));
};