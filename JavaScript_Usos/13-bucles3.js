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
let materiaSeleccionada =' ';
const notaAprobacion = 51;
let i = 0;
for (let i = 0; i < datos.length && notaAprobacion == ' '; i++)
{
    if (datos[i].Calificacion <= notaAprobacion)
    {
        materiaSeleccionada = datos[i].materia;
        break;
    }
}
if (materiaSeleccionada == ' ')
{
    console.log(`No aprobaste la materia ${materiaSeleccionada}`);
}
else
{
    console.log(`Aprobaste la materia ${materiaSeleccionada}`);
}
