//validacion
let validEmail = false;
let validUserName = false;
const formEmail = document.getElementById('formEmail');
const username = document.getElementById('username');
const email = document.getElementById('email');

formEmail.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();

    if(validEmail == true && validUserName == true){
        envioMail();
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username es requerido');
    } else {
        setSuccess(username);
        validUserName = true;
    }

    if(emailValue === '') {
        setError(email, 'Email es requerido');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Ingrese un Email valido');
    } else {
        setSuccess(email);
        validEmail = true;
    }
};

const envioMail = () => {
    console.log("entro");
    const nombreV = document.getElementById('username');
    const emailV = document.getElementById('email');
    const submit = document.getElementById('formEmail');

    let data = obtenerCarrito();
    if(data == null && data.lenght === 0){
        setError(email, 'Carrito vacio');
    }else{
        let total = 0;
        let pasajeNro = 1;
        let ebody = ` <h3><strong>Estimado/a:</strong> ${nombreV.value},</span></h3>
                            <hr />
                            <span><strong>Nombre:</strong> ${nombreV.value}</span><br />
                            <span><strong>Direccion de Email:</strong>  ${emailV.value}</span><br />
                            <hr />
                            <span><strong>Le confirmamos que su pedido de compra ha sido exitosa.</strong></span>
                            <span>Información de su compra:</span><br />`;
        let listaPasajes = ``;

        data.forEach((element) => {
            const {origen, destino, ida, vuelta, fecha, categoria, precio, horario } = element

            listaPasajes = listaPasajes + `
                            <ul>
                                <li><strong>Pasaje Nro ${pasajeNro}</strong></li>
                                <li><strong>Origen:</strong> ${origen}</li>
                                <li><strong>Destino:</strong> ${destino}</li>
                                <li><strong>Ida:</strong> ${ida}</li>
                                <li><strong>Vuelta:</strong> ${vuelta}</li>
                                <li><strong>Fecha:</strong> ${fecha}</li>
                                <li><strong>Categoria:</strong> ${categoria}</li>
                                <li><strong>Horario:</strong> ${horario}</li>
                                <li><strong>Precio:</strong> ${precio}</li>
                            </ul>
                            <hr />
                            <br /><br />`;
            total = precio +1;
            pasajeNro = pasajeNro +1;
        });

        let finEmail = `
                        <span>Precio total: ${total}</span>
                        <hr />
                        <br /><br />
                        <span><strong>Para finalizar la compra y ejercer el pago nos comunicaremos por este mismo medio.</strong></span><br />
                        <span>Atentamente,</span>
                        <span>Despegar Ecommerce</span>`;

        ebody = ebody + listaPasajes + finEmail;

        console.log(ebody);


        Email.send({
            SecureToken :  "cd4a9dc6-0929-4738-9190-0716e4849d15", //add your token here 3807DED6EDAA606BD1ADCE900531F61A2890
            To : emailV.value, 
            From : "elian.race.eg15@gmail.com",
            Subject : "Confirmación de compra de pasaje Despegar Ecommerce",
            Body : ebody
        }).then(    
            message => alert(message)
        );
    }
}


function obtenerCarrito() {
    let carrito = Cookies.get('carrito');
    return carrito ? JSON.parse(carrito) : [];
}