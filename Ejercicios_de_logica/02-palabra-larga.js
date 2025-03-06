// Ejercicio: 2. Crear una función que reciba una frase y devuelva la palabra más larga.
console.log(palabraLarga("Hola mundo desde JavaScript"));

function palabraLarga(frase) {
  let palabras = frase.split(" ");
  let palabraLarga = "";

  for (let i = 0; i < palabras.length; i++) {
    if (palabras[i].length > palabraLarga.length) {
      palabraLarga = palabras[i];
    }
  }

  return palabraLarga;
}