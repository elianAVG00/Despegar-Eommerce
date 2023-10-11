//validacion
const validEmail = false;
const formEmail = document.getElementById('formEmail');
const username = document.getElementById('username');
const email = document.getElementById('email');

formEmail.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
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

if(validEmail == true){
    const nombreV = document.getElementById('username');
    const emailV = document.getElementById('email');
    const submit = document.getElementById('formEmail');
    
    submit.addEventListener('submit',(e)=>{
        e.preventDefault();
    
        let ebody = ` <h3><strong>Estimado/a:</strong> ${nombreV.value},</span></h3>
                            <hr />
                            <span><strong>Nombre:</strong> ${nombreV.value}</span><br />
                            <span><strong>Direccion de Email:</strong>  ${emailV.value}</span><br />
                            <hr />
                            <span><strong>Le confirmamos que su compra de pasaje ha sido exitosa:</strong>  Orden Nro 8902</span><br /><br />
                            <span>Información de su compra:</span><br />
                            <ul>
                                <li>Origen: <strong>[origen]</strong></li>
                                <li>Destino: <strong>[destino]</strong></li>
                                <li>Fecha de salida: <strong>[fecha de salida]</strong></li>
                                <li>Fecha de llegada: <strong>[fecha de llegada]</strong></li>
                                <li>Número de vuelo: <strong>[número de vuelo]</strong></li>
                                <li>Compañía aérea: <strong>[compañía aérea]</strong></li>
                                <li>Tarifa: <strong>[tarifa]</strong></li>
                            </ul>
                            <span>¡Le deseamos un feliz viaje!</span><br />
                            <span>Atentamente,</span>
                            <span>Despegar Ecommerce</span>`;
    
        Email.send({
            SecureToken :  "cd4a9dc6-0929-4738-9190-0716e4849d15", //add your token here 3807DED6EDAA606BD1ADCE900531F61A2890
            To : emailV.value, 
            From : "elian.race.eg15@gmail.com",
            Subject : "Confirmación de compra de pasaje Despegar Ecommerce",
            Body : ebody
        }).then(
          message => alert(message)
        );
    });
}
