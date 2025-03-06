// Ejercicio 4: numeros primos en un array

console.log(primos(10));
console.log(primos(20));

function primos(numero) {
  let primos = [];

  for (let i = 2; i <= numero; i++) {
    let esPrimo = true;

    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        esPrimo = false;
      }
    }

    if (esPrimo) {
      primos.push(i);
    }
  }

  return primos;
}