// Prosiblemente la funcion para editar el usuario

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
const nombreGuardado = localStorage.getItem("nombre");

// Limpiar estado anterior
mensaje.textContent = "";
mensaje.classList.remove("error", "success");

// Campo vacío
if (nombre === "") {

    mensaje.textContent = "El nombre es obligatorio.";
    mensaje.classList.add("error");

    boton.disabled = true;
    return false;

}

// Nombre repetido
if (
    nombreGuardado &&
    nombre.toLowerCase() === nombreGuardado.toLowerCase()
) {

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

// Por seguridad vuelve a validar
if (!validarNombre()) return;

const nombre = input.value.trim();

localStorage.setItem("nombre", nombre);

mensaje.textContent = "Usuario registrado correctamente.";
mensaje.classList.remove("error");
mensaje.classList.add("success");


}