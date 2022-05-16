//Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//EventListeners
eventListeners();
function eventListeners(){
    //Cuando arranca la app
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Reincia el formulario
    btnReset.addEventListener('click', resetearFormulario); //Reciclamos una funcion que hemos creado al enviar correctamente el email

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);
}

//Funciones
function iniciarApp(){

    btnEnviar.disabled = true; //Desactiva el boton pero sigue apareciendo en el DOM
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50'); //Utilizamos Taiwlind por eso la forma de describir estas propiedades

}

//Validar Formulario
function validarFormulario(e){

    if(e.target.value.length > 0){ //Verifica que haya algo dentro del campo mediante el numero de caracteres existente

        //Elimina los errores cuando se ingresé algo
        const error = document.querySelector('p.error');
        if(error){ //Evitar errores de funcionamiento cuando no encuentre nigun elementos por borrar
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{ //En dado caso que no, los bordes cambian de color

        // e.target.style.borderBottomColor = 'red';  //Se modifica directamente la propieda o se podría agregar una clase que estuiviera definida en la hoja de estilos para modificar al elemento
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500'); //Utiliza clases que proporciona Taiwilnd
        
        //Mostrar error
        mostrarError('Todos los campos son obligatorios');
    }

    //Validar e-mail
    if(e.target.type === 'email'){

        // const resultado = e.target.value.indexOf('@'); //Podrímos solo verificar que si tiene un arroba es válidom pero con una expresion regular verificamos que tenga un formato completo de email
        
        if(er.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
    
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else{
            //Mostrar error
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500'); //Utiliza clases que proporciona Taiwilnd
            mostrarError('Email no válido');
        }
    }

    //Verificar que los tres campos sean correctos
    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){  //Aquí se verifica por medio del campo email no por el evento dentro del campo email, sino por el desencadenamiento de otro evento

        btnEnviar.disabled = false; //Desactiva el boton pero sigue apareciendo en el DOM
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50'); //Utilizamos Taiwlind por eso la forma de describir estas propiedades  
    }

}

function mostrarError(mensaje){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error'); //error es para verificar que no exista algun otro mensaje de error con el if de abajo

    const errores = document.querySelectorAll('.error'); //Al utilizar querySelectorAll nos permite acceder a la propiedad de lenght puesto que esta forma de seleccionar un elemento si existe mas de una concicidencia, nos retorna una coleccion de elementos que se puede contar. A diferencia de querySelector que retorna true o false
    if(errores.length===0){
        formulario.appendChild(mensajeError);
        // formulario.insertBefore(mensajeError, document.querySelector('.mb-10')); //De esta forma podemos indicar una zona especifica para agregar el elemento
    }
}

//Enviar email
function enviarEmail(e){
    e.preventDefault();
    
    //Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Despues de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout( ()=>{
        spinner.style.display = 'none';

        //Mensaje que dice que se envió correctamente 
        const parrafo = document.createElement('P');
        parrafo.textContent = 'Mensaje enviado correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        //Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(()=>{
            parrafo.remove();
            resetearFormulario();
        }, 5000)
    }, 3000);

    //Con setInterval() lo que pasa es que se ejecuta la funcion cada 3 segundos
}

//Funcion que resetea el formulario
function resetearFormulario(){
    formulario.reset();
    iniciarApp();
} 

