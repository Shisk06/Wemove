
// ELEMENTOS DEL FORMULARIO
const nombreCompletoInput = document.getElementById("nombreCompleto");
const userIDInput = document.getElementById("userID");
const correoInput = document.getElementById("correo");
const passwordInput = document.getElementById("password");
const confirmarPasswordInput = document.getElementById("confirmarPassword");

const btnRegistrar = document.getElementById("btnRegistrar");

//errores 
const errorNombre = document.getElementById("errorNombre");
const errorUserID = document.getElementById("errorUserID");
const errorCorreo = document.getElementById("errorCorreo");
const errorPassword = document.getElementById("errorPassword");
const errorConfirmarPassword = document.getElementById("errorConfirmarPassword");



// Avatar seleccionado
let avatarSeleccionado = "";

// Muestra un mensaje de error asociado a un input y elemento small
function mostrarError(inputEl, errorEl, message) {
    if (!errorEl || !inputEl) return;
    errorEl.textContent = message;
    // intenta usar la variable CSS para el color si está disponible
    try { errorEl.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-900') || '#d32f2f'; } catch (e) { errorEl.style.color = '#d32f2f'; }
    inputEl.classList.add('input-error');
}

// Limpia el mensaje de error de un input
function limpiarError(inputEl, errorEl) {
    if (!errorEl || !inputEl) return;
    errorEl.textContent = "";
    inputEl.classList.remove('input-error');
}
//leer el formulario
function leerFormulario() {

    return {

        nombre: nombreCompletoInput.value.trim(),

        userID: userIDInput.value.trim(),

        correo: correoInput.value.trim().toLowerCase(),

        password: passwordInput.value,

        confirmarPassword: confirmarPasswordInput.value,

        avatar: avatarSeleccionado

    };

}

//validar campos vacíos
    function validarCamposVacios(usuario) {

        if (usuario.nombre === "") {
            mostrarError(

                nombreCompletoInput,
                errorNombre,
                "El nombre es obligatorio."

            );
            return false;
        }

        if (usuario.userID === "") {
            mostrarError(

                userIDInput,
                errorUserID,
                "El UserID es obligatorio."

            );
            return false;
        }

        if (usuario.correo === "") {
            mostrarError(

                correoInput,
                errorCorreo,
                "El correo es obligatorio."

            );
            return false;
        }

        if (usuario.password === "") {
            mostrarError(
                
            passwordInput,

            errorPassword,

            "Debe contener una mayúscula."

        );
            return false;
        }

        if (usuario.confirmarPassword === "") {
            mostrarError(
                confirmarPasswordInput,
                errorConfirmarPassword,
                "Debe confirmar la contraseña."
            );
            return false;
        }

        if (usuario.avatar === "") {
            mostrarError(
                avatarInput,
                errorAvatar,
                "Debe seleccionar un avatar."
            );
            return false;
        }

        return true;

    }

//registro de usuario
function registrarUsuario() {

    const usuario = leerFormulario();

    const formularioValido = validarCamposVacios(usuario);

    if (!formularioValido) {
        return;
    }

    console.log(usuario);

}

//boton de registro
btnRegistrar.addEventListener("click", registrarUsuario);