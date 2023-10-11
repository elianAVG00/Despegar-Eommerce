let info = document.getElementById("info-vuelos");
let search = document.getElementById("search-vuelos");
let tabla = document.getElementById("tabla");
let vuelos_disp = document.getElementById("vuelos-disp");
// let pasajeros = document.getElementById("inputPasaj");
// Obtén una referencia al elemento <select> en el HTML
let dropdownOrigen = document.getElementById("dropdownOrigen");
let dropdownDestino = document.getElementById("dropdownDestino");
let dropdownCategoria = document.getElementById("dropdownCategoria");
let dropdownPrecio = document.getElementById("dropdownPrecio");
let dropdownHorario = document.getElementById("dropdownHorario");
let form = document.getElementById("formVuelo");
let fecha = document.getElementById("inputFecha");
let no_vuelos = document.getElementById("content-no-vuelos");
let arrPrecio;
let arrOrigen;
let arrDestino;
let arrHorario;
let arrFecha;
let filtroAll;
// Configurar Luxon en español
luxon.Settings.defaultLocale = 'es';
let arrayFinal = [];
let arrayODFCP = [];
let arrayODFC = [];
let arrayODF = [];
let arrayOD = [];


 

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target);
    let dataForm = new FormData(e.target);
    if ((dropdownOrigen.value === 'Origen') && (dropdownDestino.value === 'Destino') && 
        (dataForm.get('fecha') === "") &&  
        (dropdownCategoria.value === 'Categoria') && (dropdownPrecio.value === 'Precio')
        && (dropdownHorario.value === 'Horario')) {
        Swal.fire({
            type: 'error',
            text: 'Ingrese todos los campos requeridos',
            showConfirmButton: true
        })
    }
    else if ((dropdownOrigen.value !== 'Origen') && (dropdownDestino.value !== 'Destino') && 
        (dataForm.get('fecha') !== "") &&  
        (dropdownCategoria.value !== 'Categoria') && (dropdownPrecio.value !== 'Precio')
        && (dropdownHorario.value !== 'Horario')){
            let nuevoOrigen = dropdownOrigen.value;
            let nuevoDestino = dropdownDestino.value;
            let nuevoPrecio;
            if(dropdownPrecio.value == "Precio"){
                nuevoPrecio = dropdownPrecio.value;
            }
            else{
                nuevoPrecio = Number(dropdownPrecio.value.substring(1));
            }

            let nuevoCategoria = dropdownCategoria.value;
            let nuevoHorario = dropdownHorario.value;
            let nuevaFecha = dataForm.get('fecha');
            let cat = "Completo";
            arrayFinal.push(nuevoOrigen, nuevoDestino, nuevaFecha, nuevoCategoria, nuevoPrecio,
                nuevoHorario);
            console.log(arrayFinal);
            cargarVuelosGenerales(arrayFinal, cat);

    }
    else if((dropdownOrigen.value !== 'Origen') && (dropdownDestino.value !== 'Destino') && 
            (dataForm.get('fecha') !== "") &&  
            (dropdownCategoria.value !== 'Categoria') && (dropdownPrecio.value !== 'Precio')){
            let nuevoOrigen = dropdownOrigen.value;
            let nuevoDestino = dropdownDestino.value;
            let nuevoPrecio;
            if(dropdownPrecio.value == "Precio"){
                nuevoPrecio = dropdownPrecio.value;
            }
            else{
                nuevoPrecio = Number(dropdownPrecio.value.substring(1));
            }

            let nuevoCategoria = dropdownCategoria.value;
            let nuevaFecha = dataForm.get('fecha');
            let cat = "ODFCP";
            arrayODFCP.push(nuevoOrigen, nuevoDestino, nuevaFecha, nuevoCategoria, nuevoPrecio);
            cargarVuelosGenerales(arrayODFCP, cat);
    }
    else if((dropdownOrigen.value !== 'Origen') && (dropdownDestino.value !== 'Destino') && 
            (dataForm.get('fecha') !== "") &&  
            (dropdownCategoria.value !== 'Categoria')){
            let nuevoOrigen = dropdownOrigen.value;
            let nuevoDestino = dropdownDestino.value;
            let nuevoCategoria = dropdownCategoria.value;
            let nuevaFecha = dataForm.get('fecha');
            let cat = "ODFC";
            arrayODFC.push(nuevoOrigen, nuevoDestino, nuevaFecha, nuevoCategoria);
            cargarVuelosGenerales(arrayODFC, cat);
            
    }
    else if((dropdownOrigen.value !== 'Origen') && (dropdownDestino.value !== 'Destino') && 
            (dataForm.get('fecha') !== "")){
            let nuevoOrigen = dropdownOrigen.value;
            let nuevoDestino = dropdownDestino.value;
            let nuevaFecha = dataForm.get('fecha');
            let cat = "ODF";
            arrayODF.push(nuevoOrigen, nuevoDestino, nuevaFecha);
            cargarVuelosGenerales(arrayODF, cat);
            
    }
    else if((dropdownOrigen.value !== 'Origen') && (dropdownDestino.value !== 'Destino')){
        let nuevoOrigen = dropdownOrigen.value;
        let nuevoDestino = dropdownDestino.value;
        let cat = "OD";
        arrayOD.push(nuevoOrigen, nuevoDestino);
        cargarVuelosGenerales(arrayOD, cat);
    }
    else if(dropdownOrigen.value !== 'Origen'){
        let nuevoOrigen = dropdownOrigen.value;
        let cat = "Origen";
        cargarVuelosGenerales(nuevoOrigen, cat);
    }
    else if(dropdownDestino.value !== 'Destino'){
        let nuevoDestino = dropdownDestino.value;
        let cat = "Destino";
        cargarVuelosGenerales(nuevoDestino, cat);
    }
    else if(dropdownPrecio.value !== 'Precio'){
        let nuevoPrecio = Number(dropdownPrecio.value.substring(1));
        let cat = "Precio";
        cargarVuelosGenerales(nuevoPrecio, cat);
    }
    else if(dropdownCategoria.value !== 'Categoria'){
        let nuevoCategoria = dropdownCategoria.value;
        let cat = "Categoria";
        cargarVuelosGenerales(nuevoCategoria, cat);
    }
    else if(dropdownHorario.value !== 'Horario'){
        let nuevoHorario = dropdownHorario.value;
        let cat = "Horario";
        cargarVuelosGenerales(nuevoHorario, cat);
    }
    else if(dropdownHorario.value !== ''){
        console.log(dataForm.get('fecha')); 
        let cat = "Fecha";
        cargarVuelosGenerales(dataForm.get('fecha'), cat);
    }
    
    form.reset(); 
});



function filtrarPorPrecio(arr, precioFilt){
    let filtPrecio = arr.filter(el => el.precio <= precioFilt);
    return filtPrecio;
}

function filtrarPorOrigen(arr, origFilt){
    let filtOrigen = arr.filter(el => el.origen == origFilt);
    return filtOrigen;
}

function filtrarPorDestino(arr, destFilt){
    let filtDestino = arr.filter(el => el.destino == destFilt);
    return filtDestino;
}

function filtrarPorHorario(arr, param){
    let filtHorario = arr.filter(el => el.horario == param);
    return filtHorario;
}

function filtrarPorCategoria(arr, param){
    let filtCategoria = arr.filter(el => el.categoria == param);
    return filtCategoria;
}

function filtrarPorOD(arr, param){
    const [paramO, paramD] = param;
    let filtAll = arr.filter(el => (el.origen == paramO) && (el.destino == paramD));
    return filtAll;
}


function filtrarPorODFC(arr, param){
    const [paramO, paramD, paramF, paramC] = param;
    let filtAll = arr.filter(el => (el.origen == paramO) && (el.destino == paramD)
                              && (el.categoria == paramC));
    return filtAll;
}

function filtrarPorODFCP(arr, param){
    const [paramO, paramD, paramF, paramC, paramP] = param;
    let filtAll = arr.filter(el => (el.origen == paramO) && (el.destino == paramD)
                              && (el.categoria == paramC) && (el.precio <= paramP));
    return filtAll;
}

function filtrarPorTodo(arr, param){
    const [paramO, paramD, paramF, paramC, paramP, paramH] = param;
    let filtAll = arr.filter(el => (el.origen == paramO) && (el.destino == paramD)  
                                    && (el.categoria == paramC) && (el.precio <= paramP) 
                                    && (el.horario == paramH));
    return filtAll;
}



function cargarFiltro(arr, param, cate){
    const fechaActual = luxon.DateTime.now();
    // Formatear la fecha en el formato deseado (aaaa-mm-dd)
    const fechaFormateada = fechaActual.toFormat('yyyy-MM-dd');
    switch (cate) {
        case "Origen":
            arrPrecio = aplicarPrecioTodos(arr);
            arrHorario = aplicarHorarioTodos(arrPrecio);
            arrFecha = aplicarFecha(arrHorario, fechaFormateada);
            return filtrarPorOrigen(arrFecha, param);
            break;
        case "Destino":
            arrPrecio = aplicarPrecioTodos(arr);
            arrHorario = aplicarHorarioTodos(arrPrecio);
            arrFecha = aplicarFecha(arrHorario, fechaFormateada);
            return filtrarPorDestino(arrFecha, param);
            break;
        case "Categoria":
            arrPrecio = aplicarPrecioTodos(arr);
            arrHorario = aplicarHorarioTodos(arrPrecio);
            arrFecha = aplicarFecha(arrHorario, fechaFormateada);
            return filtrarPorCategoria(arrFecha, param);
            break;
        case "Precio":
            arrPrecio = aplicarPrecioTodos(arr);
            arrHorario = aplicarHorarioTodos(arrPrecio);
            arrFecha = aplicarFecha(arrHorario, fechaFormateada);
            return filtrarPorPrecio(arrFecha, param);
            break;
        case "Horario":
            arrPrecio = aplicarPrecioTodos(arr);
            arrHorario = aplicarHorarioTodos(arrPrecio);
            arrFecha = aplicarFecha(arrHorario, fechaFormateada);
            return filtrarPorHorario(arrFecha, param);
            break;
        case "Fecha":
            arrPrecio = aplicarPrecioTodos(arr);
            arrHorario = aplicarHorarioTodos(arrPrecio);
            return aplicarFecha(arrHorario , param);
            break;
        case "OD":
            arrPrecio = aplicarPrecioTodos(arr);
            arrHorario = aplicarHorarioTodos(arrPrecio);
            arrFecha = aplicarFecha(arrHorario, fechaFormateada);
            return filtrarPorOD(arrFecha, param)
            break;
        case "ODF":
            let [paramOr, paramDe, paramFe] = param;
            arrPrecio = aplicarPrecioTodos(arr);
            arrHorario = aplicarHorarioTodos(arrPrecio);
            arrFecha = aplicarFecha(arrHorario, paramFe);
            return filtrarPorOD(arrFecha, param);
            break;
        case "ODFC":
            let [paramOri, paramDes, paramFec, paramCat] = param;
            arrPrecio = aplicarPrecioTodos(arr);
            arrHorario = aplicarHorarioTodos(arrPrecio);
            arrFecha = aplicarFecha(arrHorario, paramFec);
            return filtrarPorODFC(arrFecha, param);
            break;
        case "ODFCP":
            let [paramOrig, paramDest, paramFech, paramCate, paramPrec] = param;
            arrPrecio = aplicarPrecioTodos(arr);
            arrHorario = aplicarHorarioTodos(arrPrecio);
            arrFecha = aplicarFecha(arrHorario, paramFech);
            return filtrarPorODFCP(arrFecha, param);
            break;
        case "Completo":
            let [paramO, paramD, paramF, paramC, paramP, paramH] = param;
            console.log(paramF);
            arrPrecio = aplicarPrecioTodos(arr);
            console.log(arrPrecio);
            arrHorario = aplicarHorarioTodos(arrPrecio);
            console.log(arrHorario);
            arrFecha = aplicarFecha(arrHorario , paramF)
            console.log(arrFecha);
            filtroAll = filtrarPorTodo(arrFecha, param);
            console.log(filtroAll);
            return filtroAll;
            break;
        default:
            break;
    }
    
    
}

function aplicarPrecioTurista(arr, param){
    let arrayClone = structuredClone(arr);
    arrayClone.forEach(el => {
        el.categoria = param
    });
    return arrayClone;
}

function aplicarPrecioPremium(arr, param){
    let arrayClone1 = structuredClone(arr);
    arrayClone1.forEach(el => {
        el.categoria = param;
        el.precio = Math.floor(el.precio * (1 + 0.10))
    
    });
    return arrayClone1;
}

function aplicarPrecioEjecutiva(arr, param){
    let arrayClone2 = structuredClone(arr);
    arrayClone2.forEach(el => {
        el.categoria = param;
        el.precio = Math.floor(el.precio * (1 + 0.20))
    
    });
    return arrayClone2;
}

function aplicarPrecioPrimera(arr, param){
    let arrayClone3 = structuredClone(arr);
    arrayClone3.forEach(el => {
        el.categoria = param;
        el.precio = Math.floor(el.precio * (1 + 0.30))
    
    });
    return arrayClone3;
}

function aplicarHorario(arr, param){
    let arrayCloneHor = structuredClone(arr);
    arrayCloneHor.forEach(el => {
        el.horario = param;
    });
    return arrayCloneHor;
}


function aplicarHorarioTodos(arr){
    // console.log(arr);
    let arr1 = aplicarHorario(arr, "08:00hs");
    let arr2 = aplicarHorario(arr, "11:00hs");
    let arr3 = aplicarHorario(arr, "14:00hs");
    let arr4 = aplicarHorario(arr, "17:00hs");
    let arr5 = aplicarHorario(arr, "20:00hs");
    let arr6 = aplicarHorario(arr, "23:00hs");
    let arrayAll = arr1.concat(arr2, arr3, arr4, arr5, arr6);
    return arrayAll;
}

function aplicarFecha(arr, param){
    let arrayCloneHor = structuredClone(arr);
    arrayCloneHor.forEach(el => {
        el.fecha = param;
    });
    return arrayCloneHor;
}



function aplicarPrecioTodos(arr){
    // console.log(arr);
    let arr1 = aplicarPrecioTurista(arr, "Clase Turista");
    let arr2 = aplicarPrecioPremium(arr, "Clase Premium Economy");
    let arr3 = aplicarPrecioEjecutiva(arr, "Clase Ejecutiva");
    let arr4 = aplicarPrecioPrimera(arr, "Primera Clase");
    let arrayAll = arr1.concat(arr2, arr3, arr4);
    return arrayAll;
}

const resultadosPorPagina = 20; // Número de elementos por página
let paginaActual = 1; // Página actual



async function cargarVuelosGenerales(param, categoria){
    try {
        const response = await fetch("../data/vuelos.json");
        if (!response.ok) {
            throw new Error('No se pudieron cargar los datos.');
        }
        let dataVuelos = await response.json();
        let filtro = cargarFiltro(dataVuelos, param, categoria);
        console.log(filtro);
        info.innerHTML = "";
        if(!filtro || filtro.length == 0){
            info.innerHTML = "";
            no_vuelos.innerHTML = "";
            const row = document.createElement('h5');
            row.classList.add("text-center", "my-2");
            row.innerText = `
                No hay vuelos disponibles
            `;

            no_vuelos.appendChild(row);

        }
        else{
            mostrarDatos(filtro);

        }
        
        // Elimina la clase deseada al elemento si existe
        if(vuelos_disp.classList.contains("d-none")){
            vuelos_disp.classList.remove("d-none");
        }
  
    } catch (error) {
        console.error(error);
    }
}

function mostrarDatos(datos = '') {
    generarBotonesPaginacion(datos);
    const inicio = (paginaActual - 1) * resultadosPorPagina;
    const fin = paginaActual * resultadosPorPagina;
    let filtro = datos.slice(inicio, fin);
    filtro.forEach(vuelo => {
        let {origen, destino, aeropuertoIda, aeropuertoVuelta, 
            fecha, categoria, precio, horario} = vuelo;
        const vueloTr = document.createElement('tr');
        vueloTr.innerHTML+= `
                            <td class="">${origen}</td>
                            <td class="">${destino}</td>
                            <td class="">${aeropuertoIda}</td>
                            <td class="">${aeropuertoVuelta}</td>
                            <td class="">${fecha}</td>
                            <td class="">${categoria}</td>
                            <td class="">$${precio}</td>
                            <td class="">${horario}</td>
                            <td class="">
                                <button class="btn btn-success">Agregar al carrito</button>
                            </td>
        `
        document.cookie = "origen: " + origen + ",destino: " + destino + ",aeropuertoIda: " + aeropuertoIda + ",aeropuertoVuelta: " + aeropuertoVuelta
            + ",fecha: " + fecha + ",categoria: " + categoria + ",precio: " + precio + ",horario: " + horario;
        console.log(document.cookie);
        info.appendChild(vueloTr);

        
    });

        

}

// Función para generar los botones de paginación usando Bootstrap
function generarBotonesPaginacion(datos) {
    const paginacionUl = document.querySelector('#paginacion');
    paginacionUl.innerHTML = '';
    console.log(datos)
  
    const totalPaginas = Math.ceil(datos.length / resultadosPorPagina);
  
    
  datos.slice(0, totalPaginas).forEach((_, index) => {
      const li = document.createElement('li');
      li.classList.add('page-item');
      
      const a = document.createElement('a');
      a.classList.add('page-link');
      a.href = '#';
      a.innerText = index + 1;

      
  
      a.addEventListener('click', (e) => {
        e.preventDefault();
        // Eliminar la clase 'active' de todos los botones
        const botones = document.querySelectorAll('.page-link');
        botones.forEach((boton) => {
            boton.classList.remove('active');
        });

        console.log(e.target);
        // Agregar la clase 'active' solo al botón seleccionado
        li.classList.add('active');
        paginaActual = index + 1;
        info.innerHTML = "";
        mostrarDatos(datos);
        generarBotonesPaginacion(datos);
      });
  
      li.appendChild(a);
      paginacionUl.appendChild(li);
    });
  }


window.addEventListener('load', ()=> {
    // Agrega la clase deseada al elemento si no existe
    vuelos_disp.classList.add("d-none");
});

// mostrarDatos();
