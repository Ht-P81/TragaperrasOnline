
// ---------------------------------------Variables---------------------------------------
//Creamos el array donde cada elemento es cada una de las imágenes.
let imagenes=["aguacate.png", "ajo.png" , "cebolla.png", "pepino.png", "puerro.png", "tomate.png", "zanahoria.png"];

//Creamos otro array que almacene los números generados para mostrarlos.
let aleatorios=[];


//------------------------------------------Funciones------------------------------------------
//Creamos función del botón que llamamos por el id del elemento: boton__tirar
function comienzo(){
    document.getElementById("boton__tirar").onclick=lanzamiento;   
}

//Variable asignada para otorgar funcionalidad al botón Start
let start_button = document.getElementById("boton__monedas")
//Función que permite saber el numero de monedas introducidas por el usuario para jugar
start_button.addEventListener('click', ()=> {
    let input = document.getElementById('input-monedas')
    let inputcheckbox = document.getElementById('chck').checked;
    
    if (!inputcheckbox) {
        alert('Debes declarar que eres mayor de edad.')
    }else if (input.value != "") {
        document.getElementById('monedas__numero').textContent = input.value;
        input.setAttribute('disabled', 'true')
        input.value = "";

    }else {
        alert('Debes introducir una cantidad de monedas.')
    }
})

//Creamos funcionalidad al botón lanzamiento con su función
function lanzamiento(){
    //Condicion que el número de la casilla sea mayor a 0
    if (parseInt(document.getElementById('monedas__numero').textContent) > 0){
        aleatorios=[];
        const totalReemplaza = document.getElementsByClassName("reemplaza").length
        //Bucle for recorremos los elementos 
        for ( let i = 0; i<totalReemplaza; i++){
            //genere un aleatorio
            const rdn = imagenAleatoria();
            aleatorios.push(rdn);
            //Invocamos función mostrar imagen
            mostrar_imagen(i, aleatorios[i]);
        }

        //Invocamos función que compara imágenes.
        compararImagenes();
        let credit = document.getElementById('monedas__numero').textContent
        credit = parseInt(credit)
        document.getElementById('monedas__numero').textContent = credit - 1
    }else {
        alert("No tienes mas monedas, introduzca monedas y pulse Start")
        let inp = document.getElementById('input-monedas');
        inp.removeAttribute('disabled')
    }
}

//Funcion generar número entero de los indices de las imagenes
function imagenAleatoria(){
    return Math.floor(Math.random()*imagenes.length);
}

//Función que muestra imagen
//Parámetro barra -->Imagen en cada columna, con atributo data-value, añade valor y hace comprobación
//Parámetro indiceImagen --> indice de imagen del array, valor data-value, agrega valores-premiados
function mostrar_imagen(barra, indiceImagen){
    //Cambio de imagen
    const containerImagen = document.querySelectorAll(".imagen")[barra]
    const imagen = containerImagen.children[0]
    imagen.src = `${imagenes[indiceImagen]}`;
    imagen.setAttribute('data-value', indiceImagen);
}

//Función que compara imagenes y asigna valores para el acumulado
function compararImagenes(){
    const acumulado = document.getElementById("acumulado__numero");
    const valor = Number(acumulado.innerText);
    const cuadro1 = document.getElementById('cuadro1').getAttribute('data-value');
    const cuadro2 = document.getElementById('cuadro2').getAttribute('data-value');
    const cuadro3 = document.getElementById('cuadro3').getAttribute('data-value');
    //-----------------------------Condicionales que aportan valor a los imágenes-----------------------------
    //Si los tres cuadrados tienen
    if(cuadro1 === cuadro2 === cuadro3){

        if(cuadro1 === '6'){
            //3 zanahorias --> 10 monedas
            acumulado.textContent=valor + 10 ;
                      
        }else{
            //3 hortalizas iguales --> 2 monedas
            acumulado.textContent=valor + 2  ;                
        }
    }else if(cuadro1 === cuadro2 || cuadro1 === cuadro3 || cuadro2 === cuadro3) {
    
        if(cuadro1 === '6' || cuadro2 === '6'){
            //2 zanahorias --> 4 monedas
            acumulado.textContent=valor + 4  ;                
        }else{
            //2 hortalizas iguales --> 2 monedas 
            acumulado.textContent=valor + 2  ;   
        }
    }else if(cuadro1 === '6' || cuadro2 === '6' || cuadro3 === '6'){
        if(cuadro1 === cuadro2 || cuadro1 === cuadro3 || cuadro2 === cuadro3){
            //1 zanahoria y dos  hortalizas iguales --> 3 monedas 
            acumulado.textContent=valor + 3  ;
        }else{
            //1 zanahoria --> 1
            acumulado.textContent=valor + 1  ;   
        }

    }
} //hasta aquí la función comparar imagenes

window.addEventListener('load', comienzo);


