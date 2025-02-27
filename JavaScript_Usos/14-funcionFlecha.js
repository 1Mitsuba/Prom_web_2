const datos = [
    {
        'materia': 'Programacio web',
        'Calificacion': 20
    },
    {
        'materia': 'Base de datos II',
        'Calificacion': 30
    },
    {
        'materia': 'IoT y Robotica',
        'Calificacion': 40
    },
    {
        'materia': 'Sistemas operativos',
        'Calificacion': 34
    },
    {
        'materia': 'Ingles',
        'Calificacion': 54
    },
    {
        'materia': 'Base de datos I',
        'Calificacion': 30
    },
    {
        'materia': 'Programacion movil',
        'Calificacion': 60
    },
    {
        'materia': 'Programacion III',
        'Calificacion': 40
    },
    {
        'materia': 'Ingles II',
        'Calificacion': 20
    },
    {
        'materia': 'Programacion II',
        'Calificacion': 10
    }
];

const ProcesarDatos = datos => {
    return datos
        .filter(datos => datos.Calificacion > 51)
        .map(datos => {
            const { materia } = datos;
            return materia.length > 5 ? materia.toUpperCase() : materia.toLowerCase();
        });
}
const resultado = ProcesarDatos(datos);
console.log(resultado); // ["PROGRAMACION MOVIL", "PROGRAMACION III"]