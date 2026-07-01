

// Selección de elementos mediante clases
const openBtn = document.querySelector('.btn_drawer_fill');
const closeBtn = document.querySelector('.btn_drawer_outline');
const drawer = document.querySelector('.drawer_content');
const overlay = document.querySelector('.drawer-overlay');

// Función para alternar el estado
function toggleDrawer() {
    drawer.classList.toggle('is-active');
    overlay.classList.toggle('is-active');
}

// Asignación de eventos
openBtn.addEventListener('click', toggleDrawer);
closeBtn.addEventListener('click', toggleDrawer);
overlay.addEventListener('click', toggleDrawer); 

