document.addEventListener('DOMContentLoaded', function() {
  // Obtener elementos
  let inputDestino = document.getElementById('inputDestino');
  let dropdownItemsDest = document.querySelectorAll('.dest');

  let inputCat = document.getElementById('inputCat');
  let dropdownItemsCat = document.querySelectorAll('.cat');

  let inputPrice = document.getElementById('inputPrice');
  let dropdownItemsPrice = document.querySelectorAll('.price');

  // Agregar evento de clic a cada opción del menú desplegable
  dropdownItemsDest.forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      inputDestino.value = item.textContent; // Establecer el valor del input
    }); 
  });

  // Agregar evento de clic a cada opción del menú desplegable
  dropdownItemsCat.forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        inputCat.value = item.textContent; // Establecer el valor del input
      });
  
  });

  // Agregar evento de clic a cada opción del menú desplegable
  dropdownItemsPrice.forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      inputPrice.value = item.textContent; // Establecer el valor del input
    });

});

});
