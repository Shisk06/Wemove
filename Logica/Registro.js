const input = document.getElementById("input");
const boton = document.getElementById("boton");
const mensaje = document.getElementById("mensajeNombre");

// El botón empieza deshabilitado
boton.disabled = true;

// Validar mientras el usuario escribe
input.addEventListener("input", validarNombre);

// Guardar cuando el usuario haga clic
boton.addEventListener("click", registrarUsuario);

function validarNombre() {

    const nombre = input.value.trim();

    // Obtener usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Limpiar mensaje anterior
    mensaje.textContent = "";
    mensaje.classList.remove("error", "success");

    // Campo vacío
    if (nombre === "") {

        mensaje.textContent = "El nombre es obligatorio.";
        mensaje.classList.add("error");

        boton.disabled = true;
        return false;

    }

    // Validar nombre repetido
    const existe = usuarios.some(usuario =>
        usuario.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (existe) {

        mensaje.textContent = "Ese nombre ya existe.";
        mensaje.classList.add("error");

        boton.disabled = true;
        return false;

    }

    // Todo correcto
    mensaje.textContent = "Nombre disponible.";
    mensaje.classList.add("success");

    boton.disabled = false;

    return true;
}

function registrarUsuario(e) {

    e.preventDefault();

    // Validar nuevamente antes de guardar
    if (!validarNombre()) return;

    const nombre = input.value.trim();

    // Obtener usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Crear objeto usuario
    const nuevoUsuario = {
        nombre: nombre
    };

    // Agregar el usuario
    usuarios.push(nuevoUsuario);

    // Guardar nuevamente
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensaje.textContent = "Usuario registrado correctamente.";
    mensaje.classList.remove("error");
    mensaje.classList.add("success");

    // Limpiar el input
    input.value = "";

    // Deshabilitar nuevamente el botón
    boton.disabled = true;

}