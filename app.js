//ELEMENTOS TRAIDOS DEL HTML
let contenedorDeContenedores = document.getElementById("contenedorDeContenedores")
let botonAgregarContenedor = document.getElementById("botonAgregarContenedor");
let botonCargarTablero = document.getElementById("botonCargarTablero");
let botonGuardarTablero = document.getElementById("botonGuardarTablero");

//SE DECLARAN LOS ELEMENTOS QUE COMPONENE LOS CONTENEDORES DE TAREAS COMO VARIABLES GLOBALES
let macroContenedor = null;

let contenedorSubtitulo = null;
    let contenedorSubtitulo_l1 = null;
        let subTitulo = null;
        let botonEliminarContenedor = null;
    let contenedorSubtitulo_l2 = null;
        let inputTarea = null;
        let botonAgregarTarea = null;
    
let textoContador = null;
let contenedorTareasListadas = null;

//SE DECLARAN LOS ELEMENTOS QUE SIRVEN PARA IDENTIFICAR DONDE OCURREN LAS ACCIONES COMO VARIABLES GLOBALES
let boton = null;
let check = null;

//SE DECLARAN LOS ELEMENTOS QUE COMPONENE EL CONTENEDOR TAREA LISTADA COMO VARIABLES GLOBALES
let tareaListada = null;
    let tareaListada_l1 = null;  
        let textoTarea = null;
        let botonEliminarTarea = null;
        let botonConfigTarea = null;
    let tareaListada_l2
        let pesoTarea = null;
        let estado_2 = null;
        let fechaInicio = null;
        let fechaFin = null;
        let responsable = null;

let colorTareaListada = null;
  

// FUNCIONES
function funcionAgregarContenedor(){

    // Creamos el macro contenedor y se le asigna un ID unico
    macroContenedor = document.createElement("div");
    macroContenedor.id = "macroContenedor-"+Date.now();
    macroContenedor.classList.add("macroContenedor");

    // Creamos el contenedor subtitulo
    contenedorSubtitulo = document.createElement("div");
    contenedorSubtitulo.classList.add("contenedorSubTitulo");

    // Linea 1
    contenedorSubtitulo_l1 = document.createElement("div");
    contenedorSubtitulo_l1.classList.add("contenedorSubTitulo_l1");
        // Creamos el input para subtitulo   
    subTitulo = document.createElement("input");
    subTitulo.classList.add("subTitulo");
    subTitulo.setAttribute("placeholder", "Proceso...")
        // Se agrega el listener al boton inmediatamente es creado y se le asigna funcion de remover
        // el macro contenedor creado en la primera linea
    botonEliminarContenedor = document.createElement("button");
    botonEliminarContenedor.textContent = "x"
    botonEliminarContenedor.classList.add("botonEliminarContenedor");
    botonEliminarContenedor.addEventListener("click", funcionEliminarContenedor);

    // Linea 2
    contenedorSubtitulo_l2 = document.createElement("div");
    contenedorSubtitulo_l2.classList.add("contenedorSubTitulo_l2");
        // Creamos el input tarea
    inputTarea = document.createElement("textarea");
    inputTarea.classList.add("inputTarea");
    inputTarea.setAttribute("placeholder", "Escribir tarea...")
        // Boton agregar tarea, se asigna el event listener inmediatamente despues de ser creado
        // se llama la funcionAgregarTarea
    botonAgregarTarea = document.createElement("button");
    botonAgregarTarea.textContent = "+";
    botonAgregarTarea.classList.add("botonAgregarTarea");
    botonAgregarTarea.addEventListener("click", funcionAgregarTarea);

    // Creamos el contenedor de las tareas
    contenedorTareas = document.createElement("div");
    contenedorTareas.classList.add("contenedorTareas");
        // Creamos el texto contador
    textoContador = document.createElement("p");
    textoContador.innerHTML = "[ "+" ]";
    textoContador.classList.add("textoContador");
        // Creamos el contenedor de tareas listadas
    contenedorTareasListadas = document.createElement("div");
    contenedorTareasListadas.classList.add("contenedorTareasListadas");

    // ENSAMBLAMOS TODO

    // Ensamblamos subtitlo
    contenedorSubtitulo_l1.appendChild(subTitulo);
    contenedorSubtitulo_l1.appendChild(botonEliminarContenedor);
    contenedorSubtitulo_l2.appendChild(inputTarea);
    contenedorSubtitulo_l2.appendChild(botonAgregarTarea);
    
    contenedorSubtitulo.appendChild(contenedorSubtitulo_l1);
    contenedorSubtitulo.appendChild(contenedorSubtitulo_l2);
    

    // ensamblamos el contendor de tareas
    contenedorTareas.appendChild(textoContador);
    contenedorTareas.appendChild(contenedorTareasListadas);

    // Agregamos al macroContenedor el contenedor de subtitulo
    macroContenedor.appendChild(contenedorSubtitulo);

    // Agregamos al macroContenedor contenedor de tareas
    macroContenedor.appendChild(contenedorTareas);

    // Contenedor de contenedores recibe el macroContenedor
    contenedorDeContenedores.appendChild(macroContenedor);
    
    console.log("Se ha agregado un macroContenedor: ", macroContenedor.id);
}

function funcionEliminarContenedor(event){
    // se utiliza el objeto event para usar la propiedad target
    // Aca identificamos en que macrContenedeor donde se disparo la accion
    boton = event.target;
    macroContenedor = boton.closest(".macroContenedor");

    macroContenedor.remove();
    console.log("Se ha eliminado una macroContenedor: ", macroContenedor.id);
    
    funcionActualizarContadores();
}

function funcionAgregarTarea(event){

    //se utiliza el objeto event para usar la propiedad target
    
    // Aca identificamos en que macroContenedor se da la accion
    boton = event.target;
    macroContenedor = boton.closest(".macroContenedor")

    // Dentro del macro contenedor identificamos la variable de texto para crear la tarea
    inputTarea = macroContenedor.querySelector(".inputTarea")

    // Indentificamos a que contendeor de pendeintes debe ir la tarea
    contenedorTareasListadas = macroContenedor.querySelector(".contenedorTareasListadas");
    
    // Tomamos el valor del input luego de haberlo ubicado en las lineas anteriores
    let textoInput = inputTarea.value.trim();
     
    // Creamos los elementos que componen la tarea
    tareaListada = document.createElement("div");
    tareaListada.id = "tareaListada-"+Date.now();
    tareaListada.classList.add("tareaListada");
    tareaListada.setAttribute("draggable", true);

    // Creamos linea 1 del contenedor tareaListada
    tareaListada_l1 = document.createElement("div");
    tareaListada_l1.classList.add("tareaListada_l1");

        // Crear campo textoTarea
    textoTarea = document.createElement("textarea");
    textoTarea.value = textoInput;
    textoTarea.classList.add("textoTarea");
    textoTarea.setAttribute("rows", 2);


    // Creamos linea 2 del contenedor tareaListada
    tareaListada_l2 = document.createElement("div");
    tareaListada_l2.classList.add("tareaListada_l2");

        // Crear campo de peso
    pesoTarea = document.createElement("input");
    pesoTarea.classList.add("pesoTarea");
    pesoTarea.setAttribute("placeholder", "pesoTarea")

        // Crear campo de estado_2
    estado_2 = document.createElement("input");
    estado_2.classList.add("estado_2");
    estado_2.setAttribute("type", "text");
    estado_2.setAttribute("placeholder", "estado_2")

        // Crear campo de fecha de inicio
    fechaInicio = document.createElement("input");
    fechaInicio.classList.add("fechaInicio");
    fechaInicio.setAttribute("type", "date");

        // Crear campo de fecha de final
    fechaFin = document.createElement("input");
    fechaFin.classList.add("fechaFin");
    fechaFin.setAttribute("type", "date");

        // Crear campo de responsable
    responsable = document.createElement("input");
    responsable.classList.add("responsable");
    responsable.setAttribute("type", "text");
    responsable.setAttribute("placeholder", "responsable")

        // crear Boton eliminar
    botonEliminarTarea = document.createElement("button");
    botonEliminarTarea.textContent = "x";
    botonEliminarTarea.classList.add("botonEliminarTarea");
    botonEliminarTarea.addEventListener("click", funcionEliminarTarea);

        // crear boton configurar
    botonConfigTarea = document.createElement("button");
    botonConfigTarea.textContent = "⛭";
    botonConfigTarea.classList.add("botonConfigTarea");
    botonConfigTarea.addEventListener("click", funcionDialogoColoresTareas);

    // Ensamblamos
    tareaListada.appendChild(tareaListada_l1);
    tareaListada.appendChild(tareaListada_l2);

    tareaListada_l1.appendChild(textoTarea);
    tareaListada_l1.appendChild(botonEliminarTarea);
    tareaListada_l1.appendChild(botonConfigTarea);
   
    tareaListada_l2.appendChild(pesoTarea);
    tareaListada_l2.appendChild(estado_2);
    tareaListada_l2.appendChild(fechaInicio);
    tareaListada_l2.appendChild(fechaFin);
    tareaListada_l2.appendChild(responsable);
    tareaListada_l2.appendChild(botonEliminarTarea);
    tareaListada_l2.appendChild(botonConfigTarea);


    // asignar color por defecto
    colorTareaListada = "rgb(230, 230, 230)" 
    tareaListada.style.backgroundColor = colorTareaListada;
    // Agregamos la tarea listada al contenedor que identificamos en las primeras lineas
    contenedorTareasListadas.appendChild(tareaListada);

    console.log("se ha agregado una tarea: ", tareaListada.id)
    //Limpiamos el input
    inputTarea.value = "";
}

function funcionEliminarTarea(event){
    // Se utiliza el objeto event para usar la propiedad target
    // Aca identificamos en que macrContenedeor donde se disparo la accion
    boton = event.target;
    macroContenedor = boton.closest(".macroContenedor");

     // Dentro del macroContenedor identificamos la tarea listada usando el elemnto boton que disparo el evento
    tareaListada = boton.closest(".tareaListada");

    tareaListada.remove();
    console.log("Se ha eliminado una tarea: ", tareaListada.id);

    funcionActualizarContadores();
}

function funcionDialogoColoresTareas(event){
    /// Se utiliza el objeto event para usar la propiedad target
    // Aca identificamos en que macrContenedeor donde se disparo la accion
    boton = event.target;
    macroContenedor = boton.closest(".macroContenedor");

     // Dentro del macroContenedor identificamos la tarea listada usando el elemnto boton que disparo el evento
    tareaListada = boton.closest(".tareaListada");

    let ventana = document.createElement("dialog");
    ventana.classList.add("ventanaEmergente")
    ventana.innerHTML = `
        <h1 class= "textoVentana" >Seleccione un color</h1>
        <button class = "color_1"></button>
        <button class = "color_2"></button>
        <button class = "color_3"></button>
        <button class = "color_4"></button>
        <button class = "color_5"></button>
    `;
    
    // Abrir modal
    document.body.appendChild(ventana);
    ventana.showModal();

    // Cerrar modal
    ventana.querySelectorAll(".color_1, .color_2, .color_3, .color_4, .color_5").forEach(boton => {
        boton.addEventListener("click", () => {
            let estilo = window.getComputedStyle(boton)
            let color = estilo.backgroundColor;
            console.log("Elegiste:", boton.className, "RGB: ",color);
            
            // Cerrar y remover la ventana en el DOM
            ventana.close();
            ventana.remove();

            // Asignar el color elegido
            tareaListada.style.backgroundColor = color;
        });
    });
}

function funcionDragDropSort() {
    
    let tareas = document.querySelectorAll(".tareaListada");
    let contenedores = document.querySelectorAll(".contenedorTareasListadas");

    // Comportamiento en tareas
    tareas.forEach(tarea => {
        
        tarea.addEventListener("dragstart", function(e){
            e.dataTransfer.setData("id", e.target.id);
        });
        

        tarea.addEventListener("dragover", function(e){
            e.preventDefault();
        });

        tarea.addEventListener("drop", function(e){
            e.preventDefault();
            let id = e.dataTransfer.getData("id");
            let tareaArrastrada = document.getElementById(id);
            if (tareaArrastrada !== tarea) {
                tarea.parentNode.insertBefore(tareaArrastrada, tarea);
            }
        });
        funcionActualizarContadores();
    });
    
    // Comportamiento en contenedores    
    contenedores.forEach(contenedor => {
        contenedor.addEventListener("dragover", function(e){
            e.preventDefault();
        });

        contenedor.addEventListener("drop", function(e){
            e.preventDefault();
            let id = e.dataTransfer.getData("id");
            let tarea = document.getElementById(id);

            // Si se suelta en un hueco, mandarla al final
            if (!e.target.classList.contains("tareaListada")) {
                contenedor.appendChild(tarea);
            }
            
            funcionActualizarContadores();
        });
    });
}

function funcionActualizarContadores(){
    //selecccionar todos los macro
    let macro = document.querySelectorAll(".macroContenedor");
    macro.forEach(element => {

        let txtCont = element.querySelector(".textoContador");
        let cantidad = element.querySelector(".contenedorTareasListadas");
        
        let cant = cantidad.children.length;

        txtCont.innerHTML = "[ " + cant + " ]";

    })
}

function funcionObtenerID(event){
    elemento = event.target;
    if (elemento.classList.contains("tareaListada")){
        console.log("El ID del elemento seleccionado es: ", elemento.id)
    } else {
        return;
    }
}

function funcionGuardarTablero(){
    console.log("INICIA GUARDADO")

    // La funcion se inicia centrada en la variable textoTarea
    // todas las variables de almacenamiento iniciaran con este simbolo$
    let $leerTareas = document.querySelectorAll(".textoTarea");
    
    //Recorremos todo el DOM 
    $leerTareas.forEach(elemento => {
        var $textoTarea = elemento.value;
        // Obtener ID tareaListada
        var $tareaListada = elemento.closest(".tareaListada");
        var $id = $tareaListada.id
        
        // Obtener el nombre del contenedor
        var $macroContenedor = elemento.closest(".macroContenedor");  
            // Despues de encontrar el contenedor padre, puedo navegar y buscar en el a traves de un queryselector
        var $subTitulo = $macroContenedor.querySelector(".subTitulo");

        // Obtener el peso de la tarea
        var $pesoTarea = $tareaListada.querySelector(".pesoTarea");
        var $valorPesoTarea = $pesoTarea.value;
        
        // Obtener el estado_2 de la tarea
        var $valorEstado_2 = $tareaListada.querySelector(".estado_2")
        var $estado_2 = $valorEstado_2.value;

        // Obtener fecha de inicio
        var $valorFechaInicio = $tareaListada.querySelector(".fechaInicio");
        var $fechaInicio = $valorFechaInicio.value;

        // Obtener fecha de final
        var $valorFechaFin = $tareaListada.querySelector(".fechaFin");
        var $fechaFin = $valorFechaFin.value;

        // Obtener responsable
        var $valorResponsable = $tareaListada.querySelector(".responsable");
        var $responsable = $valorResponsable.value;
    
        // Obtener color
        var $color = $tareaListada.style.backgroundColor;

        //Orden de lectura
            //id_tareaListada *
            //macroContenedor *
            //textoTarea *
            //peso *
            //estado_2 *
            //fechaInicio *
            //fechaFin *
            //Responsable *
            //Color

        console.log("id_tareaListada = ", $id,
            "/ macroContenedor = ",$subTitulo.value,
            "/ textoTarea = ", $textoTarea,
            "/ pesoTarea = ",$valorPesoTarea, 
            "/ estado_2 = ", $estado_2,
            "/ fechaInicio = ", $fechaInicio,
            "/ fechaFinal = ", $fechaFin,
            "/ responsable = ", $responsable,
            "/ color = ", $color

        );
    });
}

// FUNCION D&D+S
document.addEventListener("click", funcionDragDropSort);

// BOTON AGREGAR macroContenedor
botonAgregarContenedor.addEventListener("click", funcionAgregarContenedor);

// OBTENER ID DE tareaListada
document.addEventListener("click", funcionObtenerID);

// BOTON GUARDAR
botonGuardarTablero.addEventListener("click", funcionGuardarTablero);