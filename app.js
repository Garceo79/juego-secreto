//Definir variables apartir del uso de Document Object Model donde relaciono el archivo HTML con el archivo Java

/*let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un número del 1 al 10';*/

//Se establece el valor de la variable usando una función
let numeroSecreto = generarNumeroSecreto();
let intentos = 1;
//Variable para crear un array 
let listaNumeroSorteados = [];
let numeroMaximo = 10;

//Declarar la función
/*Se simplifica las variables establecidas dentro un método para que sea más sencillo usarla/
Está función nos permite establecer texto en direfentes partes del código HTML*/
function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}


//Función para generar un número de forma aleatoria
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    //Si ya sorteamos todos los números
    /*En la siguiente función "if" se verifica los numeros sorteados con el numero máximo de intentos para no tener una
    recursividad infinita*/
    console.log(listaNumeroSorteados.length)
    console.log(listaNumeroSorteados)
    if (listaNumeroSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles')
    }else{
        //Si el número generado está incluido en la lista
        if(listaNumeroSorteados.includes(numeroGenerado)) {
            //Al tener el número generado en la lista se genera una recursividad (el "if" vuelve a ejecutar la misma función donde está anidado)
            return generarNumeroSecreto();
        }else{
            //Si el número generado es diferente a los que se tienen en la lista guarda el número y lo aplica al juego
            listaNumeroSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

//Función para guardar el número seleccionado por el usuario
function verificarIntento(){
    let numeroDeUsuario =  parseInt(document.getElementById('valorUsuario').value);
    //console.log(numeroDeUsuario);
    //console.log (typeof(numeroDeUsuario));
    console.log(numeroSecreto);
    //console.log (typeof(numeroSecreto));
    //console.log(numeroDeUsuario === numeroSecreto);
    //console.log(intentos);
    //condicional para compara numero e imprimir mensaje de que acerto
    if(numeroDeUsuario === numeroSecreto){
        asignarTextoElemento ('p', `Acertaste el número ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`)
        //habilita el boton 'reiniciar juego'
        document.getElementById('reiniciar').removeAttribute('disabled')
    }else{
        //condicional mensaje de que no acerto y dar pista
        if(numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p', 'El número secreto es menor');
        }else{
            asignarTextoElemento('p', 'El número secreto es mayor')
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

//Borrar número después de hacer click en botón 'intentar'
function limpiarCaja() {
    /*
    let valorCaja = document.querySelector('#valorUsuario')
    valorCaja.value = '';
    */
    document.querySelector('#valorUsuario').value = '';
    
}

//Función mensajes iniciales
function condicionesIniciales() {
    //Llamado de las funciones para establecer los valores de los parametros declarados en mi función 'asignarTextoElementos'
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Generar número aleatorio
    //numeroSecreto = generarNumeroSecreto(); /cambian a la función condiciones iniciales
    //Iniciarlizar número de intentos
    //intentos = 1; / cambian a la función condiciones iniciales
    //Indicar mensaje de intervalo de numeros
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true')
}

condicionesIniciales();
