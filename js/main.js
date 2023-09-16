//Cart

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let open;
let close;

let shop_menu = document.getElementById("shop-menu")

async function cargarDatosVuelos(){
  try {
      const response = await fetch("../data/vuelos.json");
      if (!response.ok) {
          throw new Error('No se pudieron cargar los datos.');
      }
      let dataVuelos = await response.json();
      dataVuelos.forEach(vuelo => {
        const vueloDiv = document.createElement('div');
        vueloDiv.classList.add("product-box");
        vueloDiv.innerHTML+= `
                              <img src="../img/vuelos/${vuelo.img}" alt="" class="product-img">
                              <button id="open${vuelo.id}">Ver Más</button>
                              &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                              <span class="price">$${vuelo.precio}</span>
                              <i class='bx bx-shopping-bag add-cart'></i>
          `
        shop_menu.appendChild(vueloDiv);

        open = document.getElementById(`open${vuelo.id}`);

        //Manejo la apertura y cierre del modal
        open.addEventListener('click', (e) => {
          let cadena = e.target.id;
          let ultimo_caracter_o = cadena.charAt(cadena.length - 1);
          let modal_container = document.getElementById(`modal_container${ultimo_caracter_o}`);
          modal_container.classList.add('show');
          close = document.getElementById(`close${ultimo_caracter_o}`)
          close.addEventListener('click', () => {
            modal_container.classList.remove('show');
          });
        });
    });

  } catch (error) {
      console.error(error);
  }
}



//Abre el carrito
cartIcon.onclick = () =>{
    cart.classList.add("active")
}

//Cierra el carrito
closeCart.onclick = () =>{
    cart.classList.remove("active")
}

//Cart working JS
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{

    ready();

}

//Making Function
function ready(){
    //Remover items desde carrito
    var reomveCartButtons = document.getElementsByClassName('cart-remove');
    console.log(reomveCartButtons);
    for(var i = 0; i < reomveCartButtons.length; i++){
        var button = reomveCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    //quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change",quantityChanged);
    }

    //Add to Cart
    var addCart = document.getElementsByClassName("add-cart");
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    //buy button work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);

}

//buy button
function buyButtonClicked(){
    alert("Su Pago ha sido realizado!!");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }

    updatetotal();
}



//Remover items desde carrito,esto es en icono del tacho de basura
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

//quantity changes
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}

//Add to Cart
function addCartClicked(event){

    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title,price,productImg);
    updatetotal();

}

function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
        alert("Usted ya ha añadido este elemento a sus pedidos!!");
        return;
    }
    
    }
    
var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                       </div>
                    <!--Remove Cart-->
                       <i class='bx bxs-trash-alt cart-remove'></i>`;


cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click",removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);

}


//actualizar total
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    
        //if price contain some cents value
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
    
}

const detalles = document.getElementById('modales');

//Carga de modals
async function cargarDetalles(){
  try {
      const response = await fetch("../data/detalles.json");
      if (!response.ok) {
          throw new Error('No se pudieron cargar los datos.');
      }
      let dataDetalles = await response.json();
      dataDetalles.forEach(detalle => {
        const detalleDiv = document.createElement('div');
        detalleDiv.id = `modal_container${detalle.id}`
        detalleDiv.classList.add("modal-container");
        detalleDiv.innerHTML+= `
                  
                    <div class="mod">
                        <h2>Detalles del vuelo</h2>
                        <div>
                          <div style="text-align:center;">
                              <table class="table table-bordered color-borde" style="margin: 0 auto;">
                                  <tr>
                                      <td></td>
                                      <td>Ida</td>
                                      <td>Vuelta</td>

                                  </tr>
                                  <tr>
                                      <td>Aeropuerto</td>
                                      <td>${detalle.aeropuerto1}</td>
                                      <td>${detalle.aeropuerto2}</td>
                                  </tr>
                                  <tr>
                                      <td>Fecha</td>
                                      <td>${detalle.fecha1}</td>
                                      <td>${detalle.fecha2}</td>
                                  </tr>
                                  <tr>
                                      <td>Hora</td>
                                      <td>${detalle.hora1}</td>
                                      <td>${detalle.hora2}</td>
                                  </tr>
                                  <tr>
                                      <td>Tipo</td>
                                      <td>${detalle.tipo1}</td>
                                      <td>${detalle.tipo2}</td>
                                  </tr>
                                  <tr>
                                      <td>Equipaje</td>
                                      <td>${detalle.equipaje1}</td>
                                      <td>${detalle.equipaje2}</td>
                                  </tr>
                              </table>
                          </div> 
                          <button class="mt-3" id="close${detalle.id}">Cerrar</button>
                        </div>
                    </div>
                  
          `
        detalles.appendChild(detalleDiv);
      });
  } catch (error) {
      console.error(error);
  }
}

cargarDetalles();
cargarDatosVuelos();

