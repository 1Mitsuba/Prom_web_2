const deleteData = () => {
    fetch(`${API_URL}/1`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la petición put el estado es ${response.status}`);
        }
        showResult({
            message:"Registro eliminado",
            status: response.status
        });
    })
    .catch(error => showResult(error.message, true));
};