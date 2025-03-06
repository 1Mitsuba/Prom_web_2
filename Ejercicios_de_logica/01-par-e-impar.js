// Ejercicio 1: Contar pares e impares en un array

console.log(contarParesImpares([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

function contarParesImpares(arr) {
    let par = [];
    let impar = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            par.push(arr[i]);
        } else {
            impar.push(arr[i]);
        }
    }
    return `Pares: (${par}) Impares: (${impar})`;
}

