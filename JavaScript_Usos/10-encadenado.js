const ciudadDestino = "Sucre";
const ciudadesDisponibles = new Array("Sucre", "Potosi", "Oruro", "La Paz", "Cochabamba", "Santa Cruz");

let edad = 17;
let conpania = false;

if (edad >= 18 || conpania) 
{
    if (ciudadDestino.indexOf(ciudadesDisponibles) >= 1) 
    {
        console.log(`Pasaje a ${ciudadDestino} disponible`);
    }
    else 
    {
        console.log(`Pasaje a ${ciudadDestino} no disponible`);
    }
}
else 
{
    if (edad >= 16 && ciudadDestino === "Sucre")
    {
        console.log(`Pasaje a ${ciudadDestino} disponible`);
    }
    else 
    {
        console.log(`Pasaje a ${ciudadDestino} no disponible`);
    }
}