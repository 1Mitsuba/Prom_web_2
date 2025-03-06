// Ejercicio 6: el numero que mas se repite en un array

console.log(repetido([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1]));

function repetido(arr) {
    let contador = arr[0];
    let repetido = 0;
    for (let i = 0 ; i < arr.length; i++){
        let contador2 = 0;
        for (let j = 0; j < arr.length; j++){
            if (arr[i] === arr[j])
                contador2++;
        }
        if (contador2 > repetido){
            repetido = contador2;
            contador = arr[i];
        }
    }
    return contador;
}