//ELEMENTOS TRAIDOS DEL HTML
let inputTitulo = document.getElementById("titulo");
let botonAgregarContenedor = document.getElementById("botonAgregarContenedor");
let botonCargarTablero = document.getElementById("botonCargarTablero")
let inputCargarTablero = document.getElementById("inputArchivo");
let botonGuardarTablero = document.getElementById("botonGuardarTablero");
let contenedorDeContenedores = document.getElementById("contenedorDeContenedores");

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


let listaContenedores = [];
let listaTareas = [];
let objetoContenedor = {};
let nombreMacroContenedor = " ";

// FUNCIONES
function funcionAgregarContenedor(nombreMacroContenedor){

    // Creamos el macro contenedor y se le asigna un ID unico
    macroContenedor = document.createElement("div");
    macroContenedor.id = "macroContenedor-"+Date.now();
    macroContenedor.classList.add("macroContenedor");
    macroContenedor.setAttribute("draggable", true);


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
    
    if (nombreMacroContenedor == "[object PointerEvent]"){
        subTitulo.setAttribute("placeholder", "Proceso...")
    }else{
        subTitulo.value = nombreMacroContenedor;
    }

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
    
    //console.log("Se ha agregado un macroContenedor: ", macroContenedor.id);
}

function funcionEliminarContenedor(event){
    // se utiliza el objeto event para usar la propiedad target
    // Aca identificamos en que macrContenedeor donde se disparo la accion
    boton = event.target;
    macroContenedor = boton.closest(".macroContenedor");

    macroContenedor.remove();
    //console.log("Se ha eliminado una macroContenedor: ", macroContenedor.id);
    
    funcionActualizarContadores();
}

function funcionAgregarTarea(event){
    // Se utiliza el objeto event para usar la propiedad target
    // Aca identificamos en que macroContenedor se da la accion
    boton = event.target;
    macroContenedor = boton.closest(".macroContenedor")

    // Dentro del macro contenedor identificamos la variable de texto para crear la tarea
    inputTarea = macroContenedor.querySelector(".inputTarea")

    // Indentificamos a que contendeor debe ir la tarea
    contenedorTareasListadas = macroContenedor.querySelector(".contenedorTareasListadas");
    
    // Asignamos el ID
    let id = "tareaListada-"+Date.now();

    // Como es una tarea nueva se asignan estos campos vacios
    let pesoTarea = "";
    let estado_2 = ""
    let responsable = ""

    // Tomamos el valor del input luego de haberlo ubicado en las lineas anteriores
    let textoInput = inputTarea.value.trim();
     
    // asignar color por defecto a una tarea recien creada
    colorTareaListada = "rgb(230, 230, 230)" 

    let tarea = funcionDibujarTareas(
                    id,
                    textoInput, 
                    pesoTarea,
                    estado_2, 
                    fechaInicio, 
                    fechaFin,
                    responsable,
                    colorTareaListada 
                );

    // Agregamos la tarea listada al contenedor que identificamos en las primeras lineas
    contenedorTareasListadas.appendChild(tarea);

    //console.log("se ha agregado una tarea: ", tareaListada.id)
   
    //Limpiamos el input
    inputTarea.value = "";

    funcionActualizarContadores();
}

// Esta funcion dibuja las tareas
function funcionDibujarTareas(
    $id_tareaListada,
    $textoTarea, 
    $pesoTarea,
    $estado_2, 
    $fechaInicio, 
    $fechaFin,
    $responsable,
    $color)
    {

    // Creamos los elementos que componen la tarea
    tareaListada = document.createElement("div");
    tareaListada.id = $id_tareaListada;
    tareaListada.classList.add("tareaListada");
    tareaListada.setAttribute("draggable", true);

    // Creamos linea 1 del contenedor tareaListada
    tareaListada_l1 = document.createElement("div");
    tareaListada_l1.classList.add("tareaListada_l1");

        // Crear campo textoTarea
        textoTarea = document.createElement("textarea");
        textoTarea.value = $textoTarea;
        textoTarea.classList.add("textoTarea");
        textoTarea.setAttribute("rows", 3);

    // Creamos linea 2 del contenedor tareaListada
    tareaListada_l2 = document.createElement("div");
    tareaListada_l2.classList.add("tareaListada_l2");

        // Crear campo de peso
        pesoTarea = document.createElement("input");
        pesoTarea.value = $pesoTarea;
        pesoTarea.classList.add("pesoTarea");
        pesoTarea.setAttribute("placeholder", "pesoTarea");

        // Crear campo de estado_2
        estado_2 = document.createElement("input");
        estado_2.value = $estado_2;
        estado_2.classList.add("estado_2");
        estado_2.setAttribute("type", "text");
        estado_2.setAttribute("placeholder", "estado_2");

        // Crear campo de fecha de inicio
        fechaInicio = document.createElement("input");
        fechaInicio.value = $fechaInicio;
        fechaInicio.classList.add("fechaInicio");
        fechaInicio.setAttribute("type", "date");

        // Crear campo de fecha de final
        fechaFin = document.createElement("input");
        fechaFin.value = $fechaFin;
        fechaFin.classList.add("fechaFin");
        fechaFin.setAttribute("type", "date");

        // Crear campo de responsable
        responsable = document.createElement("input");
        responsable.value = $responsable;
        responsable.classList.add("responsable");
        responsable.setAttribute("type", "text");
        responsable.setAttribute("placeholder", "responsable");

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
   
    tareaListada_l2.appendChild(pesoTarea);
    tareaListada_l2.appendChild(estado_2);
    tareaListada_l2.appendChild(fechaInicio);
    tareaListada_l2.appendChild(fechaFin);
    tareaListada_l2.appendChild(responsable);
    tareaListada_l2.appendChild(botonEliminarTarea);
    tareaListada_l2.appendChild(botonConfigTarea);

    // asignar color por defecto
    colorTareaListada = $color;
    tareaListada.style.backgroundColor = colorTareaListada;

    return tareaListada;
}

function funcionEliminarTarea(event){
    // Se utiliza el objeto event para usar la propiedad target
    // Aca identificamos en que macrContenedeor donde se disparo la accion
    boton = event.target;
    macroContenedor = boton.closest(".macroContenedor");

     // Dentro del macroContenedor identificamos la tarea listada usando el elemnto boton que disparo el evento
    tareaListada = boton.closest(".tareaListada");

    tareaListada.remove();
    //console.log("Se ha eliminado una tarea: ", tareaListada.id);

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
            
            //console.log("Elegiste:", boton.className, "RGB: ",color);
            
            // Cerrar y remover la ventana en el DOM
            ventana.close();
            ventana.remove();

            // Asignar el color elegido
            tareaListada.style.backgroundColor = color;
        });
    });
}

function funcionDragDropSortTareas() {
    
    let contenedores = document.querySelectorAll(".contenedorTareasListadas");
    let tareas = document.querySelectorAll(".tareaListada");
    
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
    
    // Comportamiento en contenedores de tareas listadas   
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

// Esta funcion crea el archivo JSON de tareas
function funcionGuardarTablero(event) {
    if (event) event.preventDefault();
    console.log("GUARDAR");

    listaContenedores = [];

    // Recorremos todos los macroContenedores
    let $macroContenedores = document.querySelectorAll(".macroContenedor");

    $macroContenedores.forEach(contenedor => {
        let $id_macroContenedor = contenedor.id;
        let $subTitulo = contenedor.querySelector(".subTitulo").value;

        // Creamos objeto del contenedor
        let objetoContenedor = {
            id_macroContenedor: $id_macroContenedor,
            macroContenedor: $subTitulo,
            tareas: []
        };

        // Buscar todas las tareas dentro de este contenedor
        let $tareas = contenedor.querySelectorAll(".tareaListada");

        $tareas.forEach(tarea => {
            let objetoTarea = {
                id_tareaListada: tarea.id,
                textoTarea: tarea.querySelector(".textoTarea").value,
                pesoTarea: tarea.querySelector(".pesoTarea").value,
                estado_2: tarea.querySelector(".estado_2").value,
                fechaInicio: tarea.querySelector(".fechaInicio").value,
                fechaFin: tarea.querySelector(".fechaFin").value,
                responsable: tarea.querySelector(".responsable").value,
                color: tarea.style.backgroundColor
            };

            // hacer el push en el segundo nivel de anidacion.
            objetoContenedor.tareas.push(objetoTarea);
        });

        // Si no hay tareas, igual queda con tareas: []
        listaContenedores.push(objetoContenedor);
    });


    // Establecemos el nombre del archivo, ya que este sera el nombre del pryecto
    let nombreArchivo = "";
    if (inputTitulo.value === ""){
            nombreArchivo = "Proyecto-"+Date.now();
        }else{
            nombreArchivo = inputTitulo.value+".json";
    }


    // Descargar JSON
    let blob = new Blob([JSON.stringify(listaContenedores, null, 2)], { type: "application/json" });
    let enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = nombreArchivo;
    enlace.click();
}

// Esta funcion carga el archivo JSON y lo reconstruye en el DOM
function funcionCargarTablero(event){
    
    //Cuando cargamos tablero se limpia el contenedor de contenedores
    let macroContenedor = document.querySelectorAll(".macroContenedor");
    macroContenedor.forEach(elemento =>{
        elemento.remove();
    });
    
    console.log("CARGAR");
    let archivo = event.target.files[0];
    if (!archivo) return;
    
    let lector = new FileReader();
    lector.onload = function(event) {
        
        objetoContenedor = JSON.parse(event.target.result);
            //console.log(objetoContenedor);

        for(i = 0 ; i < objetoContenedor.length ; i++){
            
            console.log(objetoContenedor[i].macroContenedor);
            funcionAgregarContenedor(objetoContenedor[i].macroContenedor)
            
            for(y = 0 ; y < objetoContenedor[i].tareas.length; y++ ){
                
                console.log(objetoContenedor[i].tareas[y])
                // dentro de los parentesis los parametros de la funcion.
                 let tarea = funcionDibujarTareas(
                    objetoContenedor[i].tareas[y].id_tareaListada,
                    objetoContenedor[i].tareas[y].textoTarea, 
                    objetoContenedor[i].tareas[y].pesoTarea,
                    objetoContenedor[i].tareas[y].estado_2, 
                    objetoContenedor[i].tareas[y].fechaInicio, 
                    objetoContenedor[i].tareas[y].fechaFin,
                    objetoContenedor[i].tareas[y].responsable,
                    objetoContenedor[i].tareas[y].color 
                );
                // Buscamos el último macroContenedor insertado
                let macro = contenedorDeContenedores.lastElementChild;

                // Dentro de el buscamos la lista de tareas
                let contenedorTareasListadas = macro.querySelector(".contenedorTareasListadas");

                // Y le agregamos la tarea
                contenedorTareasListadas.appendChild(tarea);
    
            }   
        }
        
        // Variable para simular el clcik en el body y activar la funcion D&D+S
        let body = document.body;
        body.click();
    };
    
    lector.readAsText(archivo);
    inputCargarTablero.value = "";

    // Tomamos el nombre del archivo para el inputTitulo
    console.log(archivo.name);
    inputTitulo.value = archivo.name.slice(0,-5);
}


// EVENTOS

// FUNCION D&D+S
document.addEventListener("click", funcionDragDropSortTareas);

// BOTON AGREGAR macroContenedor
botonAgregarContenedor.addEventListener("click", funcionAgregarContenedor);

// BOTON GUARDAR
botonGuardarTablero.addEventListener("click", funcionGuardarTablero);

// BOTON CARGAR
inputCargarTablero.addEventListener("change", funcionCargarTablero);

// BOTON QUE TRASLADA LA ACION DEL BOTON CARGAR A INPUT FILE
botonCargarTablero.addEventListener("click", () =>{
    document.getElementById("inputArchivo").click();

});