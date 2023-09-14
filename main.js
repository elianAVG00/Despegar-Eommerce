//Cart

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

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

// Detalle producto
//1
const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

open.addEventListener('click', () => {
  modal_container.classList.add('show');  
});
close.addEventListener('click', () => {
  modal_container.classList.remove('show');
})

2
const open2 = document.getElementById('open2');
const modal_container2 = document.getElementById('modal_container2');
const close2 = document.getElementById('close2');
open2.addEventListener('click', () => {
    modal_container2.classList.add('show');  
  
   });
  close2.addEventListener('click', () => {
    modal_container2.classList.remove('show');
  })

//3
const open3 = document.getElementById('open3');
const modal_container3 = document.getElementById('modal_container3');
const close3 = document.getElementById('close3');
open3.addEventListener('click', () => {
    modal_container3.classList.add('show');  
  
  });
  close3.addEventListener('click', () => {
    modal_container3.classList.remove('show');
  })

  //4
const open4 = document.getElementById('open4');
const modal_container4 = document.getElementById('modal_container4');
const close4 = document.getElementById('close4');
open4.addEventListener('click', () => {
    modal_container4.classList.add('show');  
  
  });
  close4.addEventListener('click', () => {
    modal_container4.classList.remove('show');
  })

//5
const open5 = document.getElementById('open5');
const modal_container5 = document.getElementById('modal_container5');
const close5 = document.getElementById('close5');
open5.addEventListener('click', () => {
    modal_container5.classList.add('show');  
  
  });
  close5.addEventListener('click', () => {
    modal_container5.classList.remove('show');
  })

//6
const open6 = document.getElementById('open6');
const modal_container6 = document.getElementById('modal_container6');
const close6 = document.getElementById('close6');
open6.addEventListener('click', () => {
    modal_container6.classList.add('show');  
  
  });
  close6.addEventListener('click', () => {
    modal_container6.classList.remove('show');
  })
  
//7
const open7 = document.getElementById('open7');
const modal_container7 = document.getElementById('modal_container7');
const close7 = document.getElementById('close7');
open7.addEventListener('click', () => {
    modal_container7.classList.add('show');  
  
  });
  close7.addEventListener('click', () => {
    modal_container7.classList.remove('show');
  })
  
//8
const open8 = document.getElementById('open8');
const modal_container8 = document.getElementById('modal_container8');
const close8 = document.getElementById('close8');
open8.addEventListener('click', () => {
    modal_container8.classList.add('show');  
  
  });
  close8.addEventListener('click', () => {
    modal_container8.classList.remove('show');
  })
  
// //9
// const open9 = document.getElementById('open9');
// const modal_container9 = document.getElementById('modal_container9');
// const close9 = document.getElementById('close9');
// open9.addEventListener('click', () => {
//     modal_container9.classList.add('show');  
  
//   });
//   close9.addEventListener('click', () => {
//     modal_container9.classList.remove('show');
//   })

// //10
// const open10 = document.getElementById('open10');
// const modal_container10 = document.getElementById('modal_container10');
// const close10 = document.getElementById('close10');
// open10.addEventListener('click', () => {
//     modal_container10.classList.add('show');  
  
//   });
//   close10.addEventListener('click', () => {
//     modal_container10.classList.remove('show');
//   })

// //11
// const open11 = document.getElementById('open11');
// const modal_container11 = document.getElementById('modal_container11');
// const close11 = document.getElementById('close11');
// open11.addEventListener('click', () => {
//     modal_container11.classList.add('show');  
  
//   });
//   close11.addEventListener('click', () => {
//     modal_container11.classList.remove('show');
//   })
  
// //12
// const open12 = document.getElementById('open12');
// const modal_container12 = document.getElementById('modal_container12');
// const close12 = document.getElementById('close12');
// open12.addEventListener('click', () => {
//     modal_container12.classList.add('show');  
  
//   });
//   close12.addEventListener('click', () => {
//     modal_container12.classList.remove('show');
//   })

// //13
// const open13 = document.getElementById('open13');
// const modal_container13 = document.getElementById('modal_container13');
// const close13 = document.getElementById('close13');
// open13.addEventListener('click', () => {
//     modal_container13.classList.add('show');  
  
//   });
//   close13.addEventListener('click', () => {
//     modal_container13.classList.remove('show');
//   })

// //14
// const open14 = document.getElementById('open14');
// const modal_container14 = document.getElementById('modal_container14');
// const close14 = document.getElementById('close14');
// open14.addEventListener('click', () => {
//     modal_container14.classList.add('show');  
  
//   });
//   close14.addEventListener('click', () => {
//     modal_container14.classList.remove('show');
//   })
  
// //15
// const open15 = document.getElementById('open15');
// const modal_container15 = document.getElementById('modal_container15');
// const close15 = document.getElementById('close15');
// open15.addEventListener('click', () => {
//     modal_container15.classList.add('show');  
  
//   });
//   close15.addEventListener('click', () => {
//     modal_container15.classList.remove('show');
//   })
  
// //16
// const open16 = document.getElementById('open16');
// const modal_container16 = document.getElementById('modal_container16');
// const close16 = document.getElementById('close16');
// open16.addEventListener('click', () => {
//     modal_container16.classList.add('show');  
  
//   });
//   close16.addEventListener('click', () => {
//     modal_container16.classList.remove('show');
//   })

