// Ejercicio: 7. Suma una propiedad especifica de un array de objetos

const objetos = [
    { 'x': 1 },
    { 'x': 2 },
    { 'x': 3 },
    { 'x': 4 },
    { 'x': 5 }
];

console.log(sumaPropiedad(objetos, "x"));

function sumaPropiedad(objetos, propiedad) {
  let suma = 0;

  for (let i = 0; i < objetos.length; i++) {
    suma += objetos[i][propiedad];
  }

  return suma;
}
