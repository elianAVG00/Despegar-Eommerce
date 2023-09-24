document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos
    let miInput0 = document.getElementById('Param_Origen');
    let dropdownItemsOrigen = document.querySelectorAll('.origen');

    let miInput1 = document.getElementById('Param_Destino');
    let dropdownItemsDestino = document.querySelectorAll('.destino');
     
    let miInput2 = document.getElementById('Param_Fecha');
    let dropdownItemsFecha = document.querySelectorAll('.fecha');
    
    let miInput3 = document.getElementById('Param_Numero_Pasajeros');
    let dropdownItemsPasajeros = document.querySelectorAll('.pasajeros');
    
    let miInput4 = document.getElementById('Param_Categoria');
    let dropdownItemsCategoria = document.querySelectorAll('.categoria');

    let miInput5 = document.getElementById('Param_Precio');
    let dropdownItemsPrecio = document.querySelectorAll('.precio');
    
    // Agregar evento de clic a cada opción del menú desplegable
    dropdownItemsOrigen.forEach(function(item) {
      item.addEventListener('click', function() {
        miInput0.value = item.textContent; // Establecer el valor del input
      }); 
    });
    // Agregar evento de clic a cada opción del menú desplegable
    dropdownItemsDestino.forEach(function(item) {
      item.addEventListener('click', function() {
        miInput1.value = item.textContent; // Establecer el valor del input
      }); 
    });
    // Agregar evento de clic a cada opción del menú desplegable
    dropdownItemsFecha.forEach(function(item) {
      item.addEventListener('click', function() {
        miInput2.value = item.textContent; // Establecer el valor del input
      }); 
    });
    // Agregar evento de clic a cada opción del menú desplegable
    dropdownItemsPasajeros.forEach(function(item) {
      item.addEventListener('click', function() {
        miInput3.value = item.textContent; // Establecer el valor del input
      }); 
    });
    // Agregar evento de clic a cada opción del menú desplegable
    dropdownItemsCategoria.forEach(function(item) {
        item.addEventListener('click', function() {
          miInput4.value = item.textContent; // Establecer el valor del input
        });
    });
    // Agregar evento de clic a cada opción del menú desplegable
    dropdownItemsPrecio.forEach(function(item) {
      item.addEventListener('click', function() {
        miInput5.value = item.textContent; // Establecer el valor del input
      });
    });

});

