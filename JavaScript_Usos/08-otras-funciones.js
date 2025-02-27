const ciudadesDisponibles = new Array("Santiago","Bogota","lima","Montevideo");

const paisesDisponibles = new Array("Chile","Colombia","Peru","Uruguay");

const cantidadCiudades = ciudadesDisponibles.length;

const cantidadPaises = paisesDisponibles.length;

console.log(` Cantidad de ciudades disponibles: ${cantidadCiudades.length} elementos`);
console.log(` Cantidad de paises disponibles: ${cantidadPaises.length} elementos`);

// quitar el primer elemento de un arraay

ciudadesDisponibles.shift();
console.log(`Ciudades disponibles: ${ciudadesDisponibles.length} elementos`);
console.log(ciudadesDisponibles);
// quitar el ultimo elemento de un array

paisesDisponibles.pop();
console.log(`Paises disponibles: ${paisesDisponibles.length} elementos`);
console.log(paisesDisponibles);

//ordemar un array
console.log(ciudadesDisponibles.sort());
//posicion de un elemento en un array
console.log(` Lima esta en la posicion ${paisesDisponibles.indexOf("peru")}`);
//concatenar dos listas
const listaCompleta = ciudadesDisponibles.concat(paisesDisponibles);
console.log(listaCompleta);