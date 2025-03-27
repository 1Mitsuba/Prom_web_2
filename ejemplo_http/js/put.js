const putData = () => {
    const updata = {
        titulo: "Actualizado",
        descripcion: "Actualizada",
        fecha: new Date().toISOString()
    };
    fetch(`${API_URL}/1`, {
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