// Ejercicio: 5. Convertir un numero decimal a binario
console.log(decimalBinario(255));

function decimalBinario(num) {
  let binario = [];
  if (num === 0) return "0";
  while (num > 0){
    binario[binario.length] = num % 2;
    num = (num - num % 2) / 2;
  }
  let resultado = "";
  for (let i = binario.length - 1; i >= 0; i--){
    resultado += binario[i];
  }
  return resultado;
}