document.addEventListener('DOMContentLoaded', function() {
  
  // Obtén una referencia al elemento <select> en el HTML
  let dropdownOrigen = document.getElementById("dropdownOrigen");
  let dropdownDestino = document.getElementById("dropdownDestino");
  let dropdownCategoria = document.getElementById("dropdownCategoria");
  let dropdownPrecio = document.getElementById("dropdownPrecio");
  let dropdownHorario = document.getElementById("dropdownHorario");

  let origenes = ["Origen", "Buenos Aires", "Entre Rios", "Santa Fe", 
                  "San Carlos de Bariloche", "Puerto Iguazu", "Mendoza",
                  "Salta", "San Salvador de Jujuy", "Rio de Janeiro"];

  // Creo un arreglo de destino que deseas agregar al select de manera dinámica
  let destinos = ["Destino", "San Carlos de Bariloche", "Puerto Iguazu", "Salta", 
                  "Miami", "San Salvador de Jujuy", "Rio de Janeiro", "Mendoza",
                  "Barcelona", "Paris","Múnich", "Roma", "Ámsterdam"];
  
  let categorias = ["Categoria", "Primera Clase", "Clase Ejecutiva", "Clase Premium Economy", "Clase Turista"];

  let precios = ["Precio", "$15000", "$30000", "$60000", "$100000", "$200000", "$300000", "$400000"];
  
  let horarios = ["Horario", "08:00hs", "11:00hs", "14:00hs", "17:00hs", "20:00hs", "23:00hs"];

  function selectDropdown(arr, drop){
    // Itera a través del arreglo de valores y crea una <option> para cada uno
      for (let i = 0; i < arr.length; i++) {
        let opcion = document.createElement("option");
        opcion.text = arr[i];
        opcion.value = arr[i];
        if(i == 0){
          opcion.setAttribute("disabled", true);
          opcion.setAttribute("selected", true);
        }
        drop.appendChild(opcion);
      }

      // Ahora, puedes agregar un evento para manejar la selección de opciones, por ejemplo:
      drop.addEventListener("change", function() {
          let seleccion = drop.options[drop.selectedIndex].value;
      });

  }

  selectDropdown(origenes, dropdownOrigen);
  selectDropdown(destinos, dropdownDestino);
  selectDropdown(categorias, dropdownCategoria);
  selectDropdown(precios, dropdownPrecio);
  selectDropdown(horarios, dropdownHorario);

  

});


