// Ejercicio 3: Invertir un numero
console.log(inversa(4178571));
console.log(inversa(123456789));

function inversa(numero) {
  let numeroInverso = "";
  let numeroString = numero.toString();

  for (let i = numeroString.length - 1; i >= 0; i--) {
    numeroInverso += numeroString[i];
  }

  return parseInt(numeroInverso);
}