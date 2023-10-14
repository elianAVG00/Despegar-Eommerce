// let shop_menu = document.getElementById("shop-menu");
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let carrito = [];
// let dataVuelos = [];
// let op;
// let clos;

// if (Cookies.get('miCookie')) {
//     // Hacer algo con los datos de la cookie
//     carrito = JSON.parse(Cookies.get('miCookie'));
//   } else {
//     // No hagas nada o realiza una acción alternativa
//     Cookies.set('carrito', JSON.stringify(carrito),{ expires: 7, path: '' });
//   }


function obtenerCarrito() {
    carrito = Cookies.get('carrito');
    return carrito ? JSON.parse(carrito) : [];
}



//Abre el carrito
//cartIcon.onclick = () =>{
//    cart.classList.add("active")
//}

//Cierra el carrito
//closeCart.onclick = () =>{
//    cart.classList.remove("active")
//}

//Cart working JS
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

//Making Function
function ready(){
    carrito = obtenerCarrito();
    addProductToCart(carrito);
    //Remover items desde carrito
    let reomveCartButtons = document.getElementsByClassName('cart-remove');
    console.log(reomveCartButtons);
    for(let i = 0; i < reomveCartButtons.length; i++){
        let button = reomveCartButtons[i];
        // let indice = 
        // console.log(reomveCartButtons.id.value);
        button.addEventListener('click', removeCartItem);
    }

    //quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for(let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i];
        input.addEventListener("change",quantityChanged);
    }

    //Add to Cart
    let addCart = document.getElementsByClassName("add-cart");

    console.log(addCart);
    for(let i = 0; i < addCart.length; i++){
        let button = addCart[i];
        console.log(addCart[i]);
        button.addEventListener("click", addCartClicked);
    }

    //buy button work
    document.getElementsByClassName("buy-btn")[0].addEventListener("click", buyButtonClicked);

}

//buy button
function buyButtonClicked(){
    alert("Su Pago ha sido realizado!!");
    let cartContent = document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }

    updatetotal();
}

//Remover items desde carrito,esto es en icono del tacho de basura
function removeCartItem(event){
    let buttonClicked = event.target;
    // let index = i;
    let indice = buttonClicked.getAttribute('data-id');
    carrito = obtenerCarrito();
    carrito.splice(indice, 1);
    Cookies.set('carrito', JSON.stringify(carrito));
    buttonClicked.parentElement.parentElement.parentElement.remove();
    updatetotal();
}

//quantity changes
function quantityChanged(event){
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}

//Add to Cart
function addCartClicked(event){
    if(event.target.classList.contains('add-cart')){
        const fila = event.target.closest('tr');
        console.log(fila);
        // Verifica que se haya encontrado una fila
        if (fila) {
            const celdas = fila.getElementsByTagName("td");
            console.log(celdas);
            let origen = celdas[0].textContent;
            let destino = celdas[1].textContent;
            let ida = celdas[2].textContent;
            let vuelta = celdas[3].textContent;
            let fecha = celdas[4].textContent;
            let categoria = celdas[5].textContent;
            let precio = celdas[6].textContent;
            let horario = celdas[7].textContent;
            carrito = obtenerCarrito();
            carrito.push({origen, destino, ida, vuelta, fecha, categoria, precio, horario});
            console.log(carrito);
            // Almacena el array serializado en una cookie
            Cookies.set('carrito', JSON.stringify(carrito),{ expires: 7, path: '' });
            
        }
    }
    addProductToCart(carrito);
    updatetotal();

}

function addProductToCart(carrit){
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let cartItems = document.getElementsByClassName("cart-content")[0];
    let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    console.log(cartItemsNames)
    // for (let i = 0; i < cartItemsNames.length; i++){
    //     if(cartItemsNames[i].innerText == title){
    //     alert("Usted ya ha añadido este elemento a sus pedidos!!");
    //     return;
    // }
    
    // }

    carrit.forEach((element, index) => {
        const {origen, destino, ida, vuelta, fecha, categoria, precio, horario } = element
        let cartBoxContent = `
                        <div class="detail-box rounded-3 p-3 text-white" style="background-color: #00000082;">
                            <div class="cart-product-title">Origen: ${origen}</div>
                            <div class="cart-product-title">Destino: ${destino}</div>
                            <div class="cart-product-title">Fecha: ${fecha}</div>
                            <div class="cart-product-title">Categoria: ${categoria}</div>
                            <div class="cart-product-title">Horario: ${horario}</div>
                            <div class="cart-price">Precio: ${precio}</div>
                            <div class="flex flex-row justify-content-between" style="align-content: center;display: flex;">
                                <input type="number" value="1" class="cart-quantity">
                                <!--Remove Cart-->
                                <i class='bx bxs-trash-alt cart-remove' data-id="${index}"></i>
                            </div>
                        </div>`;
        
        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);
        cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click",removeCartItem);
        cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);

    });
    updatetotal();
}

//actualizar total
function updatetotal(){
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;
    for(let i = 0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        let price = parseFloat(priceElement.innerText.split(" ")[1].replace("$",""));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    
        //if price contain some cents value
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
    
}



function vaciarCarrito(){
    Cookies.remove('carrito');
    console.log(JSON.parse(Cookies.get('miCookie')));
    // Cookies.set('carrito', JSON.stringify(carrito),{ expires: 7, path: '' });
    // window.location.reload();
}

