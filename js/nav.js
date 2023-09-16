document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos
    let miInput = document.getElementById('miInput');
    let dropdownItemsDest = document.querySelectorAll('.dest');

    let miInput2 = document.getElementById('miInput2');
    let dropdownItemsCat = document.querySelectorAll('.cat');

    let miInput3 = document.getElementById('miInput3');
    let dropdownItemsPrice = document.querySelectorAll('.price');
  
    // Agregar evento de clic a cada opción del menú desplegable
    dropdownItemsDest.forEach(function(item) {
      item.addEventListener('click', function() {
        miInput.value = item.textContent; // Establecer el valor del input
      }); 
    });

    // Agregar evento de clic a cada opción del menú desplegable
    dropdownItemsCat.forEach(function(item) {
        item.addEventListener('click', function() {
          miInput2.value = item.textContent; // Establecer el valor del input
        });
    
    });

    // Agregar evento de clic a cada opción del menú desplegable
    dropdownItemsPrice.forEach(function(item) {
      item.addEventListener('click', function() {
        miInput3.value = item.textContent; // Establecer el valor del input
      });
  
  });

});

