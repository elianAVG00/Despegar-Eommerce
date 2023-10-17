//Cart
let open;
let close;
let dataDetail = [];
let idBut;
let elem;

let shop_menu = document.getElementById("shop-menu")

async function cargarVuelosPrincipales(){
  try {
      const response = await fetch("../data/vuelos.json");
      if (!response.ok) {
          throw new Error('No se pudieron cargar los datos.');
      }
      let dataVuelos = await response.json();
      dataVuelos.forEach(vuelo => {
        if(vuelo.seccion == "principal"){
            const vueloDiv = document.createElement('div');
            vueloDiv.classList.add("product-box");
            vueloDiv.innerHTML+= `
                                <img src="../img/vuelos/${vuelo.img}" alt="" class="product-img">
                                <button id="open${vuelo.id}">Ver Más</button>
                                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                <span class="price">$${vuelo.precio}</span>
                                
            `
            // <i class='bx bx-shopping-bag add-cart'></i>
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
        }
    });

  } catch (error) {
      console.error(error);
  }
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
        // let idButton = generarIDUnico();
        let {id, origen, destino, aeropuerto1, aeropuerto2, fecha1, fecha2,
                hora1, hora2, precio, categoria, tipo1, tipo2,
                equipaje1, equipaje2, seccion} = detalle;
        dataDetail.push(detalle);
        const detalleDiv = document.createElement('div');
        detalleDiv.id = `modal_container${id}`
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
                                      <td>${aeropuerto1}</td>
                                      <td>${aeropuerto2}</td>
                                  </tr>
                                  <tr>
                                      <td>Fecha</td>
                                      <td>${fecha1}</td>
                                      <td>${fecha2}</td>
                                  </tr>
                                  <tr>
                                      <td>Hora</td>
                                      <td>${hora1}</td>
                                      <td>${hora2}</td>
                                  </tr>
                                  <tr>
                                      <td>Tipo</td>
                                      <td>${tipo1}</td>
                                      <td>${tipo2}</td>
                                  </tr>
                                  <tr>
                                      <td>Equipaje</td>
                                      <td>${equipaje1}</td>
                                      <td>${equipaje2}</td>
                                  </tr>
                              </table>
                          </div> 
                          <button class="mt-3" id="close${id}">Cerrar</button>
                          <button class="btn btn-success contraer detalles add ms-3" id="${id}" onclick="addCartClicked(event, dataDetail)">Agregar al carrito</button>
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
cargarVuelosPrincipales();
