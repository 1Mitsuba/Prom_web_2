const ciudadesDisponibles = new Array("Sucre", "Potosi", "Oruro", "La Paz", "Cochabamba", "Santa Cruz");
const precioPasaje = new Array(100, 120, 150, 200, 250, 300);
const precioDispobible = 210;
let i=0;

while ( precioPasaje[i] > precioDispobible && i < ciudadesDisponibles.length)
{
    i++;
}
if (i == ciudadesDisponibles.length)
{
    console.log(`No hay pasajes disponibles`);
}
else
{
    console.log(`se puede comprar pasaje a ${ciudadesDisponibles[i]} por ${precioPasaje[i]}`);
}