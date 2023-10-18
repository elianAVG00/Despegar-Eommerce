let info = document.getElementById("info-vuelos");
let search = document.getElementById("search-vuelos");
let tabla = document.getElementById("tabla");
let vuelos_disp = document.getElementById("vuelos-disp");
let paginacion = document.getElementById("paginacion");
// Obtén una referencia al elemento <select> en el HTML
let origen = document.getElementById("dropdownOrigen");
let destino = document.getElementById("dropdownDestino");
let categoria = document.getElementById("dropdownCategoria");
let precio = document.getElementById("dropdownPrecio");
let horario = document.getElementById("dropdownHorario");
let form = document.getElementById("formVuelo");
let fecha = document.getElementById("inputFecha");
let no_vuelos = document.getElementById("content-no-vuelos");
let arrPrecio;
let arrHorario;
let arrValoresForm = [];
let nuevoPrecio;
let cat;
let parametro;
// Configurar Luxon en español
luxon.Settings.defaultLocale = 'es';



 

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let dataForm = new FormData(e.target);
    if ((origen.value === 'Origen') && (destino.value === 'Destino') && 
        (dataForm.get('fecha') === "") &&  
        (categoria.value === 'Categoria') && (precio.value === 'Precio')
        && (horario.value === 'Horario')) {
        Swal.fire({
            type: 'error',
            text: 'Ingrese todos los campos requeridos',
            showConfirmButton: true
        })
    }
    else if ((origen.value !== 'Origen') && (destino.value !== 'Destino') && 
        (dataForm.get('fecha') !== "") &&  
        (categoria.value !== 'Categoria') && (precio.value !== 'Precio')
        && (horario.value !== 'Horario')){
            nuevoPrecio = Number(precio.value.substring(1));
            arrValoresForm.splice(0, arrValoresForm.length);
            cat = "Completo";
            arrValoresForm.push(origen.value, destino.value, dataForm.get('fecha'),
                categoria.value, nuevoPrecio, horario.value);
            cargarVuelosGenerales(arrValoresForm, cat);
    }
    else if((origen.value !== 'Origen') && (destino.value !== 'Destino') && 
            (dataForm.get('fecha') !== "") &&  
            (categoria.value !== 'Categoria') && (precio.value !== 'Precio')){
            nuevoPrecio = Number(precio.value.substring(1));
            arrValoresForm.splice(0, arrValoresForm.length);
            cat = "ODFCP";
            arrValoresForm.push(origen.value, destino.value, dataForm.get('fecha'),
                categoria.value, nuevoPrecio);
            cargarVuelosGenerales(arrValoresForm, cat);
    }
    else if((origen.value !== 'Origen') && (destino.value !== 'Destino') && 
            (dataForm.get('fecha') !== "") &&  
            (categoria.value !== 'Categoria')){
            arrValoresForm.splice(0, arrValoresForm.length);
            cat = "ODFC";
            arrValoresForm.push(origen.value, destino.value, dataForm.get('fecha'),
                categoria.value);
            cargarVuelosGenerales(arrValoresForm, cat);     
    }
    else if((origen.value !== 'Origen') && (destino.value !== 'Destino') && 
            (dataForm.get('fecha') !== "")){
            arrValoresForm.splice(0, arrValoresForm.length);
            cat = "ODF";
            arrValoresForm.push(origen.value, destino.value, dataForm.get('fecha'));
            cargarVuelosGenerales(arrValoresForm, cat);      
    }
    else if((origen.value !== 'Origen') && (destino.value !== 'Destino')){
        arrValoresForm.splice(0, arrValoresForm.length);
        cat = "OD";
        arrValoresForm.push(origen.value, destino.value);
        cargarVuelosGenerales(arrValoresForm, cat);
    }
    else if((destino.value !== 'Destino') && (dataForm.get('fecha') !== "") &&  
    (categoria.value !== 'Categoria') && (precio.value !== 'Precio') && 
    (horario.value !== 'Horario')){
        nuevoPrecio = Number(precio.value.substring(1));
        arrValoresForm.splice(0, arrValoresForm.length);
        cat = "DFCPH";
        arrValoresForm.push(destino.value, dataForm.get('fecha'),
        categoria.value, nuevoPrecio, horario.value);
        cargarVuelosGenerales(arrValoresForm, cat);
    }
    else if ( (dataForm.get('fecha') !== "") &&  
    (categoria.value !== 'Categoria') && (precio.value !== 'Precio')
    && (horario.value !== 'Horario')){
        nuevoPrecio = Number(precio.value.substring(1));
        arrValoresForm.splice(0, arrValoresForm.length);
        cat = "FCPH";
        arrValoresForm.push(dataForm.get('fecha'), categoria.value, nuevoPrecio, horario.value);
        cargarVuelosGenerales(arrValoresForm, cat);
    }
    else if ((categoria.value !== 'Categoria') && (precio.value !== 'Precio')
    && (horario.value !== 'Horario')){
        nuevoPrecio = Number(precio.value.substring(1));
        arrValoresForm.splice(0, arrValoresForm.length);
        cat = "CPH";
        arrValoresForm.push(categoria.value, nuevoPrecio, horario.value);
        cargarVuelosGenerales(arrValoresForm, cat);
    }
    else if ((precio.value !== 'Precio') && (horario.value !== 'Horario')){
        nuevoPrecio = Number(precio.value.substring(1));
        arrValoresForm.splice(0, arrValoresForm.length);
        cat = "PH";
        arrValoresForm.push(nuevoPrecio, horario.value);
        cargarVuelosGenerales(arrValoresForm, cat);
    }
    else if ((destino.value !== 'Destino') && (dataForm.get('fecha') !== "") &&  
    (categoria.value !== 'Categoria') && (precio.value !== 'Precio')){
        nuevoPrecio = Number(precio.value.substring(1));
        arrValoresForm.splice(0, arrValoresForm.length);
        cat = "DFCP";
        arrValoresForm.push(destino.value, dataForm.get('fecha'),
        categoria.value, nuevoPrecio);
        cargarVuelosGenerales(arrValoresForm, cat);
    }
    else if ((dataForm.get('fecha') !== "") &&  
    (categoria.value !== 'Categoria') && (precio.value !== 'Precio')){
        nuevoPrecio = Number(precio.value.substring(1));
        arrValoresForm.splice(0, arrValoresForm.length);
        cat = "FCP";
        arrValoresForm.push(dataForm.get('fecha'), categoria.value, nuevoPrecio);
        cargarVuelosGenerales(arrValoresForm, cat);
    }
    else if ((categoria.value !== 'Categoria') && (precio.value !== 'Precio')){
        nuevoPrecio = Number(precio.value.substring(1));
        arrValoresForm.splice(0, arrValoresForm.length);
        cat = "CP";
        arrValoresForm.push(categoria.value, nuevoPrecio);
        cargarVuelosGenerales(arrValoresForm, cat);
    }
    else if ((destino.value !== 'Destino') && (dataForm.get('fecha') !== "") &&  
    (categoria.value !== 'Categoria')){
        arrValoresForm.splice(0, arrValoresForm.length);
        cat = "DFC";
        arrValoresForm.push(destino.value, dataForm.get('fecha'), categoria.value);
        cargarVuelosGenerales(arrValoresForm, cat);
    }
    else if ((categoria.value !== 'Categoria') && (horario.value !== 'Horario')){
        arrValoresForm.splice(0, arrValoresForm.length);
        cat = "CH";
        arrValoresForm.push(categoria.value, horario.value);
        cargarVuelosGenerales(arrValoresForm, cat);
    }
    else if ((destino.value !== 'Destino') && (horario.value !== 'Horario')){
        arrValoresForm.splice(0, arrValoresForm.length);
        cat = "DH";
        arrValoresForm.push((destino.value, horario.value));
        cargarVuelosGenerales(arrValoresForm, cat);
    }
    else if(origen.value !== 'Origen'){
        cat = "Origen";
        cargarVuelosGenerales(origen.value, cat);
    }
    else if(destino.value !== 'Destino'){
        cat = "Destino";
        cargarVuelosGenerales(destino.value, cat);
    }
    else if(dataForm.get('fecha') !== ''){
        cat = "Fecha";
        cargarVuelosGenerales(dataForm.get('fecha'), cat);
    }
    else if(precio.value !== 'Precio'){
        nuevoPrecio = Number(precio.value.substring(1));
        cat = "Precio";
        cargarVuelosGenerales(nuevoPrecio, cat);
    }
    else if(categoria.value !== 'Categoria'){
        cat = "Categoria";
        cargarVuelosGenerales(categoria.value, cat);
    }
    else if(horario.value !== 'Horario'){
        cat = "Horario";
        cargarVuelosGenerales(horario.value, cat);
    }
    else{
        console.log("No hay mas filtros");
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

function filtrarPorDFCPH(arr, param){
    const [paramD, paramF, paramC, paramP, paramH] = param;
    let filtAll = arr.filter(el => (el.destino == paramD) && (el.categoria == paramC) 
                                && (el.precio <= paramP) && (el.horario == paramH));
    return filtAll;
}

function filtrarPorFCPH(arr, param){
    const [paramF, paramC, paramP, paramH] = param;
    let filtAll = arr.filter(el => (el.categoria == paramC) 
                                && (el.precio <= paramP) && (el.horario == paramH));
    return filtAll;
}

function filtrarPorCPH(arr, param){
    const [paramC, paramP, paramH] = param;
    let filtAll = arr.filter(el => (el.categoria == paramC) 
                                && (el.precio <= paramP) && (el.horario == paramH));
    return filtAll;
}

function filtrarPorPH(arr, param){
    const [paramP, paramH] = param;
    let filtAll = arr.filter(el => (el.precio <= paramP) && (el.horario == paramH));
    return filtAll;
}

function filtrarPorDFCP(arr, param){
    const [paramD, paramF, paramC, paramP] = param;
    let filtAll = arr.filter(el => (el.destino == paramD)  
                                && (el.categoria == paramC) && (el.precio <= paramP));
    return filtAll;
}

function filtrarPorFCP(arr, param){
    const [paramF, paramC, paramP] = param;
    let filtAll = arr.filter(el => (el.categoria == paramC) && (el.precio <= paramP));
    return filtAll;
}

function filtrarPorCP(arr, param){
    const [paramC, paramP] = param;
    let filtAll = arr.filter(el => (el.categoria == paramC) && (el.precio <= paramP));
    return filtAll;
}

function filtrarPorDFC(arr, param){
    const [paramD, paramF, paramC] = param;
    let filtAll = arr.filter(el => (el.destino == paramD) && (el.categoria == paramC));
    return filtAll;
}


function filtrarPorCH(arr, param){
    const [paramC, paramH] = param;
    let filtAll = arr.filter(el => (el.categoria == paramC) && (el.horario == paramH));
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
    if(Array.isArray(param)){
        parametro = param;
    }
    switch (cate) {
        case "Origen":
            return filtrarPorOrigen(cargarDatosPHF(fechaFormateada, arr), param);
            break;
        case "Destino":
            return filtrarPorDestino(cargarDatosPHF(fechaFormateada, arr), param);
            break;
        case "Categoria":
            return filtrarPorCategoria(cargarDatosPHF(fechaFormateada, arr), param);
            break;
        case "Precio":
            return filtrarPorPrecio(cargarDatosPHF(fechaFormateada, arr), param);
            break;
        case "Horario":
            return filtrarPorHorario(cargarDatosPHF(fechaFormateada, arr), param);
            break;
        case "Fecha":
            return cargarDatosPHF(param, arr);
            break;
        case "OD":
            return filtrarPorOD(cargarDatosPHF(fechaFormateada, arr), parametro);
            break;
        case "ODF":
            return filtrarPorOD(cargarDatosPHF(parametro[2], arr), parametro);
            break;
        case "ODFC":
            return filtrarPorODFC(cargarDatosPHF(parametro[2], arr), parametro);
            break;
        case "ODFCP":
            return filtrarPorODFCP(cargarDatosPHF(parametro[2], arr), parametro);
            break;
        case "DFCPH":
            return filtrarPorDFCPH(cargarDatosPHF(parametro[1], arr), parametro);
            break;
        case "FCPH":
            return filtrarPorFCPH(cargarDatosPHF(parametro[0], arr), parametro);
            break;
        case "CPH":
            return filtrarPorCPH(cargarDatosPHF(fechaFormateada, arr), parametro);
            break;
        case "PH":
            return filtrarPorPH(cargarDatosPHF(fechaFormateada, arr), parametro);
            break;
        case "DFCP":
            return filtrarPorDFCP(cargarDatosPHF(parametro[1], arr), parametro);
            break;
        case "FCP":
            return filtrarPorFCP(cargarDatosPHF(parametro[0], arr), parametro);
            break;
        case "CP":
            return filtrarPorCP(cargarDatosPHF(fechaFormateada, arr), parametro);
            break;
        case "DFC":
            return filtrarPorDFC(cargarDatosPHF(parametro[1], arr), parametro);
            break;
        case "CH":
            return filtrarPorCH(cargarDatosPHF(fechaFormateada, arr), parametro);
            break;
        case "Completo":
            return filtrarPorTodo(cargarDatosPHF(parametro[2], arr), parametro);
            break;
        default:
            break;
    }
    
    
}

function cargarDatosPHF(fechaForm, array){
    arrPrecio = aplicarPrecioTodos(array);
    arrHorario = aplicarHorarioTodos(arrPrecio);
    return aplicarFecha(arrHorario, fechaForm);
}


function aplicarPrecio(arr, param){
    let arrayClone = structuredClone(arr);
    switch (param) {
        case "Clase Turista":
            arrayClone.forEach(el => {
                el.categoria = param
            });
            return arrayClone;
            break;
        case "Clase Premium Economy":
            arrayClone.forEach(el => {
                el.categoria = param;
                el.precio = Math.floor(el.precio * (1 + 0.10))
            });
            return arrayClone;
            break;
        case "Clase Ejecutiva":
            arrayClone.forEach(el => {
                el.categoria = param;
                el.precio = Math.floor(el.precio * (1 + 0.20))
            });
            return arrayClone;
            break;
        case "Primera Clase":
            arrayClone.forEach(el => {
                el.categoria = param;
                el.precio = Math.floor(el.precio * (1 + 0.30))
            });
            return arrayClone;
            break;
    
        default:
            break;
    }
}

function aplicarHorario(arr, param){
    let arrayCloneHor = structuredClone(arr);
    arrayCloneHor.forEach(el => {
        el.horario = param;
    });
    return arrayCloneHor;
}


function aplicarHorarioTodos(arr){
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
    let arr1 = aplicarPrecio(arr, "Clase Turista");
    let arr2 = aplicarPrecio(arr, "Clase Premium Economy");
    let arr3 = aplicarPrecio(arr, "Clase Ejecutiva");
    let arr4 = aplicarPrecio(arr, "Primera Clase");
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
        info.innerHTML = "";
        no_vuelos.innerHTML = "";
        if(!filtro || filtro.length == 0){
            paginacion.innerHTML = "";
            const row = document.createElement('h5');
            row.classList.add("text-center", "my-2");
            row.innerText = `
                No hay vuelos disponibles
            `;

            no_vuelos.appendChild(row);

        }
        else{
            paginaActual = 1;
            mostrarDatos(filtro, paginaActual);

        }
        
        // Elimina la clase deseada al elemento si existe
        if(vuelos_disp.classList.contains("d-none")){
            vuelos_disp.classList.remove("d-none");
        }
  
    } catch (error) {
        console.error(error);
    }
}

function mostrarDatos(datos = '', pagina) {
    paginaActual = pagina;
    generarBotonesPaginacion(datos);
    const inicio = (paginaActual - 1) * resultadosPorPagina;
    const fin = paginaActual * resultadosPorPagina;
    let filtro = datos.slice(inicio, fin);
    filtro.forEach(vuelo => {
        let {id, origen, destino, aeropuertoIda, aeropuertoVuelta, 
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
                                <button class="btn btn-success add-cart generales" onclick="addCartClicked(event)">Agregar al carrito</button>
                            </td>
        `
        info.appendChild(vueloTr);

        
    });

        

}

// Función para generar los botones de paginación usando Bootstrap
function generarBotonesPaginacion(datos) {
    const paginacionUl = document.querySelector('#paginacion');
    paginacionUl.innerHTML = '';
  
    const totalPaginas = Math.ceil(datos.length / resultadosPorPagina);
  
    
  datos.slice(0, totalPaginas).forEach((_, index) => {
      const li = document.createElement('li');
      li.classList.add('page-item');
      
      const a = document.createElement('button');
      a.classList.add('page-link');
      a.innerText = index + 1;
      
  
      a.addEventListener('click', (e) => {
        e.preventDefault();
        // Eliminar la clase 'active' de todos los botones
        const botones = [...document.querySelectorAll('.page-item')];
        botones.forEach((boton) => {
            boton.classList.remove('active');
        });

        // Agregar la clase 'active' solo al botón seleccionado
        // li.classList.add('active');
        paginaActual = index + 1;
        info.innerHTML = "";
        mostrarDatos(datos, paginaActual);
        generarBotonesPaginacion(datos);
      });

      if (paginaActual === (index + 1)) {
        a.classList.add("active"); // Agregar una clase "active" al botón de la página actual
      }
  
      li.appendChild(a);
      paginacionUl.appendChild(li);
    });
  }


window.addEventListener('load', ()=> {
    // Agrega la clase deseada al elemento si no existe
    vuelos_disp.classList.add("d-none");
});

