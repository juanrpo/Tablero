//ELEMENTOS TRAIDOS DEL HTML
let inputTitulo = document.getElementById("titulo");
let botonAgregarContenedor = document.getElementById("botonAgregarContenedor");
let botonCargarTablero = document.getElementById("botonCargarTablero")
let inputCargarTablero = document.getElementById("inputArchivo");
let botonGuardarTablero = document.getElementById("botonGuardarTablero");

// ELEMTOS GENERALES
    let listaContenedores = [];
    let listaTareas = [];   
    let objetoContenedor = {};
    let colorBasePorDefecto = "rgb(245,245,245)";

// FUNCIONES

function funcionAgregarContenedor(){
    let contenedorDeContenedores = document.querySelector(".contenedorDeContenedores");
    
    // Asignamos variables parametro de la funcionDibujarContenedor
    let $id_macroContenedor = "macroContenedor-"+Date.now();
    let $subTitulo = "";
    let $colorSubTitulo = colorBasePorDefecto;

    let macroContenedor = funcionDibujarContenedor(
                            $id_macroContenedor,
                            $subTitulo, 
                            $colorSubTitulo
                        );

    contenedorDeContenedores.appendChild(macroContenedor);
    funcionActualizarContadores();
}

function funcionDibujarContenedor(
    $id_macroContenedor,
    $subTitulo, 
    $colorSubTitulo,)
    {

// Creamos elemntos que componene el macroContenedor
    let macroContenedor = document.createElement("div");
    macroContenedor.id = $id_macroContenedor;
    macroContenedor.classList.add("macroContenedor");

    // CONTENEDOR SUBTITULO
    let contenedorSubtitulo = document.createElement("div");
    contenedorSubtitulo.classList.add("contenedorSubTitulo");

    // ASIGNAR COLOR A CONTENEDOR DE SUBTITULO
    let colorSubTitulo = $colorSubTitulo;
    contenedorSubtitulo.style.backgroundColor = colorSubTitulo;

    // LINEA 1
    let contenedorSubtitulo_l1 = document.createElement("div");
    contenedorSubtitulo_l1.classList.add("contenedorSubTitulo_l1");
        
        let subTitulo = document.createElement("input");
        subTitulo.value = $subTitulo.value;
        subTitulo.classList.add("subTitulo");
        subTitulo.setAttribute("placeholder", "Proceso...")   
        
        if ($subTitulo === "undefined"){
            subTitulo.setAttribute("placeholder", "Proceso...")
        }else{
            subTitulo.value = $subTitulo;
        }

    // LINEA 2
    let contenedorSubtitulo_l2 = document.createElement("div");
    contenedorSubtitulo_l2.classList.add("contenedorSubTitulo_l2");
        
        let botonIzquierda = document.createElement("button");
        botonIzquierda.textContent = "<";
        botonIzquierda.classList.add("botonIzquierda");   
        botonIzquierda.addEventListener("click", funcionMoverContenedor);

        let botonDerecha = document.createElement("button");
        botonDerecha.textContent = ">";
        botonDerecha.classList.add("botonDerecha");   
        botonDerecha.addEventListener("click", funcionMoverContenedor);
 
        // Se asigna el event listener inmediatamente despues de ser creado
        let botonAgregarTarea = document.createElement("button");
        botonAgregarTarea.textContent = "+";
        botonAgregarTarea.classList.add("botonAgregarTarea");   
        botonAgregarTarea.addEventListener("click", funcionAgregarTarea);

        // Se asigna el event listener inmediatamente despues de ser creado
        let botonConfigurarContenedor = document.createElement("button");
        botonConfigurarContenedor .textContent = "⛭"
        botonConfigurarContenedor .classList.add("botonConfigurarContenedor");
        botonConfigurarContenedor .addEventListener("click", funcionDialogoColoresContenedores);

        // Se asigna el event listener inmediatamente despues de ser creado
        let botonEliminarContenedor = document.createElement("button");
        botonEliminarContenedor.textContent = "x"
        botonEliminarContenedor.classList.add("botonEliminarContenedor");
        botonEliminarContenedor.addEventListener("click", funcionEliminarContenedor);

    // CONTENEDOR DE TAREAS
    let contenedorTareas = document.createElement("div");
    contenedorTareas.classList.add("contenedorTareas");
        // Creamos el texto contador
        let textoContador = document.createElement("p");
        textoContador.innerHTML = "[ "+" ]";
        textoContador.classList.add("textoContador");
        // Creamos el contenedor de tareas listadas
        let contenedorTareasListadas = document.createElement("div");
        contenedorTareasListadas.classList.add("contenedorTareasListadas");

    // ENSAMBLAMOS TODO
    contenedorSubtitulo_l1.appendChild(subTitulo);
    contenedorSubtitulo_l2.appendChild(botonIzquierda);
    contenedorSubtitulo_l2.appendChild(botonDerecha);
    contenedorSubtitulo_l2.appendChild(botonAgregarTarea);
    contenedorSubtitulo_l2.appendChild(botonConfigurarContenedor)
    contenedorSubtitulo_l2.appendChild(botonEliminarContenedor);
    contenedorSubtitulo.appendChild(contenedorSubtitulo_l1);
    contenedorSubtitulo.appendChild(contenedorSubtitulo_l2);
    
    // Ensamblamos el contendor de tareas
    contenedorTareas.appendChild(textoContador);
    contenedorTareas.appendChild(contenedorTareasListadas);

    // Ensamblamos el macroContenedor
    macroContenedor.appendChild(contenedorSubtitulo);
    macroContenedor.appendChild(contenedorTareas);

    // Contenedor de contenedores recibe el macroContenedor
    contenedorDeContenedores.appendChild(macroContenedor);
    
    return macroContenedor;
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

function funcionMoverContenedor(event){
    let boton = event.target;
    let contenedorDeContenedores = document.querySelector(".contenedorDeContenedores");
    let macroContenedor = boton.closest(".macroContenedor");
    if (boton.classList.contains("botonIzquierda") && macroContenedor.previousElementSibling){
        //console.log("A la Izquierda")
        contenedorDeContenedores.insertBefore(macroContenedor, macroContenedor.previousElementSibling) 
    }
    if (boton.classList.contains("botonDerecha") && macroContenedor.nextElementSibling){
        //console.log("A la Derecha")
        contenedorDeContenedores.insertBefore(macroContenedor.nextElementSibling, macroContenedor,) 
    }
}

function funcionAgregarTarea(event){
    // Se utiliza el objeto event para usar la propiedad target
    // Aca identificamos en que macroContenedor se da la accion
    let boton = event.target;
    let macroContenedor = boton.closest(".macroContenedor")

    // Indentificamos a que contendeor debe ir la tarea
    let contenedorTareasListadas = macroContenedor.querySelector(".contenedorTareasListadas");
    
    // Asignamos el ID
    let id = "tareaListada-"+Date.now();

    // Como es una tarea nueva se asignan estos campos vacios
    let textoInput = "";
    let pesoTarea = "";
    let estado_2 = "";
    let fechaInicio = "";
    let fechaFin = "";
    let responsable = "";
    // asignar color por defecto a una tarea recien creada
    let colorTareaListada = colorBasePorDefecto;

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
    let tareaListada = document.createElement("div");
    tareaListada.id = $id_tareaListada;
    tareaListada.classList.add("tareaListada");
    tareaListada.setAttribute("draggable", true);

    // asignar color
    let colorTareaListada = $color;
    tareaListada.style.backgroundColor = colorTareaListada;

    // Creamos linea 1 del contenedor tareaListada
    let tareaListada_l1 = document.createElement("div");
    tareaListada_l1.classList.add("tareaListada_l1");

        // Crear campo textoTarea
        let textoTarea = document.createElement("textarea");
        textoTarea.value = $textoTarea;
        textoTarea.classList.add("textoTarea");
        textoTarea.setAttribute("rows", 2);

    // Creamos linea 2 del contenedor tareaListada
    let tareaListada_l2 = document.createElement("div");
    tareaListada_l2.classList.add("tareaListada_l2");

        // Crear campo de peso
        let pesoTarea = document.createElement("input");
        pesoTarea.value = $pesoTarea;
        pesoTarea.classList.add("pesoTarea");
        pesoTarea.setAttribute("placeholder", "pesoTarea");

        // Crear campo de estado_2
        let estado_2 = document.createElement("input");
        estado_2.value = $estado_2;
        estado_2.classList.add("estado_2");
        estado_2.setAttribute("type", "text");
        estado_2.setAttribute("placeholder", "estado_2");

        // Crear campo de fecha de inicio
        let fechaInicio = document.createElement("input");
        fechaInicio.value = $fechaInicio;
        fechaInicio.classList.add("fechaInicio");
        fechaInicio.setAttribute("type", "date");

        // Crear campo de fecha de final
        let fechaFin = document.createElement("input");
        fechaFin.value = $fechaFin;
        fechaFin.classList.add("fechaFin");
        fechaFin.setAttribute("type", "date");

        // Crear campo de responsable
        let responsable = document.createElement("input");
        responsable.value = $responsable;
        responsable.classList.add("responsable");
        responsable.setAttribute("type", "text");
        responsable.setAttribute("placeholder", "responsable");

        // crear boton configurar
        let botonConfigTarea = document.createElement("button");
        botonConfigTarea.textContent = "⛭";
        botonConfigTarea.classList.add("botonConfigTarea");
        botonConfigTarea.addEventListener("click", funcionDialogoColoresTareas);

        // crear Boton eliminar
        let botonEliminarTarea = document.createElement("button");
        botonEliminarTarea.textContent = "x";
        botonEliminarTarea.classList.add("botonEliminarTarea");
        botonEliminarTarea.addEventListener("click", funcionEliminarTarea);

    // Ensamblamos
    tareaListada.appendChild(tareaListada_l1);
    tareaListada.appendChild(tareaListada_l2);

    tareaListada_l1.appendChild(textoTarea);
   
    tareaListada_l2.appendChild(pesoTarea);
    tareaListada_l2.appendChild(estado_2);
    tareaListada_l2.appendChild(fechaInicio);
    tareaListada_l2.appendChild(fechaFin);
    tareaListada_l2.appendChild(responsable);
    tareaListada_l2.appendChild(botonConfigTarea);
    tareaListada_l2.appendChild(botonEliminarTarea);

    return tareaListada;
}

function funcionEliminarTarea(event){
    // Se utiliza el objeto event para usar la propiedad target
    // Aca identificamos en que macrContenedeor donde se disparo la accion
    let boton = event.target;
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
    let boton = event.target;
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

function funcionDialogoColoresContenedores(event){
    /// Se utiliza el objeto event para usar la propiedad target
    // Aca identificamos en que macrContenedeor donde se disparo la accion
    let boton = event.target;
    let contenedorSubTitulo = boton.closest(".contenedorSubTitulo");
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
            contenedorSubTitulo.style.backgroundColor = color;
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
        let objetoContenedor = {
            id_macroContenedor : contenedor.id,
            macroContenedor : contenedor.querySelector(".subTitulo").value,
            colorSubtitulo : contenedor.querySelector(".contenedorSubTitulo").style.backgroundColor,
            tareas: []
        };

        // Buscar todas las tareas dentro de este contenedor
        let $tareasListadas = contenedor.querySelectorAll(".tareaListada");

        $tareasListadas.forEach(tarea => {
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

        // listaContenedores es la variable que se utiliza para crear el JSON
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

        for(let i = 0 ; i < objetoContenedor.length ; i++){ 
           
            funcionDibujarContenedor(
                objetoContenedor[i].id_macroContenedor, 
                objetoContenedor[i].macroContenedor, 
                objetoContenedor[i].colorSubtitulo
            );

            for(let y = 0 ; y < objetoContenedor[i].tareas.length; y++ ){
                // console.log(objetoContenedor[i].tareas[y])
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

// BOTON AGREGAR CONTENEDOR
botonAgregarContenedor.addEventListener("click", funcionAgregarContenedor);

// BOTON GUARDAR TABLERO
botonGuardarTablero.addEventListener("click", funcionGuardarTablero);

// BOTON CARGAR TABLERO
inputCargarTablero.addEventListener("change", funcionCargarTablero);
// BOTON QUE TRASLADA LA ACION DEL BOTON CARGAR A INPUT FILE
botonCargarTablero.addEventListener("click", () =>{
    document.getElementById("inputArchivo").click();
});