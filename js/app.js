
// Este proyecto usa un framework de CSS que se llama tailwind es similar a bootstrap
// todo esta enfocado a clase de utilidades
// varibales
const btnEnviar = document.querySelector('#enviar') // Se selecciona el elemento <button> mediante su id:"enviar"
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail')

// Variables para campos
const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const eventListeners = () => {
    // DOMContentLoaded --> este evento se activa cuando el documento HTML se ha analizado por completo y todos
    // los scripts diferidos se han descargado y ejecutado.
    // Cuando arranca la app
    document.addEventListener('DOMContentLoaded', iniciarApp)

    // Campos del formulario
    email.addEventListener('blur', validarFormulario)   // 'blur' --> se dispara cuando un elemnto a perdido su foco, cuando estoy sobre un elemento despues me quito de aquel
    asunto.addEventListener('blur', validarFormulario)
    mensaje.addEventListener('blur', validarFormulario)
    
    // Reiniciar formulario
    btnReset.addEventListener('click', resetearFormulario);
    
    // Eviar email
    formulario.addEventListener('submit', enviarEmail)
    
}

// Funciones
const iniciarApp = () => {
    
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    
}


// Valida el formulario 
const validarFormulario = (e) => {
    // console.log(e.target.type);
    if (e.target.value.length > 0) {
        
        // Eliminar los errores
        const error = document.querySelector('p.error');
        if (error) {
            error.remove()
        }
        
        
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }
    
    if (e.target.type === 'email') {
        
        if (er.test(e.target.value)) {
            const error = document.querySelector('p.error');
            if (error) {
                error.remove()
            }
            
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido')
        }
    }

    if (er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
        
    }
}

const mostrarError = (mensaje) => {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error')
    
    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError)
    }
}


//Envia el email
const enviarEmail = (e) => {
    e.preventDefault();
    console.log(e);
    
    // Mostrar spinner
    spinner.style.display = 'flex';
    console.log('segundo click en reset');
    // Despues de seg oculatar spinner y mostrar el mensaje
    setTimeout(() => {
        const spinner = document.querySelector('#spinner');
        spinner.style.display = 'none';
        
        // Mensaje envio corrrecto
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')
        
        // Intertar el mensaje despues del spinner
        formulario.insertBefore(parrafo, spinner);
        
        setTimeout(() => { 
            parrafo.remove();   // elimina el mensaje de exito
            resetearFormulario(); // resetear los campos del formulariod
            
        }, 2000);
        
        
    }, 2500);
}

// Resetear los campos del formulario
const resetearFormulario = () => {
    console.log('click en reset');
    formulario.reset();
    iniciarApp();
}


eventListeners()