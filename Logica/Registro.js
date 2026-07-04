const inputUserID = document.getElementById("inputUserID");
const inputCorreo = document.getElementById("inputCorreo");

const mensajeUserID = document.getElementById("mensajeUserID");
const mensajeCorreo = document.getElementById("mensajeCorreo");

const boton = document.getElementById("boton");
// ==========================
// AVATARES
// ==========================

const fotoPerfil = document.getElementById("fotoPerfil");
const btnAbrirAvatares = document.getElementById("abrirAvatares");

const sheet = document.querySelector(".sheet-avatares");
const overlay = document.querySelector(".sheet-overlay");

const avatars = document.querySelectorAll(".avatar-opcion");
const btnAplicarAvatar = document.getElementById("btnAplicarAvatar");

// Avatar por defecto
let avatarSeleccionado = "../../Recursos/Avatares/Sin_foto.png";
let avatarTemporal = avatarSeleccionado;


// Abrir Sheet
btnAbrirAvatares.addEventListener("click", () => {

    avatarTemporal = avatarSeleccionado;
    sheet.classList.add("active");
    overlay.classList.add("active");
    

});


// Cerrar Sheet al pulsar el fondo
overlay.addEventListener("click", cerrarSheet);


// Seleccionar avatar
avatars.forEach((avatar) => {

    avatar.addEventListener("click", () => {

        // Quitar selección anterior
        avatars.forEach((item) => {
            item.classList.remove("selected");
        });

        // Marcar el avatar seleccionado
        avatar.classList.add("selected");

        // Solo guardar temporalmente
        avatarTemporal = avatar.dataset.avatar;

    });

});

btnAplicarAvatar.addEventListener("click", () => {

    avatarSeleccionado = avatarTemporal;

    fotoPerfil.src = avatarSeleccionado;

    cerrarSheet();

});


// Función para cerrar el Sheet
function cerrarSheet(){

    sheet.classList.remove("active");
    overlay.classList.remove("active");

}

// El botón empieza deshabilitado
boton.disabled = true;

// Validar mientras el usuario escribe
inputUserID.addEventListener("input", actualizarEstadoBoton);
inputCorreo.addEventListener("input", actualizarEstadoBoton);

// Guardar cuando el usuario haga clic
boton.addEventListener("click", registrarUsuario);
// Función para actualizar el estado del botón
function actualizarEstadoBoton() {

    const userValido = validarUsuario();
    const correoValido = validarCorreo();

    boton.disabled = !(userValido && correoValido);

}


// Validar usuario
function validarUsuario() {

    // Obtener el usuario ingresado
    const userID = inputUserID.value.trim();

    // Obtener usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Limpiar mensaje anterior
    mensajeUserID.textContent = "";
    mensajeUserID.classList.remove("error", "success");

    // Campo vacío
    if (userID === "") {

        mensajeUserID.textContent = "El usuario es obligatorio.";
        mensajeUserID.classList.add("error");

        return false;

    }

    // Validar que el usuario no exista
    const existe = usuarios.some(usuario =>
        usuario.userID.toLowerCase() === userID.toLowerCase()
    );

    if (existe) {

        mensajeUserID.textContent = "Ese usuario ya está registrado.";
        mensajeUserID.classList.add("error");

        return false;

    }

    // Todo correcto
    mensajeUserID.textContent = "Usuario disponible.";
    mensajeUserID.classList.add("success");

    return true;

}

//validar correo
function validarCorreo(){

    const correo = inputCorreo.value.trim();

    // Obtener correos registrados
    const correos = JSON.parse(localStorage.getItem("correos")) || [];

    // Campo vacío
    if (correo === "") {

        mensajeCorreo.textContent = "El correo es obligatorio.";
        mensajeCorreo.classList.remove("error", "success");

        return false;

    }

    // Validar correo repetido
    const existe = correos.some(c => c.toLowerCase() === correo.toLowerCase());

    if (existe) {

        mensajeCorreo.textContent = "Ese correo ya está registrado.";
        mensajeCorreo.classList.add("error");

        return false;

    }

    // Todo correcto
    mensajeCorreo.textContent = "Correo disponible.";
    mensajeCorreo.classList.add("success");

    return true;

}

//registrar usuario
function registrarUsuario(e) {

    e.preventDefault();

    // Validar nuevamente antes de guardar
    if (!validarUsuario()) return;
    if (!validarCorreo()) return;

    
    const userID = inputUserID.value.trim();
    const correo = inputCorreo.value.trim();

    // Obtener usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Crear objeto usuario
    const nuevoUsuario = {

        nombre: "",
        userID: userID,
        correo: correo,
        password: "",
        avatar: avatarSeleccionado

};

    // Agregar el usuario
    usuarios.push(nuevoUsuario);

    // Guardar nuevamente
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensajeUserID.textContent = "Usuario registrado correctamente.";
    mensajeUserID.classList.remove("error");
    mensajeUserID.classList.add("success");

    // Limpiar los input
    inputUserID.value = "";
    inputCorreo.value = "";

    //limpiar mensajes
    mensajeUserID.textContent = "";
    mensajeCorreo.textContent = "";

    mensajeUserID.classList.remove("error", "success");
    mensajeCorreo.classList.remove("error", "success");

    // Deshabilitar nuevamente el botón
    actualizarEstadoBoton();

}