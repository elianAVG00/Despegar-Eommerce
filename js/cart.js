// let shop_menu = document.getElementById("shop-menu");
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let carrito = [];
let total = 0;
let price;
let quantity;
let seccion;
let dataDetalles;



// Conjunto para almacenar los IDs utilizados
const idsUtilizados = new Set();

// Función para generar un ID único entre 1 y 100
function generarIDUnico() {
  let nuevoID;
  do {
    nuevoID = Math.floor(Math.random() * 100) + 1;
  } while (idsUtilizados.has(nuevoID));
  idsUtilizados.add(nuevoID);
  return nuevoID;
}

function obtenerCarrito() {
    carrito = Cookies.get('carrito');
    return carrito ? JSON.parse(carrito) : [];;
}


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
    for(let i = 0; i < reomveCartButtons.length; i++){
        let button = reomveCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    //quantity changes
    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for(let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i];
        input.addEventListener("input",quantityChanged);
    }

    //Add to Cart
    let addCart = document.getElementsByClassName("add-cart");

    for(let i = 0; i < addCart.length; i++){
        let button = addCart[i];
        console.log(addCart[i]);
        button.addEventListener("click", addCartClicked);
    }
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
    let carr = carrito.filter(el => el.idReserva != parseInt(indice));
    Cookies.set('carrito', JSON.stringify(carr));
    carrito = obtenerCarrito();
    contarProductos();
    // updatetotal();
    addProductToCart(carrito);
    // buttonClicked.parentElement.parentElement.remove();
}

//quantity changes
function quantityChanged(e){
    quantity = Number(e.target.value);
    updatetotal();
}

//Add to Cart
function addCartClicked(event, data = []){
    let elBut;
    carrito = obtenerCarrito();
    if(data.length != 0){
        dataDetalles = data.filter(el => el.id == parseInt(event.target.id));
        console.log(dataDetalles);
        dataDetalles[0].idReserva = generarIDUnico();
        // delete dataDetalles[0].id;
    }
    if(event.target.classList.contains('add-cart') && event.target.classList.contains('generales')){
        elBut = event.target;
        seccion = "generales";
        const fila = elBut.closest('tr');
        // Verifica que se haya encontrado una fila
        if (fila) {
            const celdas = fila.getElementsByTagName("td");
            let origen = celdas[0].textContent;
            let destino = celdas[1].textContent;
            let ida = celdas[2].textContent;
            let vuelta = celdas[3].textContent;
            let fecha = celdas[4].textContent;
            let categoria = celdas[5].textContent;
            let precio = celdas[6].textContent;
            let horario = celdas[7].textContent;
            carrito.push({idReserva: generarIDUnico(), origen, destino, ida, vuelta, fecha, categoria, precio, horario});
            // Almacena el array serializado en una cookie
            Cookies.set('carrito', JSON.stringify(carrito));
            
        }
    }
    if(event.target.classList.contains('add') && event.target.classList.contains('detalles')){
        elBut = event.target;
        seccion = "detalles";
        let idReserva = dataDetalles[0].idReserva;
        let origen = dataDetalles[0].origen;
        let destino = dataDetalles[0].destino;
        let ida = dataDetalles[0].aeropuerto1;
        let vuelta = dataDetalles[0].aeropuerto2;
        let fecha = dataDetalles[0].fecha1;
        let categoria = dataDetalles[0].categoria;
        let precio = "$" + dataDetalles[0].precio;
        let horario = dataDetalles[0].hora1 + "HS";
        // carrito = obtenerCarrito();
        carrito.push({idReserva, origen, destino, ida, vuelta, fecha,
                categoria, precio, horario});
        // Cookies.set('carrito', JSON.stringify(carrito),{ expires: 7, path: '' });
        let origen1 = dataDetalles[0].destino;
        let destino1 = dataDetalles[0].origen;
        let ida1 = dataDetalles[0].aeropuerto2;
        let vuelta1 = dataDetalles[0].aeropuerto1;
        let fecha1 = dataDetalles[0].fecha2;
        let categoria1 = dataDetalles[0].categoria;
        let precio1 = "$" + dataDetalles[0].precio;
        let horario1 = dataDetalles[0].hora2 + "HS";
        carrito.push({idReserva: generarIDUnico(), origen: origen1, destino: destino1, ida: ida1, 
            vuelta: vuelta1, fecha: fecha1, 
            categoria: categoria1, precio: precio1, horario: horario1});
        // Almacena el array serializado en una cookie
        Cookies.set('carrito', JSON.stringify(carrito));
            
        
    }
    console.log(carrito);
    carrito = obtenerCarrito();
    contarProductos();
    addProductToCart(carrito);

}


function contarProductos(){

    
    let notificacion = document.getElementById("notificacion");
    const carritoData = Cookies.get('carrito');
    const carritoLength = carritoData ? JSON.parse(carritoData).length : undefined;

    if(!carritoLength){
        notificacion.innerHTML = 0;
        notificacion.classList.remove("animate__fadeIn");
        notificacion.classList.add("animate__animated", "animate__fadeOut");
    }
    else if(carritoLength && carritoLength != 0) {
        notificacion.setAttribute("style", "display: flex;");
        notificacion.innerHTML = carritoLength;
        notificacion.classList.remove("animate__fadeOut");
        notificacion.classList.add("animate__animated", "animate__fadeIn");
    }
    else if(!carritoLength && carritoLength == 0){
        notificacion.innerHTML = carritoLength;
        notificacion.classList.remove("animate__fadeIn");
        notificacion.classList.add("animate__animated", "animate__fadeOut");
    }
} 

contarProductos();

function addProductToCart(carrit){
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let cartItems = document.getElementsByClassName("cart-content")[0];
    console.log(carrit);

    cartItems.innerHTML = '';
    carrit.forEach((element, index) => {
        // if(seccion == "generales"){
            const {idReserva, origen, destino, fecha, categoria, precio, horario } = element;
            let cartBoxContent = `
                        <div class="detail-box rounded-3 p-3 text-white" style="background-color: #00000082;">
                            <div class="cart-product-title">Origen: ${origen}</div>
                            <div class="cart-product-title">Destino: ${destino}</div>
                            <div class="cart-product-title">Fecha: ${fecha}</div>
                            <div class="cart-product-title">Categoria: ${categoria}</div>
                            <div class="cart-product-title">Horario: ${horario}</div>
                            <div class="cart-price">Precio: ${precio}</div>
                            <div class="flex flex-row justify-content-between" style="align-content: center;display: flex;">
                                <input type="number" value="1" min="1" class="cart-quantity">
                                <!--Remove Cart-->
                                <i class='bx bxs-trash-alt cart-remove' data-id="${idReserva}"></i>
                            </div>
                        </div>`;
        
        
        
        cartShopBox.innerHTML += cartBoxContent;
        cartItems.append(cartShopBox);
            
        
        cartShopBox.getElementsByClassName("cart-remove")[index].addEventListener("click", removeCartItem);
        cartShopBox.getElementsByClassName("cart-quantity")[index].addEventListener("input", quantityChanged);
        

    });
    updatetotal();
}



//actualizar total
//actualizar total
function updatetotal(){
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("detail-box");
    let priceElement;
    let quantityElement;
    let cartBox;
    total = 0;
    for(let i = 0; i < cartBoxes.length; i++){
        cartBox = cartBoxes[i];
        priceElement = cartBox.lastElementChild.previousElementSibling;
        quantityElement = document.getElementsByClassName("cart-quantity")[i];
        quantity = Number(quantityElement.value);
        quantityElement.addEventListener("input", quantityChanged);
        price = parseFloat(priceElement.innerText.split(" ")[1].replace("$",""));
        total = total + (price * quantity);

    }
        //if price contain some cents value
        total = Math.round(total * 100) / 100;
    
        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
    
        return total;
    
}



function vaciarCarrito(){
    Cookies.remove('carrito');
    contarProductos();
    carrito = obtenerCarrito();
    addProductToCart(carrito);
    
}

