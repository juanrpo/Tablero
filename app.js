//ELEMENTOS TRAIDOS DEL HTML
let inputTitulo = document.getElementById("titulo");
inputTitulo.addEventListener("change", funcionTituloPestaña);

let fechaInicioSesion = document.getElementById("fechaInicioSesion");
let fechaUltimoGuardado = document.getElementById("fechaUltimoGuardado");

let botonAgregarContenedor = document.getElementById("botonAgregarContenedor");
let botonCargarTablero = document.getElementById("botonCargarTablero")
let inputCargarTablero = document.getElementById("inputArchivo");
let botonGuardarTablero = document.getElementById("botonGuardarTablero");

// ELEMTOS GENERALES
let fechaConHora;
let listaContenedores = [];
let listaTareas = [];   
let objetoContenedor = {};
let colorBasePorDefecto = "rgb(245,245,245)";
let contadorMinMax = 0;
let estadoMinMax = "";

// CAMPOS DE FILTRADO
let _tituloTarea = "tituloTarea";
let _pesoTarea = "pesoTarea";
let _etiqueta = "etiqueta";
let _fechaInicio = "fechaInicio";
let _fechaFin = "fechaFin";
let _responsable = "responable";


// FUNCIONES

function funcionTituloPestaña(){
    let tituloPestaña = inputTitulo.value;
    document.title = tituloPestaña;
    return tituloPestaña;
}

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
    $colorSubTitulo)
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

    // LINEA 1 : CONTADOR + TITULO
    let contenedorSubtitulo_l1 = document.createElement("div");
    contenedorSubtitulo_l1.classList.add("contenedorSubTitulo_l1");

        let subTitulo = document.createElement("input");
        subTitulo.value = $subTitulo.value;
        subTitulo.classList.add("subTitulo");
        subTitulo.setAttribute("placeholder", "Proceso...")   
        subTitulo.setAttribute("maxlength", "25");
        
        if ($subTitulo === "undefined"){
            subTitulo.setAttribute("placeholder", "Proceso...")
        }else{
            subTitulo.value = $subTitulo;
        }

    // LINEA 2: FILTRO
    let contenedorSubtitulo_l2 = document.createElement("div");
    contenedorSubtitulo_l2.classList.add("contenedorSubTitulo_l2");

        let campoFiltro = document.createElement("select");
        campoFiltro.classList.add("campoFiltro");
        campoFiltro.addEventListener("change", function(){
            inputFiltro.value = null;
        });

            let opt_00 = document.createElement("option");
            opt_00.textContent = "-- Campo --"
            
            let opt_01 = document.createElement("option");
            opt_01.textContent = _tituloTarea;
           
            let opt_02 = document.createElement("option");
            opt_02.textContent = _pesoTarea;
            
            let opt_03 = document.createElement("option");
            opt_03.textContent = _etiqueta;

            let opt_04 = document.createElement("option");
            opt_04.textContent = _fechaInicio;
            
            let opt_05 = document.createElement("option");
            opt_05.textContent = _fechaFin

            let opt_06 = document.createElement("option");
            opt_06.textContent = _responsable
            
            campoFiltro.appendChild(opt_00);
            campoFiltro.appendChild(opt_01);
            campoFiltro.appendChild(opt_02);
            campoFiltro.appendChild(opt_03);
            campoFiltro.appendChild(opt_04);
            campoFiltro.appendChild(opt_05);
            campoFiltro.appendChild(opt_06);

        let inputFiltro = document.createElement("input");
        inputFiltro.classList.add("inputFiltro");
        inputFiltro.setAttribute("placeholder", "-- Filtro --")
        inputFiltro.setAttribute("maxlength", "25");
        inputFiltro.addEventListener("keyup", funcionFiltrarTarea);

    // LINEA 3: CONTROLES
    let contenedorSubtitulo_l3 = document.createElement("div");
    contenedorSubtitulo_l3.classList.add("contenedorSubTitulo_l3");
        
        let botonIzquierda = document.createElement("button");
        botonIzquierda.textContent = "⏴";
        botonIzquierda.classList.add("botonIzquierda");   
        botonIzquierda.addEventListener("click", funcionMoverContenedor);

        let botonDerecha = document.createElement("button");
        botonDerecha.textContent = "⏵";
        botonDerecha.classList.add("botonDerecha");   
        botonDerecha.addEventListener("click", funcionMoverContenedor);
 
        // Se asigna el event listener inmediatamente despues de ser creado
        let botonAgregarTarea = document.createElement("button");
        botonAgregarTarea.textContent = "+";
        botonAgregarTarea.classList.add("botonAgregarTarea");   
        botonAgregarTarea.addEventListener("click", funcionAgregarTarea);

        // Se asigna el event listener inmediatamente despues de ser creado
        let botonConfigurarContenedor = document.createElement("button");
        botonConfigurarContenedor.textContent = "⛭"
        botonConfigurarContenedor.classList.add("botonConfigurarContenedor");
        botonConfigurarContenedor.addEventListener("click", funcionDialogoColoresContenedores);

        // Se asigna el event listener inmediatamente despues de ser creado
        let botonMinMaxContenedor = document.createElement("button");
        botonMinMaxContenedor.textContent = "+/-"
        botonMinMaxContenedor.classList.add("botonMinMaxContenedor");
        botonMinMaxContenedor.addEventListener("click", funcionMinMaxContenedor);

        // Se asigna el event listener inmediatamente despues de ser creado
        let botonEliminarContenedor = document.createElement("button");
        botonEliminarContenedor.textContent = "x"
        botonEliminarContenedor.classList.add("botonEliminarContenedor");
        botonEliminarContenedor.addEventListener("dblclick", funcionEliminarContenedor);

        // Creamos el texto contador
        let textoContador = document.createElement("p");
        textoContador.innerHTML = "[ "+" ]";
        textoContador.classList.add("textoContador");
        // Creamos el contenedor de tareas listadas
        let contenedorTareasListadas = document.createElement("div");
        contenedorTareasListadas.classList.add("contenedorTareasListadas");

    // ENSAMBLAMOS TODO
    contenedorSubtitulo_l1.appendChild(textoContador);
    contenedorSubtitulo_l1.appendChild(subTitulo);
    
    contenedorSubtitulo_l2.appendChild(campoFiltro);
    contenedorSubtitulo_l2.appendChild(inputFiltro);

    contenedorSubtitulo_l3.appendChild(botonIzquierda);
    contenedorSubtitulo_l3.appendChild(botonDerecha);
    contenedorSubtitulo_l3.appendChild(botonAgregarTarea);
    contenedorSubtitulo_l3.appendChild(botonConfigurarContenedor)
    contenedorSubtitulo_l3.appendChild(botonMinMaxContenedor);
    contenedorSubtitulo_l3.appendChild(botonEliminarContenedor);

    contenedorSubtitulo.appendChild(contenedorSubtitulo_l1);
    contenedorSubtitulo.appendChild(contenedorSubtitulo_l2);
    contenedorSubtitulo.appendChild(contenedorSubtitulo_l3);

    // Ensamblamos el macroContenedor
    macroContenedor.appendChild(contenedorSubtitulo);
    macroContenedor.appendChild(contenedorTareasListadas);

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
        contenedorDeContenedores.insertBefore(macroContenedor.nextElementSibling, macroContenedor) 
    }
}

function funcionMinMaxContenedor(event){
    let boton = event.target
    let macroContenedor = boton.closest(".macroContenedor");
    let contenedorTareasListadas = macroContenedor.querySelector(".contenedorTareasListadas");
     
    if (contenedorTareasListadas.style.display === "flex") {
        contenedorTareasListadas.style.display = "none";
        estadoMinMax = "min";
    } 
    else {
        contenedorTareasListadas.style.display = "flex";  
        estadoMinMax = "max";
    }

    if (estadoMinMax === "min"){
        boton.style.border = "1px solid";
    }
    
    if (estadoMinMax === "max"){
        boton.style.border = "none";
    }

    return estadoMinMax
}

function funcionFiltrarTarea(event){
    let filtro = event.target;
    let macroContenedor = filtro.closest(".macroContenedor");
    let campoFiltro = macroContenedor.querySelector(".campoFiltro");
    let inputFiltro = macroContenedor.querySelector(".inputFiltro");
    let contenedorTareasListadas = macroContenedor.querySelector(".contenedorTareasListadas");
    let tareasListadas = contenedorTareasListadas.querySelectorAll(".tareaListada");
    
    let textoCampo = campoFiltro.value;
    let textoFiltro = filtro.value.toLowerCase();
    
    // este filtro funciona debido a que .includes("") devuelve true y por eso todos los elementos vuelven a ser visibles
    if (textoCampo === _tituloTarea) {
        tareasListadas.forEach(element => { 
            let tituloTarea = element.querySelector(".tituloTarea");
            let textoFiltrar = tituloTarea.value.toLowerCase();
            let tareaListada = tituloTarea.closest(".tareaListada");
            if(textoFiltrar.includes(textoFiltro)){
                tareaListada.style.display = "flex";
            } else {
                tareaListada.style.display = "none";
            }
        });
    } 

    if (textoCampo === _pesoTarea) {
        tareasListadas.forEach(element => { 
            let pesoTarea = element.querySelector(".pesoTarea");
            let textoFiltrar = pesoTarea.value.toLowerCase();
            let tareaListada = pesoTarea.closest(".tareaListada");
            if(textoFiltrar.includes(textoFiltro)){
                tareaListada.style.display = "flex";
            } else {
                tareaListada.style.display = "none";
            }
        });
    } 

    if (textoCampo === _etiqueta) {
        tareasListadas.forEach(element => { 
            let etiqueta = element.querySelector(".etiqueta");
            let textoFiltrar = etiqueta.value.toLowerCase();
            let tareaListada = etiqueta.closest(".tareaListada");
            if(textoFiltrar.includes(textoFiltro)){
                tareaListada.style.display = "flex";
            } else {
                tareaListada.style.display = "none";
            }
        });
    } 

    if (textoCampo === _responsable) {
        tareasListadas.forEach(element => { 
            let responsable = element.querySelector(".responsable");
            let textoFiltrar = responsable.value.toLowerCase();
            let tareaListada = responsable.closest(".tareaListada");
            if(textoFiltrar.includes(textoFiltro)){
                tareaListada.style.display = "flex";
            } else {
                tareaListada.style.display = "none";
            }
        });
    } 

    if (textoCampo === _fechaInicio) {
        tareasListadas.forEach(element => { 
            let fechaInicio = element.querySelector(".fechaInicio");
            let textoFiltrar = fechaInicio.value;
            let tareaListada = fechaInicio.closest(".tareaListada");
            if(textoFiltrar.includes(textoFiltro)){
                tareaListada.style.display = "flex";
            } else {
                tareaListada.style.display = "none";
            }
        });
    } 

    if (textoCampo === _fechaFin) {
        tareasListadas.forEach(element => { 
            let fechaFin = element.querySelector(".fechaFin");
            let textoFiltrar = fechaFin.value;
            let tareaListada = fechaFin.closest(".tareaListada");
            if(textoFiltrar.includes(textoFiltro)){
                tareaListada.style.display = "flex";
            } else {
                tareaListada.style.display = "none";
            }
        });
    } 

}

function funcionAgregarTarea(event){
    // Se utiliza el objeto event para usar la propiedad target
    // Aca identificamos en que macroContenedor se da la accion
    let boton = event.target;
    let macroContenedor = boton.closest(".macroContenedor");

    // Indentificamos a que contendeor debe ir la tarea
    let contenedorTareasListadas = macroContenedor.querySelector(".contenedorTareasListadas");
    contenedorTareasListadas.style.display = "flex";
    
    // Asignamos el ID
    let id = "tareaListada-"+Date.now();

    // Como es una tarea nueva se asignan estos campos vacios
    let estadoTarea = false;
    let tituloTarea = "";
    let textoInput = "";
    let pesoTarea = "";
    let etiqueta = "";
    let fechaInicio = "";
    let fechaFin = "";
    let responsable = "";
    // asignar color por defecto a una tarea recien creada
    let colorTareaListada = colorBasePorDefecto;

    let tarea = funcionDibujarTareas(
                    id,
                    estadoTarea,
                    tituloTarea,
                    textoInput, 
                    pesoTarea,
                    etiqueta, 
                    fechaInicio, 
                    fechaFin,
                    responsable,
                    colorTareaListada 
                );

    // Agregamos la tarea listada al contenedor que identificamos en las primeras lineas
    contenedorTareasListadas.insertBefore(tarea, contenedorTareasListadas.firstChild);
    
    let botonMinMaxContenedor = macroContenedor.querySelector(".botonMinMaxContenedor");
    botonMinMaxContenedor.style.border = "none";
    
    funcionActualizarContadores();
}

function funcionDibujarTareas(
    $id_tareaListada,
    $estadoTarea,
    $tituloTarea,
    $textoTarea, 
    $pesoTarea,
    $etiqueta, 
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

        // Crear elemento estado
        let estadoTarea = document.createElement("input");
        estadoTarea.setAttribute("type","checkbox");
        estadoTarea.classList.add("estadoTarea");
        estadoTarea.addEventListener("click", funcionMarcarTarea);
        estadoTarea.checked = $estadoTarea
    
        // Crear campo titulo tarea
        let tituloTarea = document.createElement("textarea");
        tituloTarea.textContent= $tituloTarea;
        tituloTarea.classList.add("tituloTarea");
        tituloTarea.setAttribute("rows", 3);
        tituloTarea.setAttribute("placeholder", "Tarea...");

        let fInicio = document.createElement("span");
        fInicio.textContent = "Inicio:";
        fInicio.classList.add("tituloFechas");

            // Crear campo de fecha de inicio
            let fechaInicio = document.createElement("input");
            fechaInicio.value = $fechaInicio;
            fechaInicio.classList.add("fechaInicio");
            fechaInicio.setAttribute("type", "date");

        let fFin = document.createElement("span");
        fFin.textContent = "Fin:";
        fFin.classList.add("tituloFechas");

            // Crear campo de fecha de final
            let fechaFin = document.createElement("input");
            fechaFin.value = $fechaFin;
            fechaFin.classList.add("fechaFin");
            fechaFin.setAttribute("type", "date");
   
    // Creamos linea 2 del contenedor tareaListada
    let tareaListada_l2 = document.createElement("div");
    tareaListada_l2.classList.add("tareaListada_l2");

        // Boton Arriba
        let botonUp = document.createElement("button");
        botonUp.textContent = "⏶";
        botonUp.classList.add("botonUp");
        botonUp.addEventListener("click", funcionMoverTarea);
        
        // Boton Abajo
        let botonDown = document.createElement("button");
        botonDown.textContent = "⏷";
        botonDown.classList.add("botonDown");
        botonDown.addEventListener("click", funcionMoverTarea);
    
        // Boton Izquierda
        let botonL = document.createElement("button");
        botonL.textContent = "⏴";
        botonL.classList.add("botonL");
        botonL.addEventListener("click", funcionMoverTarea);
        
        // Boton Derecha
        let botonR = document.createElement("button");
        botonR.textContent = "⏵"; 
        botonR.classList.add("botonR"); 
        botonR.addEventListener("click", funcionMoverTarea);

         // crear boton configurar
        let botonConfigTarea = document.createElement("button");
        botonConfigTarea.textContent = "⛭";
        botonConfigTarea.classList.add("botonConfigTarea");
        botonConfigTarea.addEventListener("click", funcionDialogoColoresTareas);

        //Boton colapsar y desplegar
        let botonMinMax = document.createElement("button");
        botonMinMax.textContent = "+/-"
        botonMinMax.classList.add("botonMinMaxTarea");
        botonMinMax.addEventListener("click", funcionMinMaxTarea);

        // crear Boton eliminar
        let botonEliminarTarea = document.createElement("button");
        botonEliminarTarea.textContent = "x";
        botonEliminarTarea.classList.add("botonEliminarTarea");
        botonEliminarTarea.addEventListener("dblclick", funcionEliminarTarea);
    
    // Creamos linea 3 del contenedor tareaListada
    let tareaListada_l3 = document.createElement("div");
    tareaListada_l3.classList.add("tareaListada_l3");

        //Crear campo textoTarea
        let textoTarea = document.createElement("textarea");
        textoTarea.textContent= $textoTarea;
        textoTarea.classList.add("textoTarea");
        textoTarea.setAttribute("rows", 6);

        // Crear campo de peso
        let pesoTarea = document.createElement("input");
        pesoTarea.value = $pesoTarea;
        pesoTarea.classList.add("pesoTarea");
        pesoTarea.setAttribute("placeholder", "pesoTarea");

        // Crear campo de etiqueta
        let etiqueta = document.createElement("input");
        etiqueta.value = $etiqueta;
        etiqueta.classList.add("etiqueta");
        etiqueta.setAttribute("type", "text");
        etiqueta.setAttribute("placeholder", "etiqueta");

        // Crear campo de responsable
        let responsable = document.createElement("input");
        responsable.value = $responsable;
        responsable.classList.add("responsable");
        responsable.setAttribute("type", "text");
        responsable.setAttribute("placeholder", "responsable");

    // Ensamblamos
    tareaListada.appendChild(tareaListada_l1);
    tareaListada.appendChild(tareaListada_l2);
    tareaListada.appendChild(tareaListada_l3);
    
    tareaListada_l1.appendChild(estadoTarea);
    tareaListada_l1.appendChild(tituloTarea);
    tareaListada_l1.appendChild(fInicio);
    tareaListada_l1.appendChild(fechaInicio);
    tareaListada_l1.appendChild(fFin);
    tareaListada_l1.appendChild(fechaFin);
    
    tareaListada_l2.appendChild(botonUp);
    tareaListada_l2.appendChild(botonDown);
    tareaListada_l2.appendChild(botonL);
    tareaListada_l2.appendChild(botonR);
    tareaListada_l2.appendChild(botonConfigTarea);
    tareaListada_l2.appendChild(botonMinMax);
    tareaListada_l2.appendChild(botonEliminarTarea);

    tareaListada_l3.appendChild(textoTarea);
    tareaListada_l3.appendChild(pesoTarea);
    tareaListada_l3.appendChild(etiqueta);
    tareaListada_l3.appendChild(responsable);


    // Se agregan por defecto los eventlisteners de las tareas listadas para ocultar o mostrar botones
    tareaListada.addEventListener("mouseover", function(){
        tareaListada_l2.style.display = "flex";
    })
            
    tareaListada.addEventListener("mouseout", function(){
        if(tareaListada_l3.style.display != "none"){
            tareaListada_l2.style.display = "flex";

        } else {
            tareaListada_l2.style.display = "none";
        }
        
    })
    
    tareaListada_l2.style.display= "none";
    tareaListada_l3.style.display = "none";

    //Se establece que si la tarea se dibuja con un check esta se dejara con un 50% de opacidad
    if(estadoTarea.checked){
        tareaListada.style.opacity = "0.5";
    }
    if(!estadoTarea.checked){
        tareaListada.style.opacity = "1.0";   
    }

    //fin de la funcion
    return tareaListada;
}

function funcionMarcarTarea(event){
    let boton = event.target;
    let macroContenedor = boton.closest(".macroContenedor")
    let contenedorTareasListadas = macroContenedor.querySelector(".contenedorTareasListadas");
    let tareaListada = boton.closest(".tareaListada");

    if(boton.checked){
        contenedorTareasListadas.appendChild(tareaListada);
        tareaListada.style.opacity = "0.5";
        funcionActualizarContadores();
    }
    if(!boton.checked){
        contenedorTareasListadas.insertBefore(tareaListada,contenedorTareasListadas.firstChild);
        tareaListada.style.opacity = "1.0";
        funcionActualizarContadores();
    }
}

function funcionMinMaxTarea(event){
    let boton = event.target;
    let tareaListada = boton.closest(".tareaListada");
    let tareaListada_l2 = tareaListada.querySelector(".tareaListada_l2");
    let tareaListada_l3 = tareaListada.querySelector(".tareaListada_l3");
     
    if (contadorMinMax === 0) {
        //SE MODIFICA EL COMPORTAMIENTO DE LOS EVENT LISTENER EN LA TAREA LISTADA, SEGUN SI ESTA DESPLEGADA O MINIMIZADA
        tareaListada.addEventListener("mouseover", function(){
            tareaListada_l2.style.visibility = "visible";
        }) 

        tareaListada.addEventListener("mouseout", function(){
            tareaListada_l2.style.visibility = "visible";
        })
        tareaListada_l3.style.display = "flex";
        boton.style.border = "1px solid";
        contadorMinMax = 1;
    } else {
        //SE MODIFICA EL COMPORTAMIENTO DE LOS EVENT LISTENER EN LA TAREA LISTADA, SEGUN SI ESTA DESPLEGADA O MINIMIZADA
        tareaListada.addEventListener("mouseover", function(){
            tareaListada_l2.style.visibility = "visible";
        }) 
        tareaListada.addEventListener("mouseout", function(){
            tareaListada_l2.style.visibility = "hidden";
        })
        tareaListada_l3.style.display = "none";
        boton.style.border = "none";
        contadorMinMax = 0;
    }

    return contadorMinMax;
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

function funcionMoverTarea(event){
    let boton = event.target;
    let macroContenedor = boton.closest(".macroContenedor");
    let contenedorTareasListadas = macroContenedor.querySelector(".contenedorTareasListadas");
    let tareaListada = boton.closest(".tareaListada");
    if (boton.classList.contains("botonUp") && tareaListada.previousElementSibling){
        contenedorTareasListadas.insertBefore(tareaListada, tareaListada.previousElementSibling); 
    }
    if (boton.classList.contains("botonDown") && tareaListada.nextElementSibling){
        contenedorTareasListadas.insertBefore(tareaListada.nextElementSibling, tareaListada); 
    }
    if (boton.classList.contains("botonL") && macroContenedor.previousElementSibling){
        let contenedorL = macroContenedor.previousElementSibling.querySelector(".contenedorTareasListadas");
        contenedorL.insertBefore(tareaListada, contenedorL.firstChild);
    }
    if (boton.classList.contains("botonR") && macroContenedor.nextElementSibling){
        let contenedorR = macroContenedor.nextElementSibling.querySelector(".contenedorTareasListadas");
        contenedorR.insertBefore(tareaListada, contenedorR.firstChild);
    }
    
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

    // Cerrar modal con click
    ventana.addEventListener("click", (e) => {
        if (e.target === ventana) {
            ventana.close();
            ventana.remove();
        }
    });

    // Cerrar modal con Escape
    ventana.addEventListener("cancel", () => {
        ventana.close();
        ventana.remove();
    });

    // Cerrar modal al seleccionar color
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

    // Cerrar modal con click
    ventana.addEventListener("click", (e) => {
        if (e.target === ventana) {
            ventana.close();
            ventana.remove();
        }
    });

    // Cerrar modal con Escape
    ventana.addEventListener("cancel", () => {
        ventana.close();
        ventana.remove();
    });

    // Cerrar modal al seleccionar color
    ventana.querySelectorAll(".color_1, .color_2, .color_3, .color_4, .color_5").forEach(boton => {
        boton.addEventListener("click", () => {
            let estilo = window.getComputedStyle(boton)
            let color = estilo.backgroundColor;
            
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

    // Comportamiento en tareas drag and drop
    for ( let tarea of tareas){

        // Se establece que si algun campo dentro de la tarea esta activo el drag and drop se deshabilita
        if( tarea.contains(document.activeElement)){
            tarea.setAttribute("draggable", false);
        }

        // una vez los campos esten fuera de foco el drag and drop se habilita
        if( !tarea.contains(document.activeElement)){
            tarea.setAttribute("draggable", true);
        }

        
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
    }
    
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
    let macroContenedor = document.querySelectorAll(".macroContenedor");
    macroContenedor.forEach(elemento => {

        let txtCont = elemento.querySelector(".textoContador");
        let contenedorTareasListadas = elemento.querySelector(".contenedorTareasListadas");

        let activas = 0;
        let finalizadas = 0;

        let tareasListadas = contenedorTareasListadas.querySelectorAll(".tareaListada");
        tareasListadas.forEach(tarea => {
            let estadoTarea = tarea.querySelector(".estadoTarea");
            if(!estadoTarea.checked){
                activas = activas + 1
            }
            if (estadoTarea.checked){
                finalizadas = finalizadas + 1
            }
        })

        txtCont.innerHTML = "[ " + activas + " / " + finalizadas + " ]";
    })
}

// Esta funcion crea el archivo JSON de tareas
function funcionGuardarTablero(event) {
    if (event) event.preventDefault();
    
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
                estadoTarea:tarea.querySelector(".estadoTarea").checked,
                tituloTarea: tarea.querySelector(".tituloTarea").value,
                textoTarea: tarea.querySelector(".textoTarea").value,
                pesoTarea: tarea.querySelector(".pesoTarea").value,
                etiqueta: tarea.querySelector(".etiqueta").value,
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

    // Establecemos el nombre del archivo, ya que este sera el nombre del Tablero
    let nombreArchivo = "";
    if (inputTitulo.value === ""){
            funcionObtenerFechaConHora()
            nombreArchivo = "Tablero" + " - " + fechaConHora;
        }else{
            nombreArchivo = inputTitulo.value+" - "+fechaConHora+".json";
    }

    // Descargar JSON
    let blob = new Blob([JSON.stringify(listaContenedores, null, 2)], { type: "application/json" });
    let enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = nombreArchivo;
    enlace.click();
    fechaUltimoGuardado.innerHTML = "Ultimo Guardado: " + funcionObtenerFechaConHora();
}

// Esta funcion carga el archivo JSON y lo reconstruye en el DOM
function funcionCargarTablero(event){ 
    //Cuando cargamos tablero se limpia el contenedor de contenedores
    let macroContenedor = document.querySelectorAll(".macroContenedor");
    macroContenedor.forEach(elemento =>{
        elemento.remove();
    });
    
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
                 let tarea = funcionDibujarTareas(
                    objetoContenedor[i].tareas[y].id_tareaListada,
                    objetoContenedor[i].tareas[y].estadoTarea,
                    objetoContenedor[i].tareas[y].tituloTarea,
                    objetoContenedor[i].tareas[y].textoTarea, 
                    objetoContenedor[i].tareas[y].pesoTarea,
                    objetoContenedor[i].tareas[y].etiqueta, 
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
    // El valor 21 es porque al archivo se le quitan los identificadores
    // de tipo de archivo [* - AAAAMMDD HHMMSS.json] el asterisco es la ultima letra del titulo del archivo
    inputTitulo.value = archivo.name.slice(0,-23);
    funcionTituloPestaña();
}

function funcionObtenerFechaConHora(){
        // Obtener la fecha actual
        let fecha = new Date();
        
        // Formatear a AAAA-MM-DD
        let año = String(fecha.getFullYear()).padStart(2,"0");
        let mes = String(fecha.getMonth()+1).padStart(2,"0"); // Esto se hace debido que los meses van de 0 a 11
        let dia = String(fecha.getDate()).padStart(2,"0");
        let fechaFormateada = año + mes + dia;
        
        // Formatear a HH MM
        let hora = String(fecha.getHours()).padStart(2,"0");;
        let minutos = String(fecha.getMinutes()).padStart(2,"0");
        let segundos = String(fecha.getSeconds()).padStart(2,"0");
        let horaFormateada = hora + minutos + segundos;
        
        // Fecha completa
        fechaConHora = fechaFormateada + " " + horaFormateada
        return fechaConHora;
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

// EVENTO PARA ESTABLECER FECHA DE CREACION
window.addEventListener("load", function(){
    
    fechaInicioSesion.innerHTML = "Inicio Sesion: " + funcionObtenerFechaConHora();
});
