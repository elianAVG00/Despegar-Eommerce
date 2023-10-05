let info = document.getElementById("info-vuelos");
let search = document.getElementById("search-vuelos");
let tabla = document.getElementById("tabla");
let vuelos_disp = document.getElementById("vuelos-disp");
let origen = document.getElementById("inputOrigen");
let destino = document.getElementById("inputDestino");
let fecha = document.getElementById("inputFechaHora");
let precio = document.getElementById("inputPrice");
let hora = document.getElementById("inputHorario");
let pasajeros = document.getElementById("inputPasaj");
let categoria = document.getElementById("inputCat");
let no_vuelos = document.getElementById("content-no-vuelos");
let formFiltro = document.getElementById("formFiltro");
const horas = [12, 15, 18, 21]
let mins = 0;




//Validaciones formulario de compra
// let validation = {
//     isCliente:function(str){
//         let pattern =/^[a-zA-Z\s]+$/;
//         return pattern.test(str);  // retorna un booleano
//     },
//     isCorreo:function (str){
//         let pattern =/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]{2,4}$/;
//         return pattern.test(str);  
//     },
//     isDireccion:function(str){
//         let pattern = /^[a-zA-Z0-9\s]+$/;
//         return pattern.test(str);  
//     },
//     isTelefono:function(str){
//         let pattern = /^([0-9]{8}|[0-9]{10})$/;
//         return pattern.test(str); 
//     }
// };  
const valores = {};


formFiltro.addEventListener("submit", (e)=>{
    e.preventDefault();
    let datForm = new FormData(e.target);
    console.log(datForm);
    valores.origen = datForm.get("inputDOrigen");
    valores.destino = datForm.get("inputDestino");
    valores.fecha_hora = datForm.get("inputFechaHora");
    let fechaForm = luxon.DateTime.fromISO(datForm.get("inputFechaHora"));
    valores.fecha_hora = fechaForm.toISO({ suppressMilliseconds: true, includeOffset: false });
    valores.pasajeros = datForm.get("inputPasaj");
    valores.categoria = datForm.get("inputCat");
    valores.precio = datForm.get("inputPrice");
    valores.horario = datForm.get("inputHorario");
    console.log(valores);
    formFiltro.reset();
})


// Obtener la fecha y hora actual en la zona horaria de Argentina
const fechaHoraArgentina = luxon.DateTime.now().setZone('America/Argentina/Buenos_Aires');
// Formatear la fecha y hora en un formato compatible con datetime-local
const formatoISOArg = fechaHoraArgentina.toISO({ suppressMilliseconds: true, includeOffset: false });
// const formatoLocal = formatoISOArg.slice(0, 19);
// console.log(formatoLocal)
document.getElementById("inputFechaHora").value = formatoISOArg;

function contTable(parametros){
    const {origen, destino, fechaForm, hour, categoria} = parametros;
    let horaFormat = hour + ':' + (mins < 10 ? '0' : '') + mins + 'hs';
    const row = document.createElement('tr');
    row.innerHTML = `
                <td class="">${origen}</td>
                <td class="">${destino}</td>
                <td class="">${fechaForm}</td>
                <td class="">${horaFormat}</td>
                <td class="">${categoria}</td>
                <td class="">
                    <button class="btn btn-success">Reservar</button>
                </td>
            `;
    info.appendChild(row);
}


// search.addEventListener("click", ()=>{
//     let fechaForm = luxon.DateTime.fromISO(fecha.value);
//     const formatoISOFechForm = fechaForm.toISO({ suppressMilliseconds: true, includeOffset: false });
//     console.log(formatoISOFechForm)
//     const hora = parseInt(fechaForm.toFormat('HH:mm').substring(0,2));

//     // Elimina la clase deseada al elemento si existe
//     if(vuelos_disp.classList.contains("d-none")){
//         vuelos_disp.classList.remove("d-none");
//     }

//     info.innerHTML = "";
//     horas.forEach(hour => {
//         const parametros = {
//             origen: origen.value,
//             destino: destino.value,
//             fechaForm: fechaForm.toLocaleString(luxon.DateTime.DATE_FULL),
//             hour,
//             categoria: categoria.value
//         };
//         if((hora < (hour - 1)) && (formatoISOFechForm == formatoLocal)){
//             no_vuelos.innerHTML = "";
//             contTable(parametros);
//         }
//         if(formatoISOFechForm != formatoLocal){
//             no_vuelos.innerHTML = "";
//             contTable(parametros);
//         }
//         if(formatoISOFechForm < formatoLocal){
//             info.innerHTML = "";
//             no_vuelos.innerHTML = "";
//             const row = document.createElement('h5');
//             row.classList.add("text-center", "my-2");
//             row.innerText = `
//                 No hay vuelos disponibles
//             `;

//             no_vuelos.appendChild(row);

//         }
        
//     });   
    
// })


window.addEventListener('load', ()=> {
    // Agrega la clase deseada al elemento si no existe
    vuelos_disp.classList.add("d-none");
    origen.value = "";
    destino.value = "";
    pasajeros.value = "";
    categoria.value = "";
    hora.value = "";
});

