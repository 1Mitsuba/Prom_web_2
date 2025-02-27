let edadPersonal = 17;
let conAcompanante = true;
const precioPasaje = 1000;
const ciudadDestino = "Sucre";
const ciudadesDisponibles = new Array("Sucre", "Potosi", "Oruro", "La Paz", "Cochabamba", "Santa Cruz");


if (precioPasaje === 1000) 
{
    console.log('El precio del pasaje es de 1000 ');
}
else 
{
    console.log("El precio del pasaje no es de 1000 Bs.");
}

console.log(`Verificar pasaje para ${ciudadDestino}`);
if ((ciudadesDisponibles.indexOf(ciudadDestino) >= 1) && (edadPersonal >= 18) || (conAcompanante ) )
{
    console.log(`Pasaje a ${ciudadDestino} disponible`);
}
else 
{
    console.log(`Pasaje a ${ciudadDestino} no disponible`);
}