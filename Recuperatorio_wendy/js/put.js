const putData = () => {
    const updata = {
        task:"Nuevo post",
        priori: "Nueva descripción",
        fecha: new Date().toISOString(),
        valor: 3
    };
    fetch(`${API_URL}/1`, { // 2 es el id del db.json que queremos actualizar
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(updata),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la petición put el estado es ${response.status}`);
        }
        return response.json();
    })
    .then(data => showResult(data))
    .catch(error => showResult(error.message, true));
};