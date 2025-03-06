// Ejercicio: 5. Convertir un numero decimal a binario
console.log(decimalBinario(25));

function decimalBinario(numero) {
  let binario = "";
  let cociente = numero;

  while (cociente > 0) {
    let residuo = cociente % 2;
    binario = residuo + binario;
    cociente = Math.floor(cociente / 2);
  }

  return binario;
}